# SVG Háttérkép Méretezés - Használati Útmutató

Ez a dokumentáció segít beállítani, hogy az SVG háttérkép mindig pontosan felvegye a `.training-card` div teljes méretét.

## 🎯 Gyors Megoldás - Csak CSS (Ajánlott)

Ha az SVG-t `background-image`-ként használod, csak add hozzá ezt a CSS-t:

```html
<link rel="stylesheet" href="svg-background-fix.css">
```

Vagy közvetlenül a CSS fájlodhoz:

```css
.training-card {
    background-size: 100% 100% !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
}
```

## 📋 Használati Módszerek

### 1️⃣ CSS Background-Image (Legegyszerűbb)

**HTML:**
```html
<head>
    <link rel="stylesheet" href="svg-background-fix.css">
</head>

<div class="training-card" style="background-image: url('your-image.svg');">
    <!-- Tartalom -->
</div>
```

**Vagy direkt CSS-ben:**
```css
.training-card {
    background-image: url('your-image.svg');
    background-size: 100% 100%; /* Nyújtja szélesség és magasság szerint */
    background-position: center center;
    background-repeat: no-repeat;
}
```

### 2️⃣ JavaScript Megoldás (Dinamikus méretezéshez)

Ha az SVG dinamikusan változik vagy inline módon használod:

**HTML:**
```html
<head>
    <script src="svg-background-fix.js"></script>
</head>

<div class="training-card">
    <!-- Ha inline SVG van itt -->
    <svg>...</svg>
</div>
```

A script automatikusan:
- Beállítja az SVG méretét a konténer szerint
- ResizeObserver-t használ dinamikus átméretezéshez
- Működik window resize esetén is

### 3️⃣ Különböző Méretezési Módok

**Torzítással (teljes kitöltés):**
```css
.training-card {
    background-size: 100% 100%; /* Torzíthat, de kitölti a teljes területet */
}
```

**Torzítás nélkül (levágja a túlcsordulót):**
```html
<div class="training-card svg-cover">
```
vagy
```css
.training-card {
    background-size: cover; /* Arányosan kitölti, levágja a túlcsordulót */
}
```

**Teljes SVG látható (lehet fehér terület):**
```html
<div class="training-card svg-contain">
```
vagy
```css
.training-card {
    background-size: contain; /* Teljes SVG látható, lehet üres terület */
}
```

## 🔧 Inline SVG esetén

Ha az SVG közvetlenül a HTML-ben van:

```html
<div class="training-card">
    <svg preserveAspectRatio="none" width="100%" height="100%">
        <!-- SVG tartalom -->
    </svg>
</div>
```

```css
.training-card svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
```

## 📱 Reszponzív Működés

Minden megoldás automatikusan reszponzív:
- A CSS `background-size: 100% 100%` mindig a konténer méretéhez igazodik
- A JavaScript ResizeObserver figyeli a konténer méretváltozásait
- Window resize eseményekre is reagál

## ⚡ Teljesítmény

**Legjobb teljesítmény:**
1. CSS background-image (svg-background-fix.css)
2. Inline SVG CSS-sel
3. JavaScript megoldás (csak ha dinamikus változtatás szükséges)

## 🎨 Példa - Teljes Implementáció

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <link rel="stylesheet" href="svg-background-fix.css">
    <style>
        .training-card {
            width: 400px;
            height: 300px;
            background-image: url('background.svg');
            /* A svg-background-fix.css már beállítja ezeket: */
            /* background-size: 100% 100%; */
            /* background-position: center; */
            /* background-repeat: no-repeat; */
        }
    </style>
</head>
<body>
    <div class="training-card">
        <h2>Tartalom</h2>
        <p>Az SVG háttér mindig kitölti ezt a div-et.</p>
    </div>
</body>
</html>
```

## 🚨 Gyakori Problémák

**Probléma:** Az SVG nem tölti ki a területet
**Megoldás:** Ellenőrizd, hogy a `.training-card`-nak van-e `width` és `height` értéke

**Probléma:** Az SVG torzul
**Megoldás:** Ez normális a `100% 100%` méretezésnél. Ha nem szeretnéd, használd `cover`-t vagy `contain`-t

**Probléma:** Nem működik responsive-en
**Megoldás:** Használd a JavaScript megoldást vagy győződj meg róla, hogy a konténernek dinamikus mérete van

## 📞 Használat a Projektben

1. Másold be az egyik megoldást a projektedbe
2. Teszteld különböző képernyőméreteken
3. Ha dinamikus változás kell, használd a JS megoldást
4. Ha statikus, maradj a CSS megoldásnál

**Ajánlott a legtöbb esetben:**
```css
.training-card {
    background-image: url('your-svg.svg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}
```
