# Integración de Pandillaje y Ciberacoso

Implementación verificada el 30 de octubre de 2026. Publicación en GitHub solicitada posteriormente por el equipo.

## Resultado

- EP. 001: **El precio del dinero fácil**, categoría Sociedad y comunidad.
- EP. 002: Fast Fashion conserva su contenido, video y cuestionario; solo cambian los títulos de las referencias a los otros episodios en su navegación final.
- EP. 003: **Detrás de cada pantalla**, categoría Convivencia digital.
- Ambos episodios nuevos incluyen portada editorial, sinopsis oficial, video vertical, personajes, contenido educativo, tres preguntas con retroalimentación y reintentos, acciones y enlaces entre episodios y al catálogo.
- Se reutilizan `episode.css`, `episode.js`, `episode-media.js` y `quiz.js`. Los estilos nuevos están aislados en `episodes-final.css`, enlazado únicamente por los episodios 001 y 003.
- Catálogo con pósteres oficiales en color y encuadre completo. Búsqueda y filtros conservados. También se actualizó su presentación sin JavaScript.

## Videos reales inspeccionados con FFprobe

| Archivo en assets/videos/ | Bytes exactos | MiB | Resolución | Duración | Códecs |
| --- | ---: | ---: | --- | --- | --- |
| pandillaje.mp4 | 24 802 129 | 23,65 | 720 × 1280 | 60,067166 s | H.264 High, yuv420p; AAC-LC estéreo, 44,1 kHz |
| ciberacoso.mp4 | 37 459 892 | 35,72 | 1080 × 1920 | 63,808549 s | H.264 High, yuv420p; AAC-LC estéreo, 44,1 kHz |

Ambos son MP4, proporción 9:16. Se integran los originales sin recodificar, modificar ni crear duplicados de video. Reproductores con `controls`, `playsinline`, `preload="metadata"`, sin autoplay ni estiramiento y con `object-fit: contain`. El navegador decide cuántos bytes descargar para obtener los metadatos; `metadata` no garantiza una cantidad fija de transferencia.

El módulo compartido ya admite `media.captions` y crea un track español WebVTT cuando se proporciona una ruta real. El campo permanece vacío: no hay archivos VTT ni tiempos inventados. Los diálogos facilitados se muestran en un desplegable, en el orden original, identificados como transcripción sin sincronizar.

## Recursos visuales utilizados

Se inspeccionaron los 11 PNG originales; todos están conservados. No se generaron imágenes ni se reutilizaron retratos de otros episodios.

| Carpeta | Archivo | Dimensiones | Bytes | Uso |
| --- | --- | --- | ---: | --- |
| assets/episodios/pandillaje/ | poster-pandillaje.png | 1024 × 1536 | 2 881 857 | Catálogo y portada editorial |
| assets/episodios/pandillaje/ | portada-pandillaje.png | 941 × 1672 | 2 761 606 | Atributo poster del reproductor |
| assets/episodios/pandillaje/ | manzana.png | 1254 × 1254 | 1 651 807 | Manzana |
| assets/episodios/pandillaje/ | pera.png | 1254 × 1254 | 1 715 219 | Mamá Pera: cárdigan rosa y blusa de flores |
| assets/episodios/pandillaje/ | piña.png | 1254 × 1254 | 1 976 045 | Piña |
| assets/episodios/pandillaje/ | pera-jefe.png | 1254 × 1254 | 2 025 322 | Jefe Pera: sombrero y traje oscuro de rayas |
| assets/episodios/ciberacoso/ | poster-ciberacoso.png | 1024 × 1536 | 2 687 192 | Catálogo y portada editorial |
| assets/episodios/ciberacoso/ | portada-ciberacoso.png | 941 × 1672 | 2 333 209 | Atributo poster del reproductor |
| assets/episodios/ciberacoso/ | fresita.png | 1254 × 1254 | 1 625 219 | Fresa |
| assets/episodios/ciberacoso/ | platano.png | 1254 × 1254 | 1 457 606 | Plátano |
| assets/episodios/ciberacoso/ | uva.png | 1254 × 1254 | 1 847 415 | Uva |

Las dos Peras se distinguen por los archivos y por su apariencia real. Ciberacoso contiene únicamente Fresa, Uva y Plátano, con sus retratos originales. Mora y Uva se unifican como Uva; Manzana no forma parte de las tarjetas.

## Verificación

- `qa/check.mjs`: nueve grupos de comprobaciones, incluidas 63 evaluaciones de respuestas, imports, rutas, anclas, IDs, búsqueda, filtros y eventos del reproductor con dobles DOM. Se actualizaron las claves oficiales de los dos quizzes y se corrigió el comprobador para aceptar las query strings existentes en imágenes.
- `qa/pages-check.mjs`: rutas relativas y capitalización bajo `/change-lab/`, respuestas HTTP, MIME de video y peticiones Range de los tres MP4. El máster local de Fast Fashion continúa excluido.
- `qa/episodes-browser.mjs`: Chrome instalado, modo headless. Metadatos reales, video inicialmente pausado, controles, reproducción con avance de tiempo y fotogramas decodificados, audio sin silenciar y pausa. Quizzes: falta de selección, respuesta incorrecta, acierto y reinicio. Navegación local y anclas. Catálogo con tres imágenes, búsqueda y filtro. Error de carga de ambos videos y contenido sin JavaScript.
- Pruebas responsive de los tres episodios a **375, 768, 1024 y 1440 px**: sin desbordamiento horizontal ni imágenes rotas. Capturas locales en `qa/`, excluidas de Git; revisión visual de la composición móvil y de escritorio.
- `qa/episodes-results.json` conserva los resultados detallados del navegador.
- FFmpeg decodificó los primeros cinco segundos del audio de ambos MP4: señal presente, máximos de −6,8 dB en Pandillaje y −7,7 dB en Ciberacoso. No se verificó por escucha mediante altavoces.
- Fast Fashion pasó las mismas pruebas de reproducción, pausa, cuestionario y responsive. Su configuración en `episodes-data.js` se conserva.

Los scripts Node requieren Node 22 o posterior. El test de navegador utiliza una instalación externa de Playwright y Chrome; no se añadió una dependencia al sitio. Se puede indicar su ubicación mediante `CHANGE_LAB_PLAYWRIGHT`.

## Publicación y almacenamiento

La web sigue siendo estática, con `.nojekyll` y rutas relativas compatibles con un subdirectorio de GitHub Pages, incluida `piña.png`. No requiere compilación ni servicios de pago.

Los dos videos están por debajo de 50 MiB. GitHub advierte por archivos superiores a 50 MiB y bloquea los superiores a 100 MiB en Git normal: [documentación oficial](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github). El máster local `fast-fashion.mp4.mp4` de 194 607 490 bytes permanece excluido por `.gitignore` y conservado en disco.

El conjunto local de archivos candidatos al repositorio ronda **114 MiB**, incluyendo estos materiales originales; los objetos Git existentes ocupan 31,57 MiB. El límite recomendado del repositorio fuente de Pages es 1 GB y su límite de transferencia mensual es 100 GB: [límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Esto verifica el presupuesto local; no mide el estado de una publicación remota.

## Archivos de código modificados o añadidos

1. temas/pandillaje.html
2. temas/ciberacoso.html
3. temas/fast-fashion.html — únicamente referencias de navegación a los nuevos títulos.
4. js/episodes-data.js
5. js/topics-data.js
6. css/episodes-final.css — nuevo.
7. css/topics.css
8. problematicas.html
9. qa/check.mjs
10. qa/pages-check.mjs
11. qa/episodes-browser.mjs — nuevo.
12. qa/episodes-results.json — nuevo, evidencia.
13. EPISODIOS_001_003.md — este informe.

Los 11 PNG y los dos MP4 suministrados ya estaban en disco sin seguimiento de Git. Se utilizan directamente y no se modificaron ni se añadieron al índice.

## Pendientes

- Mantener únicamente los tres retratos originales de Fresa, Uva y Plátano en Ciberacoso.
- Subtítulos WebVTT sincronizados y revisados para cada video.
- Comprobación en Safari/iOS y dispositivos físicos, no disponibles en esta prueba de Chrome de escritorio.
