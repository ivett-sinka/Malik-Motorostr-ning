# WordPress Gutenberg - Azonnali Megoldás

## ❌ Miért nem működik a background-image?

Az SVG fájlban lévő `viewBox` és implicit `preserveAspectRatio` megtartja az eredeti arányt. A `background-size: 100% 100%` **nem képes felülírni ezt az SVG tulajdonságot**.

## ✅ Garantáltan Működő Megoldás: IMG Tag

---

## 🚀 Gyors Implementálás (5 perc)

### 1. Lépés: Töltsd fel az új SVG-t

Töltsd fel a `card-grey-bg-stretch.svg` fájlt a WordPress Media Library-be.
(Ez az SVG tartalmazza a `preserveAspectRatio="none"` attribútumot)

### 2. Lépés: Szerkeszd a Training Cards blokkokat

1. Menj a WordPress Admin → Pages → Szerkeszd az oldalt
2. Kattints a `.training-card` blokkra
3. Kattints a **⋮** (három pont) menüre → **Edit as HTML**
4. A div **legelején**, közvetlenül a nyitó `<div class="training-card">` után add hozzá ezt:

```html
<img src="/wp-content/uploads/card-grey-bg-stretch.svg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:fill;z-index:0;pointer-events:none;" alt="" aria-hidden="true">
```

### 3. Lépés: Frissítsd a CSS-t

WordPress Admin → Appearance → Customize → Additional CSS:

```css
.training-card {
    position: relative !important;
    padding: 70px 40px;
    /* Töröld vagy kommenteld ki a background tulajdonságokat: */
    /* background: url(...); */
}

.training-card > * {
    position: relative;
    z-index: 1;
}
```

### 4. Lépés: Kész!

Mentsd el és nézd meg az eredményt! ✅

---

## 📋 Teljes Példa Kód

Ha egy training-card HTML-je így néz ki:

```html
<div class="wp-block-column training-card">
    <p>ikon</p>
    <h3>Alapfokú vezetéstechnikai tréning</h3>
    <p>Kezdőknek és haladóknak</p>
    ...
</div>
```

Változtasd erre:

```html
<div class="wp-block-column training-card">
    <img src="/wp-content/uploads/card-grey-bg-stretch.svg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:fill;z-index:0;pointer-events:none;" alt="" aria-hidden="true">
    <p>ikon</p>
    <h3>Alapfokú vezetéstechnikai tréning</h3>
    <p>Kezdőknek és haladóknak</p>
    ...
</div>
```

---

## 🎯 Miért Működik Ez?

1. **IMG tag + object-fit: fill** → Az IMG mindig kitölti a teljes szülő elemet
2. **position: absolute** → Az IMG a háttérbe kerül
3. **z-index: 0** → A tartalom (z-index: 1) az IMG fölött van
4. **pointer-events: none** → Az IMG nem zavarja a kattintásokat
5. **preserveAspectRatio="none"** az SVG-ben → Engedélyezi a torzítást

---

## 🔧 Alternatív Módszer: Shortcode (Haladó)

Ha nem szeretnéd minden kártyánál manuálisan beilleszteni az IMG-t, készíthetsz egy WordPress shortcode-ot.

### functions.php-ba add hozzá:

```php
function training_card_bg() {
    return '<img src="' . get_template_directory_uri() . '/card-grey-bg-stretch.svg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:fill;z-index:0;pointer-events:none;" alt="" aria-hidden="true">';
}
add_shortcode('card_bg', 'training_card_bg');
```

### Gutenberg-ben használat:

```html
<div class="training-card">
    [card_bg]
    <p>Tartalom...</p>
</div>
```

---

## ✅ Tesztelés Checklist

- [ ] Az IMG tag megjelenik a HTML-ben (Inspect Element)
- [ ] Az IMG `object-fit` értéke `fill`
- [ ] A `.training-card` `position` értéke `relative`
- [ ] Az SVG teljesen kitölti a kártyát (nincs fehér szél)
- [ ] A tartalom az SVG fölött jelenik meg
- [ ] Responsive minden képernyőméreten
- [ ] Különböző magasságú kártyáknál is működik

---

## 🆘 Hibaelhárítás

### Probléma: Az IMG nem jelenik meg

**Ellenőrizd:**
```javascript
// Böngésző Console (F12):
document.querySelector('.training-card img')
```

Ha `null` → Az IMG nincs a DOM-ban. Ellenőrizd a HTML-t.

### Probléma: Az SVG nem tölti ki a területet

**Ellenőrizd:**
```javascript
// Böngésző Console:
const img = document.querySelector('.training-card img');
console.log(window.getComputedStyle(img).objectFit);
```

Ha nem `fill` → A CSS felülírja. Add hozzá `!important`-ot.

### Probléma: A tartalom az IMG mögött van

**Megoldás:**
```css
.training-card {
    position: relative !important;
}
.training-card > *:not(img) {
    position: relative;
    z-index: 1;
}
```

---

## 🎓 Összefoglalás

**Ezt a módszert használd:**
- ✅ IMG tag `object-fit: fill` beállítással
- ✅ `card-grey-bg-stretch.svg` (módosított SVG)
- ✅ Absolute pozíció a háttérben

**Ne ezt használd:**
- ❌ `background-image` + `background-size: 100% 100%`
- ❌ Eredeti `card-grey-bg.svg` (megtartja az arányt)

---

## 📞 Következő Lépések

1. Nyisd meg a `WORKING-SOLUTION-IMG-TAG.html` fájlt böngészőben
2. Teszteld, hogy működik-e helyileg
3. Implementáld WordPress-be a fenti útmutató szerint
4. Tesztelj különböző képernyőméreteken

**Ha még mindig nem működik, küldj screenshot-ot a böngésző Inspect Element nézetéről!** 📸
