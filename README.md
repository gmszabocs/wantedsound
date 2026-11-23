# Wanted Sound – automatikus havi válogatás

## Feltöltés

1. A csomagban lévő `playlist.js` és `player.js` fájllal írd felül a weboldal azonos nevű fájljait.
2. Az `assets` mappa tartalmát másold a weboldal meglévő `assets` mappájába. A mappák tartalmát egyesítsd.
3. Töltsd fel a változásokat a GitHub repositoryba. A meglévő GitHub Pages oldal ezután a havi válogatással működik.

A teljes csomag a két JavaScript-fájlt, a húsz MP3-hangrészletet és a húsz borítót tartalmazza. A jelenlegi index ugyanazokat a fájlneveket tölti be. Az első felvétel címe, borítója, időtartama és hangforrása is automatikusan a havi választáshoz igazodik.

## Havi működés

- A meglévő négy és a további tizenhat hang összesen húsz felvételből álló készletet alkot.
- Minden hónapban négy hang jelenik meg, minden látogatónál ugyanabban a sorrendben.
- A hónapot a böngésző a Europe/Budapest időzónában számolja. A téli és nyári időszámítást automatikusan kezeli.
- A véletlenszerű sorrend az időszakból számított közös kezdőértéket használ. Ugyanabban a hónapban újratöltéskor is ugyanaz a lista jelenik meg.
- Egy öthónapos cikluson belül mind a húsz felvétel sorra kerül. Két szomszédos hónap válogatásában nincs közös hang.
- A megnyitott oldalon a hónap ellenőrzése percenként, valamint a lap visszanyitásakor történik. A hónapforduló legfeljebb egy perc késéssel jelenik meg az aktív lapon.
- Ha éppen szól egy felvétel, az befejeződik, majd az új lista első hangja indul. Ha a látogató szüneteltet, a lista már az új hónapra vált.

## Hanganyag

A tizenhat új hangot véletlenszerűen választottam a Wanted Sound nyilvános Bandcamp-kiadványaiból, és mindegyikből egy véletlenszerűen kiválasztott, elérhető felvétel elejét használtam. A hangrészletek legfeljebb 45 másodperces, 128 kbps MP3-fájlok. Az eredeti négy felvétel hangfájljait és metaadatait a meglévő változatból vettem át. A teljes felvételekhez minden sor mellett külön Bandcamp-link tartozik.

A hangfájlok és borítók a csomagban vannak, és a saját GitHub Pages oldalról töltődnek be. A hullámformák a tényleges hangrészletekből készültek. A megjelenítési erősítés csak az élő hullám rajzolatát változtatja.

| Felvétel | Állapot | Teljes kiadvány |
| --- | --- | --- |
| Waves of Baška | Meglévő | https://wantedsound.bandcamp.com/album/waves-of-ba-ka |
| Wind in the Pine | Meglévő | https://wantedsound.bandcamp.com/album/wind-in-the-pine |
| Double Decker Bus Ride | Meglévő | https://wantedsound.bandcamp.com/album/double-decker-bus-ride |
| Old 90’s Turntable | Meglévő | https://wantedsound.bandcamp.com/album/old-90s-turntable |
| A Murder of Crows in Suburbia | Új | https://wantedsound.bandcamp.com/album/a-murder-of-crows-in-suburbia |
| Sewer Water | Új | https://wantedsound.bandcamp.com/album/sewer-water |
| Electrosmog | Új | https://wantedsound.bandcamp.com/album/electrosmog |
| Wheel Change | Új | https://wantedsound.bandcamp.com/album/wheel-change |
| Laundry Day | Új | https://wantedsound.bandcamp.com/album/laundry-day |
| Wind | Új | https://wantedsound.bandcamp.com/album/wind |
| SUP Ride on Lake Balaton | Új | https://wantedsound.bandcamp.com/album/sup-ride-on-lake-balaton |
| Solar Panel Electrosmog | Új | https://wantedsound.bandcamp.com/album/solar-panel-electrosmog |
| Baška Summer Seaside | Új | https://wantedsound.bandcamp.com/album/ba-ka-summer-seaside |
| Stomach Noises | Új | https://wantedsound.bandcamp.com/album/stomach-noises |
| A Tale of Two Trees | Új | https://wantedsound.bandcamp.com/album/a-tale-of-two-trees |
| Whitely Bay Beach | Új | https://wantedsound.bandcamp.com/album/whitely-bay-beach |
| Visiting Miskolc Train Station | Új | https://wantedsound.bandcamp.com/album/visiting-miskolc-train-station |
| Diesel Trains Speeding Past | Új | https://wantedsound.bandcamp.com/album/diesel-trains-speeding-past |
| Fireworks at New Year's Eve | Új | https://wantedsound.bandcamp.com/album/fireworks-at-new-years-eve |
| Taking a Shower | Új | https://wantedsound.bandcamp.com/album/taking-a-shower |
