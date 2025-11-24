# Training Card SVG Háttérkép Hibaelhárítási Útmutató

## 🔍 1. Probléma Diagnosztizálása

### Futtasd a Debug Scriptet a Böngészőben

1. Menj a weboldalra: https://malikmotorosoktatas.hu/
2. Nyisd meg a fejlesztői eszközöket: **F12** vagy **Jobb klikk → Vizsgálat (Inspect)**
3. Menj a **Console** fülre
4. Nyisd meg a `debug-svg-background.js` fájlt
5. Másold be a teljes tartalmát a konzolba és nyomj **Enter**-t

A script megmutatja:
- ✅ Megtalálta-e a `.training-card` elemeket
- 📐 Milyen méretűek a kártyák
- 🎨 Milyen CSS értékek vannak beállítva
- ⚠️ Mi a probléma (ha van)
- 🔧 Gyors teszt megoldás

---

## 🔧 2. Azonnali Javítás (WordPress Admin)

### Opció A: Additional CSS (Legegyszerűbb)

1. Menj a **WordPress Admin** → **Appearance** → **Customize**
2. Kattints az **Additional CSS**-re
3. Írd be a következőt:

```css
.training-card,
.wp-block-column.training-card {
    background-size: 100% 100% !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
}
```

4. Kattints a **Publish** gombra

### Opció B: Teljes Ultimate Fix CSS Betöltése

1. Töltsd fel a `training-card-fix-ultimate.css` fájlt a témádba:
   - Hely: `/wp-content/themes/[your-theme]/`

2. Add hozzá a `functions.php`-hoz:

```php
function enqueue_training_card_fix() {
    wp_enqueue_style(
        'training-card-fix',
        get_template_directory_uri() . '/training-card-fix-ultimate.css',
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_training_card_fix');
```

### Opció C: Inline Style a HTML-ben

Ha közvetlen hozzáférésed van a HTML-hez, add hozzá a `<head>` részhez:

```html
<style>
    .training-card {
        background-size: 100% 100% !important;
        background-position: center center !important;
        background-repeat: no-repeat !important;
    }
</style>
```

---

## 🕵️ 3. Gyakori Problémák és Megoldásaik

### Probléma 1: A CSS be van töltve, de nem működik

**Ok:** Más CSS szabály magasabb specificitással felülírja.

**Megoldás:**
- Használd a `training-card-fix-ultimate.css`-t, ami minden lehetséges szelektort tartalmaz
- Vagy add hozzá inline style-ként közvetlenül a HTML elemhez

### Probléma 2: Az SVG nem jelenik meg

**Ok:** Az SVG fájl útvonala hibás.

**Ellenőrzés:**
1. Nézd meg a böngésző Network fülön, hogy betöltődik-e a `card-grey-bg.svg`
2. Ha **404 hibát** látszik, az útvonal rossz

**Megoldás:**
```css
/* Próbáld ki ezeket az útvonalakat egyenként */
background-image: url('/wp-content/uploads/card-grey-bg.svg');
background-image: url('/wp-content/uploads/2024/11/card-grey-bg.svg');
background-image: url('../card-grey-bg.svg');
```

### Probléma 3: Az SVG látszik, de nem nyúlik a teljes területre

**Ok:** A `background-size` nem `100% 100%`.

**Ellenőrzés** (Böngésző Console):
```javascript
const card = document.querySelector('.training-card');
console.log(window.getComputedStyle(card).backgroundSize);
```

Ha nem `100% 100%`, akkor:

**Megoldás** (Ideiglenes teszt):
```javascript
document.querySelectorAll('.training-card').forEach(card => {
    card.style.setProperty('background-size', '100% 100%', 'important');
});
```

Ha ez működik, akkor CSS specificitás a probléma. Használd az **Ultimate Fix CSS**-t.

### Probléma 4: WordPress Builder (Gutenberg) felülírja

**Ok:** A Gutenberg inline style-okat generál, amik felülírják a CSS-t.

**Megoldás:**
1. Szerkeszd meg a blokkot Gutenberg-ben
2. Menj az **Advanced** → **Additional CSS class(es)** részhez
3. Add hozzá: `training-card-fixed`

Majd a CSS-ben:
```css
.training-card-fixed {
    background-size: 100% 100% !important;
}
```

---

## ✅ 4. Tesztelés

### Ellenőrizd, hogy működik-e:

1. **Böngésző méret változtatása:**
   - Változtasd a böngésző ablak méretét
   - Az SVG háttérnek követnie kell a kártya méretét

2. **Fejlesztői eszközök:**
   - Jobb klikk a kártyára → **Inspect**
   - Nézd meg a **Computed** fülön a `background-size` értékét
   - Legyen: `100% 100%`

3. **Különböző eszközökön:**
   - Desktop: Teljes méret
   - Tablet: Közepes méret
   - Mobil: Kis méret
   - Mindenhol legyen kitöltve az SVG

---

## 📞 5. Ha továbbra sem működik

Küldj vissza ezeket az információkat:

1. **Debug script kimenet** (Console-ból másold ki)
2. **Screenshot** a problémáról
3. **Computed styles** a `.training-card` elemről:
   - Jobb klikk → Inspect
   - Computed tab
   - Keresd meg: `background-size`, `background-image`
4. **Network tab**:
   - Betöltődik-e a `card-grey-bg.svg`?
   - Milyen státusz kód? (200 OK / 404 Not Found)

---

## 🎯 Gyors Teszt Checklist

- [ ] A `.training-card` elemek megtalálhatók az oldalon
- [ ] A `card-grey-bg.svg` sikeresen betöltődik (nincs 404)
- [ ] A CSS fájlok betöltődnek
- [ ] A `background-size: 100% 100%` be van állítva
- [ ] Nincs más CSS ami felülírja
- [ ] Responsive minden eszközön
- [ ] A JavaScript betöltődik (ha használod)

---

**Készítette:** Claude AI
**Dátum:** 2024-11-24
**Projekt:** Malik Motoros Tréning
