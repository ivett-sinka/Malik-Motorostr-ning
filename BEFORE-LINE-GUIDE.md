# 📏 Vízszintes Vonal ::before/::after Útmutató

## Kérdés
> "Azt valahogy be lehet állítani, hogy egy before vízszintes vonal mindig az elemtől a border-box paddingig fut?"

**Válasz:** Igen! Van rá több megoldás attól függően, hogy pontosan mit szeretnél.

---

## 🎯 Leggyakoribb Megoldások

### 1️⃣ Fix Szélesség (Egyszerű)

```css
.element {
    position: relative;
    padding-left: 80px;
}

.element::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 60px; /* Fix hossz */
    height: 3px;
    background-color: #ff6600;
}
```

**Mikor használd:**
- Fix hosszú vonal (pl. 60px)
- Egyszerű dizájn

---

### 2️⃣ Flex Auto-Kitöltés (Ajánlott!)

```css
.element {
    display: flex;
    align-items: center;
    gap: 20px;
}

.element::before {
    content: '';
    flex: 1; /* Automatikusan kitölti a rendelkezésre álló helyet */
    height: 3px;
    background-color: #ff6600;
    order: -1; /* Vonal balra */
}
```

**Mikor használd:**
- Dinamikus szélesség
- Vonal kitölti a helyet automatikusan
- **Legjobb megoldás responsive dizájnhoz!**

**Előnyök:**
✅ Automatikus szélesség
✅ Nem kell számolni padding-gal
✅ Responsive-friendly

---

### 3️⃣ Grid Megoldás

```css
.element {
    display: grid;
    grid-template-columns: 1fr auto; /* Vonal | Szöveg */
    align-items: center;
    gap: 20px;
}

.element::before {
    content: '';
    height: 3px;
    background-color: #ff6600;
}
```

**Mikor használd:**
- Precíz layout kontroll
- Több oszlopos elrendezés

---

### 4️⃣ Calc() - Pontos Padding Széléig

```css
.box {
    padding: 30px;
}

.element {
    position: relative;
}

.element::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: -30px; /* Negatív padding érték */
    width: calc(100% + 60px); /* 100% + (2 * padding) */
    height: 3px;
    background-color: #ff6600;
}
```

**Mikor használd:**
- Teljes széles vonal a padding széléig
- Fix padding értékek

---

### 5️⃣ CSS Variables - Dinamikus (PRO!)

```css
.box {
    --box-padding: 30px;
    padding: var(--box-padding);
}

.element::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--box-padding));
    width: calc(100% + (2 * var(--box-padding)));
    height: 3px;
    background-color: #ff6600;
}
```

**HTML:**
```html
<div class="box" style="--box-padding: 40px;">
    <h3 class="element">Heading</h3>
</div>
```

**Mikor használd:**
- Dinamikus padding értékek
- Több különböző padding méret
- **Legjobb megoldás változó paddinghez!**

**Előnyök:**
✅ Teljesen dinamikus
✅ Inline style-lal módosítható
✅ Egyszer írod meg, mindenhol működik

---

## 📊 Összehasonlítás

| Megoldás | Egyszerűség | Dinamikus | Responsive | Ajánlott |
|----------|------------|-----------|------------|----------|
| **Fix szélesség** | ⭐⭐⭐⭐⭐ | ❌ | ⚠️ | Egyszerű esetekre |
| **Flex auto-fill** | ⭐⭐⭐⭐ | ✅ | ✅ | **LEGJOBB általános** |
| **Grid** | ⭐⭐⭐ | ✅ | ✅ | Komplex layout |
| **Calc()** | ⭐⭐⭐ | ⚠️ | ⚠️ | Fix padding |
| **CSS Variables** | ⭐⭐⭐⭐ | ✅ | ✅ | **LEGJOBB dinamikus** |

---

## 🎨 Valós Példák

### Példa 1: Heading balról vonal

```css
h2 {
    display: flex;
    align-items: center;
    gap: 20px;
}

h2::before {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(to right, transparent, #ff6600);
    order: -1;
}
```

**Eredmény:**
```
─────────── Heading Szöveg
```

---

### Példa 2: Heading jobbról vonal

```css
h2 {
    display: flex;
    align-items: center;
    gap: 20px;
}

h2::before {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(to left, transparent, #ff6600);
    order: 1; /* Jobbra */
}
```

**Eredmény:**
```
Heading Szöveg ───────────
```

---

### Példa 3: Heading mindkét oldalról

```css
h2 {
    display: flex;
    align-items: center;
    gap: 20px;
}

h2::before,
h2::after {
    content: '';
    flex: 1;
    height: 2px;
    background-color: #ff6600;
}
```

**Eredmény:**
```
──────── Heading Szöveg ────────
```

---

### Példa 4: Vonal alatt, teljes szélességben

```css
.box {
    --padding: 30px;
    padding: var(--padding);
}

h2 {
    position: relative;
    padding-bottom: 15px;
}

h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: calc(-1 * var(--padding));
    width: calc(100% + (2 * var(--padding)));
    height: 2px;
    background-color: #ff6600;
}
```

**Eredmény:**
```
┌─────────────────────────┐
│  padding                │
│  Heading Szöveg         │
│  ─────────────────────  │ ← Teljes széles
│                         │
└─────────────────────────┘
```

---

## 🛠️ Univerzális Utility Class

Használd ezt a megoldást, ha gyakran kell vonalat hozzáadni elemekhez:

```css
/* CSS */
.has-line-before {
    position: relative;
    padding-left: var(--line-gap, 80px);
}

.has-line-before::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: var(--line-width, 60px);
    height: var(--line-height, 3px);
    background-color: var(--line-color, #ff6600);
}
```

**HTML használat:**

```html
<!-- Default értékekkel -->
<h2 class="has-line-before">Heading</h2>

<!-- Custom értékekkel -->
<h2 class="has-line-before" style="--line-width: 100px; --line-color: blue;">
    Heading
</h2>
```

---

## 🎯 Melyiket Válaszd?

### Ha EGYSZERŰ vonalat akarsz:
→ **Flex megoldás** (#2)

```css
display: flex;
align-items: center;
gap: 20px;

::before {
    flex: 1;
}
```

### Ha PADDING SZÉLÉIG kell menjen:
→ **CSS Variables** (#5)

```css
--box-padding: 30px;

::before {
    left: calc(-1 * var(--box-padding));
    width: calc(100% + (2 * var(--box-padding)));
}
```

### Ha TÖBB HELYEN használod:
→ **Utility class** + CSS Variables

---

## 📱 Responsive Tippek

### 1. Adaptív vonal hossz

```css
.element::before {
    width: 60px;
}

@media (max-width: 768px) {
    .element::before {
        width: 40px;
    }
}
```

### 2. Vonal eltűnik mobilon

```css
.element::before {
    display: block;
}

@media (max-width: 768px) {
    .element::before {
        display: none;
    }
}
```

### 3. Dinamikus padding figyelése

```css
.box {
    --padding: 30px;
}

@media (max-width: 768px) {
    .box {
        --padding: 20px; /* Automatikusan frissül mindenhol! */
    }
}
```

---

## 🎨 Stílus Variációk

### Gradient vonal

```css
::before {
    background: linear-gradient(to right, transparent, #ff6600);
}
```

### Dashed vonal

```css
::before {
    border-top: 2px dashed #ff6600;
    height: 0;
}
```

### Dotted vonal

```css
::before {
    border-top: 2px dotted #ff6600;
    height: 0;
}
```

### Shadow-val

```css
::before {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

---

## 🐛 Gyakori Hibák

### ❌ Hiba 1: Vonal nem jelenik meg

```css
/* Rossz: */
::before {
    width: 60px;
    height: 3px;
    background-color: red;
}
```

**Megoldás:** Hiányzik a `content: '';`

```css
/* Jó: */
::before {
    content: ''; /* ← EZ KELL! */
    width: 60px;
    height: 3px;
    background-color: red;
}
```

---

### ❌ Hiba 2: Vonal rossz helyen van

```css
/* Rossz: */
.element::before {
    width: 60px;
}
```

**Megoldás:** Add meg a pozíciót

```css
/* Jó: */
.element {
    position: relative; /* Szülő relative */
}

.element::before {
    position: absolute; /* ::before absolute */
    left: 0;
    top: 50%;
}
```

---

### ❌ Hiba 3: Calc() nem működik responsive-en

```css
/* Rossz: */
::before {
    left: -30px; /* Fix érték */
    width: calc(100% + 60px);
}
```

**Megoldás:** Használj CSS Variable-t

```css
/* Jó: */
.box {
    --padding: 30px;
}

::before {
    left: calc(-1 * var(--padding));
    width: calc(100% + (2 * var(--padding)));
}
```

---

## 📚 Tesztelési Checklist

- [ ] Vonal megjelenik
- [ ] Vonal jó pozícióban van
- [ ] Vonal hossza megfelelő
- [ ] Responsive méreteken is működik
- [ ] Különböző padding értékekkel működik
- [ ] Nincs horizontális scroll

---

## 🚀 Gyors Példa - Kipróbáláshoz

```html
<!DOCTYPE html>
<html>
<head>
<style>
.box {
    --padding: 30px;
    padding: var(--padding);
    background: #f5f5f5;
}

h2 {
    display: flex;
    align-items: center;
    gap: 20px;
}

h2::before {
    content: '';
    flex: 1;
    height: 3px;
    background: linear-gradient(to right, transparent, #ff6600);
    order: -1;
}
</style>
</head>
<body>
    <div class="box">
        <h2>Pillanatok a tréningekről</h2>
        <p>Lorem ipsum dolor sit amet...</p>
    </div>
</body>
</html>
```

---

**Tipp:** Nyisd meg a `before-line-examples.html` fájlt, hogy mind a 10 példát lásd működés közben! 🎉
