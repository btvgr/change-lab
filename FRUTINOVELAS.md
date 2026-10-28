# Frutinovelas de Change Lab

## Archivos y alcance

- `temas/pandillaje.html`: primera página individual, con texto estático legible, estado de producción, contexto educativo, cuestionario y temas próximos.
- `templates/tema.html`: plantilla de autoría para copiar a `temas/<slug>.html`. No está enlazada y tiene `noindex`; sus textos son instrucciones, no una página lista para publicar.
- `css/episode.css`: composición reutilizable, reproductor 9:16 y estilos de cuestionario. Solo lo cargan los episodios y la plantilla.
- `js/episodes-data.js`: título, estado provisional, archivos multimedia y preguntas por slug.
- `js/episode.js`: conecta la página identificada por `data-episode` con sus datos.
- `js/episode-media.js`: reproductor nativo compartido y estados de carga/error.
- `js/quiz.js`: evaluación y componente accesible de preguntas, reintento y reinicio.
- `assets/videos/`, `assets/posters/`, `assets/subtitles/`: recursos locales. No se añadieron videos, posters ni subtítulos ficticios.

Pandillaje, Fast fashion y Ciberacoso tienen páginas individuales enlazadas desde los datos y las fichas HTML de respaldo del catálogo. Cada página enlaza a los otros dos episodios. Las tres frutinovelas permanecen en producción; Inicio y Sobre nosotros se conservan.

## Incorporar la frutinovela grabada

1. Exporta el video vertical en MP4 9:16, idealmente H.264/AAC para una compatibilidad amplia. Por ejemplo, `assets/videos/pandillaje.mp4`. Optimiza el peso para móviles sin perjudicar la comprensión de diálogos.
2. Añade un poster propio/autorizado, por ejemplo `assets/posters/pandillaje.webp`, en proporción vertical.
3. Prepara subtítulos en español, sincronizados en WebVTT UTF-8: `assets/subtitles/pandillaje.es.vtt`. El archivo empieza con `WEBVTT`, una línea vacía y los segmentos con tiempos. No inventes diálogo antes de grabarlo. Incluye las indicaciones sonoras relevantes.
4. Crea una transcripción real y accesible, por ejemplo `assets/subtitles/pandillaje-transcripcion.html`.
5. Completa `episodes.pandillaje.media` en `js/episodes-data.js`:

```js
media: {
  src: 'assets/videos/pandillaje.mp4',
  poster: 'assets/posters/pandillaje.webp',
  captions: 'assets/subtitles/pandillaje.es.vtt',
  transcript: 'assets/subtitles/pandillaje-transcripcion.html'
}
```

Las rutas se escriben desde la raíz del proyecto, sin `/` inicial ni `../`. `episode.js` calcula esa raíz a partir de su propia URL, conservando el subdirectorio de GitHub Pages. No escribas URLs privadas, rutas de disco ni nombres de archivo que todavía no existen. Los campos opcionales permanecen vacíos hasta tener archivos reales.

Actualmente `src` está vacío: el HTML contiene un `<video>` oculto sin `src` ni controles y se muestra **Frutinovela en producción**. No hay botón de reproducción simulado. Con un MP4 configurado, se cargan sus metadatos y se revelan los controles nativos; no se llama a `play()`, no hay `autoplay`, bucle ni scroll automático. El video usa `object-fit: contain`, preservando el encuadre completo. Si falla, se oculta el reproductor y aparece un mensaje honesto. El poster y el track se asignan solo si están configurados.

El video tiene `playsinline`, controles del navegador y subtítulos configurados con `kind="captions"`, idioma español y `default`. Revisa manualmente la sincronización y que el navegador ofrezca activarlos. Añade audiodescripción o una alternativa textual descriptiva cuando haya información visual relevante que no se comprenda mediante el audio. El texto de contexto no sustituye la transcripción de la historia.

## Cambiar el título provisional

En `episodes-data.js`, `title` es el nombre de la frutinovela; `heroTitle` es un titular de página opcional. El h1 usa `heroTitle` cuando está definido y, en otro caso, `title`, preservando Pandillaje. Los elementos `data-story-title` muestran el título de la historia. El navegador y el nombre accesible del video usan `title`. `provisionalTitle` controla la nota de título provisional. Mantén también los textos estáticos del HTML y las tarjetas relacionadas sincronizados para la navegación sin JavaScript.

No se han inventado reparto, duración, escenas ni trama completa. La información narrativa es el título provisional y el subtítulo entregados. El formato se presenta como ficción dramatizada, no como un documental ya publicado.

## Nuevo tema o episodio

1. Copia `templates/tema.html` a `temas/<nuevo-slug>.html`, sin sobrescribir los tres episodios existentes.
2. Sustituye `data-episode="nuevo-tema"` por un slug único. En `episodes-data.js`, añade una entrada con la misma clave y los campos `title`, `heroTitle` (opcional), `provisionalTitle`, `media` y `questions`.
3. Completa los textos estáticos, metadatos, numeración, categoría, contexto y preguntas de respaldo. Retira `noindex` cuando esté revisada y lista para enlazar. No publiques los textos de instrucción de la plantilla.
4. Cada pregunta lleva `id` único, `prompt`, un array `options`, índice `correct` basado en cero y una `explanation` educativa. Para Pandillaje los índices correctos son 1, 0 y 2 (B, A, C).
5. Completa `route` en `js/topics-data.js` solo cuando exista la página. Actualiza su enlace en las fichas HTML de respaldo del catálogo.
6. En los bloques «Sigue explorando» de episodios relacionados, sustituye el estado Próximamente por enlaces reales a los archivos nuevos. Mantén las rutas relativas al directorio `temas/`.
7. Revisa el contexto sin estigmatizar a personas, los permisos y el contenido de cada recurso antes de incorporarlo.

La plantilla mantiene el mismo nivel de directorio que las páginas en `temas/`, por lo que `../css/`, `../js/` y `../problematicas.html` siguen siendo correctos al copiarla.

## Cuestionario y privacidad

Tres preguntas visibles en una composición vertical, agrupadas con `fieldset` y `legend`. Las opciones son radios nativos con etiquetas completas. Tab y las flechas permiten navegar; Enter o Espacio activan los botones. «Comprobar respuesta» muestra feedback educativo sin recargar. Si no se eligió una opción, explica qué falta y enfoca la primera. Se puede modificar la selección y comprobar de nuevo sin límite. «Volver a intentarlo» limpia respuestas y feedback, anuncia el reinicio y devuelve el foco a la primera opción.

No hay nota global, diagnóstico ni medición de conciencia social. No se solicitan datos personales, no se usan cookies/localStorage y no se envían respuestas a servidores. Sin JavaScript se conservan el contexto, los enlaces y las preguntas para reflexión, sin controles que aparenten funcionar.

## Comprobaciones

- 21 pruebas de evaluación sobre el módulo real: tres alternativas por pregunta y selecciones inválidas, con claves B/A/C.
- Controlador real del quiz con DOM simulado: selección vacía, alternativa incorrecta, cambio, reintento correcto y reinicio con foco y anuncio.
- Controlador multimedia con DOM y constructor URL simulados: fuente ausente, campos configurados, metadatos, subtítulos, transcripción y error. No es una prueba de decodificación de un video real.
- Comprobaciones estáticas de rutas, imports, IDs y atributos accesibles; cambios limitados al nuevo episodio y a la activación del enlace de Pandillaje en el catálogo.

Abre el proyecto completo en VS Code y usa **Open with Live Server** sobre `problematicas.html`. Entra por «Explorar Pandillaje», vuelve al catálogo y prueba los filtros. Abre también `temas/pandillaje.html` directamente desde el servidor. Evita `file://` para cargar módulos ES6.

Revisión manual pendiente: a 375, 768, 1024 y 1440px, comprobar que no haya scroll horizontal, foco/teclado, menú móvil, zoom al 200 %, movimiento reducido y consola. La revisión visual y de reproducción real no se ha realizado en este entorno. Al añadir el MP4, confirmar audio manual, pausa, avance, orientación vertical completa, poster, subtítulos y enlace a transcripción. Prueba también una ruta MP4 errónea para comprobar el mensaje de fallo.

## Episodios 002 y 003

- `temas/fast-fashion.html`: titular «¿Sabes qué hay detrás de lo que vistes?», frutinovela provisional «Detrás de la etiqueta», cuatro bloques educativos, gráfica de prenda y etiqueta con patrón textil SVG. Quiz A/B/A.
- `temas/ciberacoso.html`: titular «Lo que sucede en internet también importa.», frutinovela provisional «Detrás de la pantalla», cuatro bloques educativos y gráfica de ventanas, chats abstractos y píxeles. Quiz B/C/A.

Ambos reutilizan `episode.js`, `quiz.js`, `episode-media.js` y `episode.css`. No se crearon controladores ni hojas de estilo separadas por tema. Los textos estáticos permiten lectura y navegación sin JavaScript. Las variantes gráficas son SVG/CSS originales, decorativos y sin fotografías de personas o mensajes de acoso explícitos. Las cuatro fichas de contexto usan una columna móvil y dos desde 40rem; la distribución de tres fichas de Pandillaje se conserva.

Para los archivos reales de cada episodio, completa `episodes['fast-fashion'].media` o `episodes.ciberacoso.media`. Usa las mismas carpetas y rutas desde la raíz indicadas arriba, por ejemplo `assets/videos/fast-fashion.mp4`, `assets/posters/fast-fashion.webp` y `assets/subtitles/fast-fashion.es.vtt`. No pongas estas rutas hasta tener los archivos. El título provisional no implica que ya exista video.

Verificación de esta ampliación: 63 casos de evaluación (los tres cuestionarios), pruebas de los controladores reales con DOM simulado para feedback/reintento/reset/foco, separación de titular y nombre de historia, enlaces del catálogo y filtros combinados. Los datos de Pandillaje se compararon con la versión anterior. Se comprobaron rutas e imports estáticos y la conservación de Inicio y Sobre nosotros mediante SHA256. No se realizó revisión visual en navegador ni reproducción real, ya que no existen videos. Revisa con Live Server a 375/768/1024/1440px, teclado, zoom y movimiento reducido.

### Revisión editorial pendiente

Los textos educativos proporcionados se implementaron como borrador; no se han investigado ni contrastado fuentes en esta etapa. Antes de presentarlos como información educativa definitiva, revisar precisión, lenguaje y adecuación para adolescentes, y añadir referencias primarias verificables. Para Fast fashion: producción/consumo, impacto ambiental y derechos laborales; para Ciberacoso: definición, prevención, privacidad y pautas de actuación apropiadas al contexto. Revisar también las explicaciones de las respuestas del quiz. Las historias requieren guion, permisos y producción propios; no se han inventado personajes ni escenas.
