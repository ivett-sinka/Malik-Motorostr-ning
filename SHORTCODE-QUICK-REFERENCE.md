# 📌 Training Tabs Shortcode - Gyors Referencia

## 🎯 Gyors Telepítés (3 lépés)

### 1. Fájlok másolása a theme-ba:
```
✅ functions.php (vagy hozzáadni a meglévőhöz)
✅ template-parts/training-tabs-section.php
✅ training-tabs.js
✅ training-tabs-fixed.css
```

### 2. Gutenberg shortcode beszúrása:
```
[training_tabs]
```

### 3. Kész! 🎉

---

## 💡 Használat

### Gutenberg Block Editor-ban:
1. Kattints **[+]**
2. Keress: **"Shortcode"**
3. Írd be: `[training_tabs]`

### PHP Template-ben:
```php
<?php get_template_part('template-parts/training-tabs-section'); ?>
```

### Shortcode bárhol:
```php
<?php echo do_shortcode('[training_tabs]'); ?>
```

---

## 🔧 Gyors Módosítások

### Szöveg módosítása:
📄 `template-parts/training-tabs-section.php`

### Stílus módosítása:
🎨 `training-tabs-fixed.css`

### Funkció módosítása:
⚙️ `training-tabs.js`

---

## 🐛 Gyors Hibaelhárítás

| Probléma | Megoldás |
|----------|----------|
| Shortcode nem renderelődik | Ellenőrizd `functions.php` betöltését |
| Tabok nem váltanak | Ellenőrizd `training-tabs.js` betöltését (F12 Console) |
| Stílus hiányzik | Ellenőrizd CSS útvonalat `functions.php`-ben |
| VIP kártya lecsúszik | Ellenőrizd `position: static` van-e az aktív kártyánál |

---

## 📱 Responsive Viselkedés

| Képernyő méret | Viselkedés |
|----------------|------------|
| **>1140px** | Két oszlop egymás mellett |
| **≤1140px** | Tab gombok + egy kártya animációval |

---

## ✅ Tesztelési Gyors Checklist

- [ ] Shortcode megjelenik
- [ ] Desktop: 2 oszlop látható
- [ ] Mobile: Tab gombok + animáció
- [ ] VIP kártya nem csúszik le
- [ ] Gutenberg blokkok működnek utána

---

## 🔗 További Dokumentáció

📖 **Teljes útmutató:** `GUTENBERG-BREAKOUT-GUIDE.md`
🛠️ **Fix megoldások:** `tab-sliding-fix-solutions.md`

---

**Verzió:** 1.0
**Utolsó frissítés:** 2025-11-27
