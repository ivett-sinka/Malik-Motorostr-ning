# 🚀 Gutenberg Breakout Solution - Training Tabs

## A Probléma
A Gutenberg nem támogatja a custom `data-*` attribútumokat a `wp:column` blokkokban, ami miatt a tab váltás nem működik megfelelően. Emellett a VIP kártya "lecsúszik" 20-30 másodperc után.

## ✅ A Megoldás
Teljesen kivezetjük a tabs szekciót a Gutenbergből egy **PHP template**-be, majd **shortcode**-dal beszúrjuk. Így:
- ✅ Teljes kontroll a HTML struktúra felett
- ✅ Custom `data-*` attribútumok használhatók
- ✅ Nincs Gutenberg validációs hiba
- ✅ A Gutenberg továbbra is használható a többi tartalomhoz

---

## 📁 Fájlok Szerkezete

```
your-theme/
├── functions.php                           ← Shortcode regisztráció
├── template-parts/
│   └── training-tabs-section.php          ← Tabs HTML template
├── training-tabs.js                        ← Tab funkció JS
└── training-tabs-fixed.css                 ← Tabs CSS
```

---

## 🔧 1. Telepítési Lépések

### Step 1: Másold át a fájlokat

1. **functions.php** - Add hozzá a theme functions.php fájlodhoz (vagy cseréld le, ha még nincs)
2. **template-parts/training-tabs-section.php** - Másold a theme-ba
3. **training-tabs.js** - Másold a theme gyökerébe
4. **training-tabs-fixed.css** - Másold a theme gyökerébe

### Step 2: Ellenőrizd a fájl útvonalakat

A `functions.php` automatikusan betölti a CSS és JS fájlokat:

```php
get_template_directory_uri() . '/training-tabs-fixed.css'
get_template_directory_uri() . '/training-tabs.js'
```

Ha más mappában vannak, módosítsd az útvonalakat!

---

## 🎯 2. Gutenberg Használat - "Breakout and Return"

### Lépés 1: Adj hozzá tartalmat Gutenbergben (normálisan)

```
┌─────────────────────────────────┐
│  Paragraph Block                │
│  "Tréning típusok szekció"      │
└─────────────────────────────────┘
```

### Lépés 2: "Break Out" - Illeszd be a Shortcode-ot

1. Kattints a **[+]** gombra
2. Keress rá: **"Shortcode"**
3. Válaszd ki a **Shortcode** blokkot
4. Írjd be: `[training_tabs]`

```
┌─────────────────────────────────┐
│  Paragraph Block                │
│  "Tréning típusok szekció"      │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  📦 Shortcode Block             │
│  [training_tabs]                │  ← Ez rendereli a teljes tabs szekciót
└─────────────────────────────────┘
```

### Lépés 3: "Return" - Folytasd Gutenberggel

Egyszerűen adj hozzá további blokkokat a shortcode után:

```
┌─────────────────────────────────┐
│  Paragraph Block                │
│  "Tréning típusok szekció"      │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  📦 Shortcode Block             │
│  [training_tabs]                │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  Paragraph Block                │
│  "További tartalom itt..."      │  ← Visszatértél Gutenberghez!
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  Image Block                    │
│  [kép]                          │
└─────────────────────────────────┘
```

---

## 📋 3. Alternatív Használat - Template File-ban

Ha nem Gutenberg oldalt használsz, hanem PHP template-et:

```php
<?php
/**
 * Template Name: Training Page
 */
get_header();
?>

<div class="page-content">
    <h1>Tréning Típusok</h1>

    <?php
    // Betöltjük a tabs szekciót
    get_template_part('template-parts/training-tabs-section');
    ?>

    <p>További tartalom itt...</p>
</div>

<?php get_footer(); ?>
```

---

## 🎨 4. Testreszabás

### Kép útvonalak módosítása

A `template-parts/training-tabs-section.php` fájlban minden kép így van hivatkozva:

```php
<img src="<?php echo get_template_directory_uri(); ?>/wp-content/uploads/motor-01.png" alt="motor">
```

Ha más mappában vannak a képek, módosítsd:

```php
<img src="<?php echo get_template_directory_uri(); ?>/assets/images/motor-01.png" alt="motor">
```

### Szövegek módosítása

Közvetlenül a `template-parts/training-tabs-section.php` fájlban szerkeszd a szövegeket:

```php
<h3 class="wp-block-heading">Alapfokú vezetéstechnikai tréning</h3>
<p>Kezdőknek és haladóknak</p>
<p class="card-price"><strong>40 000 Ft/ fő</strong></p>
```

### Stílus módosítása

Szerkeszd a `training-tabs-fixed.css` fájlt:

```css
/* Tab gombok színe */
.training-tabs-nav .tab-button {
    background-color: #333;  /* Módosítsd */
    color: #fff;
}

/* Aktív tab szín */
.training-tabs-nav .tab-button.active {
    background-color: #ff6600;  /* Módosítsd */
}
```

---

## 🐛 5. Hibakeresés

### A shortcode nem jelenik meg

**Probléma:** A `[training_tabs]` szöveg látható az oldalon, de nem renderelődik.

**Megoldás:**
1. Ellenőrizd, hogy a `functions.php` betöltődött-e:
   ```php
   // Console-ban (böngésző):
   if (shortcode_exists('training_tabs')) {
       echo 'Shortcode létezik';
   }
   ```

2. Tisztítsd a WordPress cache-t:
   - WP Admin → Settings → Clear Cache (ha van cache plugin)

### A CSS/JS nem töltődik be

**Probléma:** A tabok nincsenek formázva vagy nem működik a váltás.

**Megoldás:**
1. Ellenőrizd a fájl útvonalakat a `functions.php`-ben
2. Ellenőrizd a böngésző Console-ban (F12):
   - Network tab → Látod a `training-tabs-fixed.css`-t és `training-tabs.js`-t?
   - Ha 404 error → rossz útvonal

### A VIP kártya még mindig lecsúszik

**Probléma:** A kártya 20-30 mp után "leesik".

**Ellenőrizd:**
1. A `training-tabs.js` betöltődött?
2. A `training-tabs-fixed.css` használja-e `position: static`-ot az aktív kártyánál?

```css
.training-cards .training-card.active {
    position: static;  /* ← Ez kell! */
}
```

3. Ha még mindig probléma van, növeld az ellenőrzési időt:
```javascript
// training-tabs.js (39. sor)
const maxChecks = 120; // 60 mp helyett
```

---

## 📖 6. Mi történik a háttérben?

### Shortcode működése

```
[training_tabs]
      ↓
malik_training_tabs_shortcode()
      ↓
get_template_part('template-parts/training-tabs-section')
      ↓
training-tabs-section.php renderelése
      ↓
HTML kimenet
```

### CSS/JS betöltés

```
wp_enqueue_scripts action
      ↓
malik_enqueue_training_tabs_assets()
      ↓
wp_enqueue_style('training-tabs-fixed.css')
wp_enqueue_script('training-tabs.js')
      ↓
Betöltés az oldal <head>/<footer> részébe
```

### Magasság kezelés (VIP kártya fix)

```
DOMContentLoaded
      ↓
initTrainingTabs()
      ↓
startHeightCheck() - 500ms-enként 30 mp-ig
      ↓
updateContainerHeight() - kártya magasság figyelése
      ↓
container.style.minHeight = cardHeight + 'px'
```

---

## ✅ 7. Előnyök vs Gutenberg tiszta megközelítés

| Feature | Gutenberg wp:column | PHP Template + Shortcode |
|---------|---------------------|--------------------------|
| Custom data-* attribútumok | ❌ Nem támogatott | ✅ Működik |
| Validációs hibák | ⚠️ "Unexpected content" | ✅ Nincs hiba |
| Lazy-loading fix | ⚠️ Korlátozott | ✅ Teljes kontroll |
| Gutenberg használata | ✅ Teljes | ✅ Breakout + Return |
| Karbantartás | ⚠️ Nehezebb | ✅ Egyszerűbb |

---

## 🎯 Következő lépések

1. ✅ **Másold át** a 4 fájlt a theme-ba
2. ✅ **Illeszd be** a shortcode-ot Gutenbergben: `[training_tabs]`
3. ✅ **Teszteld** 1140px alatt és felett is
4. ✅ **Ellenőrizd** a VIP kártya magasságát 30-60 mp után
5. ✅ **Folytasd** a többi tartalom szerkesztését Gutenbergben

---

## 📞 Tesztelési Checklist

- [ ] Shortcode megjelenik Gutenbergben
- [ ] Desktop (>1140px): Két oszlop látható egymás mellett
- [ ] Mobile (<1140px): Tab gombok megjelennek
- [ ] Tab váltás: Smooth slide animáció jobbról balra
- [ ] VIP kártya: Nem csúszik le 30-60 mp után
- [ ] További Gutenberg blokkok működnek a shortcode után
- [ ] Képek betöltődnek lazy-loading-gal
- [ ] Console-ban nincs JavaScript hiba

---

Kész! Most már teljesen kiléptél a Gutenbergből a tabs szekciónál, és bármikor visszatérhetsz hozzá. 🚀
