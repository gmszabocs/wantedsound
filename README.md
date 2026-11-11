# Wanted Sound

Egyoldalas, angol nyelvű, statikus weboldal. Középre rendezett eredeti logó, teljes képernyős zenehallgató nézet, a valódi hangra reagáló élő hullámforma, lassan mozgó tengeres háttér, négy hangrészlet, rövid történet, Bandcamp és Instagram. A felső fejléc és banner eltávolítva.

## Feltöltés GitHub Pagesre

A csomag tartalma a teljes működő weboldal. Nincs csomagtelepítés, fordítás, adatbázis, szerver vagy titkos API-kulcs.

1. Hozz létre egy GitHub repositoryt.
2. A csomag **tartalmát** töltsd a repository gyökerébe: az `index.html` közvetlenül ott legyen. Az `assets/` mappát és a `.nojekyll` fájlt is tartsd meg.
3. A repository **Settings → Pages** oldalán a forrás legyen **Deploy from a branch**, majd **main / (root)**. Mentsd el.
4. Saját domainhez ugyanitt add meg a domaint a **Custom domain** mezőben. A DNS-beállításokat a domainszolgáltatónál kell megadni a GitHub útmutatója szerint. A domain még nincs bekötve ebben az átadásban.
5. Amikor a tanúsítvány elkészült, kapcsold be az **Enforce HTTPS** lehetőséget.

Hivatalos útmutatók:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

A relatív fájlhivatkozások miatt saját domainen és repository alatti GitHub Pages címen is működik. A ZIP-csomag weboldalfájljai már a csomag gyökerében vannak; feltöltéskor nem kell külön `dist` mappát létrehozni.

## Helyi megtekintés

A `index.html` közvetlenül megnyitható böngészőben. Fejlesztéskor használható egyszerű statikus kiszolgáló is:

```sh
python3 -m http.server 8000
```

## Szerkesztés

- `index.html`: a márkaszöveg, a történet, a Bandcamp- és Instagram-linkek.
- `styles.css`: megjelenés és mobilos elrendezés.
- `playlist.js`: a lejátszási lista, címek, hangfájlok, borítók, hullámformák, Bandcamp céloldalak.
- `player.js`: lejátszás/szünet, előző/következő, hangerő, némítás, idővonal, automatikus továbblépés és teljes képernyős gomb.
- `visualizer.js`: Web Audio API és Canvas alapú, valódi hangmintákból rajzolt élő hullámforma. Nem kér mikrofonengedélyt. A felvételenként kalibrált megjelenítési erősítés csak a rajzot változtatja.
- `assets/`: helyben tárolt MP3-részletek, borítók, háttérkép és SVG-jel.

## A lejátszási lista

| Felvétel | Részlet hossza | Eredeti megjelenés |
| --- | --- | --- |
| Waves of Baška | 45 mp | https://wantedsound.bandcamp.com/album/waves-of-ba-ka |
| Wind in the Pine | 45 mp | https://wantedsound.bandcamp.com/album/wind-in-the-pine |
| Double Decker Bus Ride | 45 mp | https://wantedsound.bandcamp.com/album/double-decker-bus-ride |
| Old 90’s Turntable | 22 mp | https://wantedsound.bandcamp.com/album/old-90s-turntable |

A részletek az adott kiadvány első felvételének elejéből származnak, helyben tárolt 128 kbps MP3-ként. Nincs lejáró streaming-hivatkozás vagy külső lejátszófüggőség. A hullámformák a tényleges hangrészletekből készültek. A teljes, jó minőségű eredetikhez minden felvétel mellett Bandcamp-link tartozik.

Hangok, borítók és a tengerparti háttérkép forrása: Wanted Sound / Ben Scott, a megadott Bandcamp-kiadványok. A saját domain pontos neve nem lett megadva, ezért nincs előre kitöltött CNAME vagy kanonikus URL. A rövid angol bemutatkozás a nyilvános Bandcamp-adatok alapján szerkesztett márkaszöveg; évszámot és kitalált alapítástörténetet nem tartalmaz.

## Használat

Az oldal betöltéskor csendben marad. A logó alatt közvetlenül látható a lejátszó és a hanglista. A lejátszógomb azonnal indítja a kiválasztott részletet. A lista bármelyik felvétele közvetlenül elindítható; egyszerre egy hang szól. Az utolsó részlet után a lista megáll. A szóköz lejátszást/szünetet kapcsol, ha nincs másik vezérlő fókuszban. A csúszkák billentyűzetről is használhatók. A teljes képernyős gomb az ezt támogató böngészőkben jelenik meg. A háttér CSS-mozgása, valamint az élő hullámforma tiszteletben tartja a csökkentett mozgás rendszerbeállítását; ilyenkor állókép marad. Szünetben és háttérbe tett lapon a rajzolási ciklus leáll. JavaScript nélkül az első hangrészlet natív lejátszóval és a Bandcamp-linkkel érhető el.
