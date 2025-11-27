# 📸 Képek Hozzáadása a Galériához

## Ajánlott Kép Specifikációk

- **Méret:** 348 x 259px (fekvő tájolású)
- **Aspect Ratio:** ~1.34:1
- **Formátum:** JPG, PNG, vagy WEBP
- **Minőség:** 80-90% (optimalizált fájlméret)
- **Maximális fájlméret:** < 100KB per kép

---

## Fájlnevek Konvenciója

```
training-1.jpg
training-2.jpg
training-3.jpg
training-4.jpg
training-5.jpg
training-6.jpg
```

**Fontos:**
- Kisbetűs fájlnevek
- Sorszámozás 1-től kezdődik
- Nincs szóköz a fájlnévben

---

## Placeholder Képek (Fejlesztéshez)

Ha még nincsenek saját képeid, használj placeholder szolgáltatásokat:

### 1. Picsum Photos (Valós fotók)
```html
<img src="https://picsum.photos/348/259?random=1" alt="Tréning pillanat 1">
<img src="https://picsum.photos/348/259?random=2" alt="Tréning pillanat 2">
<img src="https://picsum.photos/348/259?random=3" alt="Tréning pillanat 3">
```

### 2. Placeholder.com (Egyszerű)
```html
<img src="https://via.placeholder.com/348x259/333/fff?text=Training+1" alt="...">
<img src="https://via.placeholder.com/348x259/333/fff?text=Training+2" alt="...">
```

### 3. Unsplash Source (Profi fotók)
```html
<img src="https://source.unsplash.com/348x259/?motorcycle,training" alt="...">
```

---

## Saját Képek Optimalizálása

### Online Eszközök:
1. **TinyPNG** - https://tinypng.com/
   - JPG/PNG tömörítés
   - Akár 70% méretcsökkentés

2. **Squoosh** - https://squoosh.app/
   - Google eszköz
   - WebP konvertálás

3. **ImageOptim** (Mac) - https://imageoptim.com/

### Parancssor (ImageMagick):

```bash
# Átméretezés 348x259px-re
magick input.jpg -resize 348x259^ -gravity center -extent 348x259 output.jpg

# Tömörítés 85% minőséggel
magick input.jpg -quality 85 output.jpg

# WebP konvertálás
magick input.jpg -quality 80 output.webp
```

---

## Képek Elhelyezése

1. Másold a képeket az `images/` mappába
2. Nevezd át őket: `training-1.jpg`, `training-2.jpg`, stb.
3. Ellenőrizd a HTML-ben az `src` útvonalakat
4. Teszteld a galériát

---

## Több Kép Hozzáadása

Ha több mint 6 képed van:

1. **Módosítsd az `index.html`-t:**
   - Add hozzá az új `.gallery-item` elemeket
   - Duplikáld őket a seamless loop-hoz

2. **Módosítsd a `photo-gallery.js`-t:**
   ```javascript
   const totalImages = 10; // Ha 10 képed van
   ```

---

## Tippek

✅ **DO:**
- Használj következetes képminőséget
- Optimalizáld a fájlméretet
- Használj beszédes alt szövegeket
- Tesztelj különböző eszközökön

❌ **DON'T:**
- Ne használj túl nagy képeket (lassítja az oldalt)
- Ne keverj portré és fekvő tájolású képeket
- Ne használj szerzői joggal védett képeket engedély nélkül

---

## 📱 Responsive Képek

Ha különböző méretű képeket akarsz mobile/desktop-ra:

```html
<picture>
    <source media="(max-width: 768px)" srcset="images/training-1-mobile.jpg">
    <source media="(max-width: 480px)" srcset="images/training-1-small.jpg">
    <img src="images/training-1.jpg" alt="Tréning pillanat 1">
</picture>
```

---

**Kész képek után:** Töröld ezt a fájlt vagy nevezd át `_PLACEHOLDER-INFO.md`-re (az underscore elrejti).
