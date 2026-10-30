# Change Lab Shorts — visor inmersivo

Alcance de esta revisión: `shorts.html`, `css/shorts.css`, `js/shorts.js`, `qa/shorts-browser.mjs`, `qa/shorts-results.json` y este documento. No se modificaron las demás páginas, estilos compartidos ni archivos multimedia durante este rediseño.

El visor ocupa la ventana disponible, con header compacto, franja de título/contador, un panel visible y créditos institucionales compactos. Conserva exactamente tres episodios, sin bucle. El video mantiene 9:16 con object-fit contain; el overlay superior deja libres los controles nativos y la zona inferior de subtítulos. Los controles personalizados de 48 × 48 px se sitúan al lado en escritorio y debajo en móvil. Los cambios de header/footer se limitan a la clase shorts-layout.

## Archivos existentes reutilizados

| Episodio | MP4 | Poster |
| --- | --- | --- |
| Pandillaje | assets/videos/pandillaje.mp4 | assets/episodios/pandillaje/portada-pandillaje.png |
| Fast Fashion | assets/videos/fast-fashion-web.mp4 | assets/episodios/fast-fashion/portada-fast-fashion-web.webp |
| Ciberacoso | assets/videos/ciberacoso.mp4 | assets/episodios/ciberacoso/portada-ciberacoso.png |

No hay copias nuevas de MP4 ni imágenes. Las referencias son relativas y compatibles con GitHub Pages.

## Comportamiento

- Scroll vertical nativo con `scroll-snap-type: y mandatory`. Paneles del alto del visor; rueda y gestos nativos, sin reconocer gestos propios ni scroll infinito.
- Botones anterior/siguiente y flechas ↑/↓ cuando el foco está en el visor. Las flechas en videos, botones y enlaces conservan su comportamiento. Extremos desactivados e indicador 01/03, 02/03 o 03/03 anunciado al cambiar de episodio.
- Los controles reales alternan reproducción/pausa, silencio/sonido y `playbackRate` entre 1 y 2. Los controles nativos siguen disponibles para buscar dentro del video y otras funciones del navegador.
- Al iniciar la navegación se pausa el video. El siguiente permanece pausado. Al cambiar de episodio, se restablece 1x. No se inicia audio automáticamente; todos empiezan silenciados y sin autoplay.
- Solo el video activo admite reproducción. Se pausa al ocultar la pestaña o abandonar la página; IntersectionObserver refuerza la pausa fuera del visor. La pausa durante scroll funciona sin depender de esa API.
- El activo usa preload metadata; los demás preload none. No hay llamadas automáticas a play. No se borran datos ya almacenados por el navegador.
- Movimiento suave para botones/flechas, instantáneo con prefers-reduced-motion. ResizeObserver conserva el episodio al redimensionar.
- Las áreas interactivas de los paneles inactivos quedan fuera del recorrido de teclado mediante inert. Los controles se sincronizan con eventos nativos de reproducción, volumen y velocidad. Sin JavaScript permanecen controles nativos, scroll y enlaces de selección; la coordinación requiere JavaScript.

## Pruebas ejecutadas

`qa/shorts-browser.mjs` con Chrome headless:

- Exactamente tres videos; rutas MP4, posters y enlaces educativos correctos y accesibles bajo /change-lab/.
- A 375, 768, 1024 y 1440 px: panel del alto del visor, video 9:16, una publicación visible, sin scroll horizontal ni desbordamiento del documento. Controles de 48 px dentro de la ventana, al lado en escritorio y debajo en móvil. Capturas locales ignoradas por Git; revisión visual de móvil y escritorio.
- Los tres videos reproducen fotogramas reales. Botones de reproducción/pausa, mute/unmute y velocidad 1x/2x comprobados mediante estado del reproductor. Reinicio de velocidad y pausa del anterior al cambiar, con el siguiente detenido.
- Navegación mediante botones, teclado y rueda nativa; ajuste final del scroll-snap, extremos desactivados y contador. Flechas sobre otro control no cambian el episodio. Cambio de tamaño conserva selección; un video inactivo no puede continuar reproduciéndose.
- No se solicitaron MP4 de episodios inactivos al abrir la página; solo el activo pudo cargar metadatos. La política final de preload depende del navegador.
- prefers-reduced-motion, menú móvil/Escape, carga de logos y estado de error al bloquear el primer MP4.
- Sin errores JavaScript en el recorrido probado.

`qa/check.mjs`: diez grupos aprobados, incluidos enlaces/anclas de 14 HTML, módulos, navegación y 63 evaluaciones de cuestionarios.

`qa/pages-check.mjs`: 76 rutas aprobadas y solicitudes Range de los tres MP4 desde servidor local con subdirectorio /change-lab/. No se publicó un despliegue remoto.

Resultados actuales: `qa/shorts-results.json`. No se probó Safari/iOS, hardware móvil físico, gestos táctiles reales, lector de pantalla ni escucha humana del audio. No existen archivos WebVTT reales; no se inventaron subtítulos y se indica que siguen pendientes. No se hizo git push.
