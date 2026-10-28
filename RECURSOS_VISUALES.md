# Recursos visuales: estado actual

## Corrección de fotografías de Inicio e isotipo

Se modificaron:
- index.html: tres fotografías reales en las tarjetas destacadas; numeración, títulos, etiquetas, descripciones y enlaces conservados.
- css/home.css: encuadres uniformes 4:3, fotografías completas con contain, tratamiento monocromático y numeración separada de la imagen.
- js/topics-data.js: se retiran las fotografías genéricas de Pandillaje y Ciberacoso del catálogo; reaparecen los collages editoriales existentes. Se mantiene el póster oficial de Fast Fashion.
- temas/fast-fashion.html: se retira exclusivamente la figura fotográfica de residuos textiles, trasladada al Inicio. Contenido educativo, personajes, cuestionario, video y portada del reproductor intactos.
- sobre-nosotros.html: referencia a la copia renovada del isotipo. Resto de la página idéntico.
- assets/images/identidad/isotipo-tns-web-f716e431.webp: copia renovada, 800 × 800, derivada del original actual. Sustituye a isotipo-tns-web.webp; no se conserva la copia obsoleta.
- RECURSOS_VISUALES.md: este registro actualizado.
- qa/inicio-fotografias.png y qa/isotipo-actualizado.png: capturas de comprobación.

## Imágenes reales y usos únicos

| Original | Formato y dimensiones | Uso en el sitio |
| --- | --- | --- |
| assets/images/problematicas/pandillaje.jpg | JPEG, 2000 × 1326 | Exclusivamente tarjeta 001 de Inicio, mediante pandillaje-web.webp, 1000 × 663 |
| assets/images/problematicas/fast-fashion.jpg | JPEG, 700 × 600 | Exclusivamente tarjeta 002 de Inicio, usando el original ligero |
| assets/images/problematicas/ciberacoso.jpg | JPEG, 900 × 600 | Exclusivamente tarjeta 003 de Inicio, mediante ciberacoso-web.webp, 900 × 600 |
| assets/images/identidad/isotipo-tns.png | PNG actualizado, 1468 × 1468 | Sobre nosotros, mediante isotipo-tns-web-f716e431.webp |
| assets/images/hero/multitud.jpg | JPEG, 2048 × 1444 | Hero de Inicio, mediante multitud-web.webp; sin cambios |
| assets/episodios/fast-fashion/poster-fast-fashion.png | PNG, 1024 × 1536 | Catálogo, mediante poster-fast-fashion-web.webp; sin cambios |
| assets/episodios/fast-fashion/portada-fast-fashion.png | PNG, 941 × 1672 | Poster exclusivo del reproductor, mediante portada-fast-fashion-web.webp; sin cambios |
| assets/images/identidad/logo fya.png | PNG, 2000 × 2000 | Franja institucional blanca del footer, mediante logo-fya-web.webp; sin cambios |

Las fotografías fueron inspeccionadas visualmente. La foto comunitaria no identifica a sus protagonistas como miembros de pandillas. No se inventaron rutas. Todos los originales permanecen intactos y no faltó ninguna imagen solicitada. Las fotografías de personajes y logotipo TNS se conservan en assets aunque no se sustituyó el isotipo por el logotipo.

## Isotipo y caché

El original actualizado es assets/images/identidad/isotipo-tns.png. Se regeneró la copia WebP desde ese archivo, sin alterar el diseño, conservando proporción cuadrada y transparencia. La conversión se realizó con FFmpeg temporal fuera del proyecto; no hay dependencias nuevas en el sitio.

Ruta servida: assets/images/identidad/isotipo-tns-web-f716e431.webp.

La huella f716e431 procede del SHA-256 del archivo derivado (f716e431106ad0f0f6cecf91ffe19a2a3397da30edd778c0293b9daac245f3a0). Al cambiar el nombre se evita reutilizar la imagen antigua en caché sin parámetros especiales ni versiones derivadas duplicadas. Para futuras actualizaciones, regenerar desde el PNG, calcular la huella, sustituir la referencia HTML y retirar únicamente la copia derivada obsoleta.

Se mantienen Grace Torrejón, Luana Tapia, Victoria Torres e Ilter Macedo, sus cuatro tarjetas, el tamaño moderado del isotipo y la franja institucional #FFFFFF.

## Pruebas reales de esta corrección

- qa/check.mjs: nueve grupos aprobados; 13 HTML y 21 módulos JavaScript; incluye rutas, filtros y 63 evaluaciones de cuestionarios.
- Chrome: las tres fotografías de Inicio cargan, se corresponden con sus temas y no presentan estado pendiente.
- Medidas DOM de Inicio y Sobre nosotros a 375, 768, 1024 y 1440 px: sin desbordamiento horizontal. Imágenes con contain, marcos uniformes y numeración sin superponerse a las fotografías. Isotipo cuadrado 800 × 800 cargado desde el nombre con huella.
- Capturas reales: tres fotografías en escritorio, primera tarjeta en móvil y nuevo isotipo con la presentación y las cuatro tarjetas del equipo. La captura móvil no contiene las tres tarjetas completas a la vez; no se afirma una revisión visual exhaustiva de cada sección a cada ancho.
- Catálogo en navegador: solo permanece como imagen la portada editorial de Fast Fashion; los otros dos temas usan los collages existentes.
- Consola sin errores ni advertencias durante la comprobación.
- No se modificaron MP4, datos de preguntas, lógica de búsqueda/filtros, Reflexiona, Contacto ni navegación global.
