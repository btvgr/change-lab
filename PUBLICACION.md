# Preparación de Change Lab para GitHub Pages

Estado: archivos preparados para revisión. **No se inicializó Git, no se añadieron archivos al índice, no se crearon commits, no se hizo push y no se activó GitHub Pages.**

## Git y raíz del sitio

- index.html existe en la raíz, junto a css/, js/ y assets/.
- No se encontró .git en esta carpeta ni en sus directorios ascendentes comprobados.
- Git no está disponible en PATH ni se encontró git.exe en las ubicaciones habituales examinadas. No se pudo ejecutar git status, git check-ignore ni revisar un índice/historial real.
- El inventario siguiente representa candidatos según los archivos locales y las reglas de .gitignore; no es una lista de archivos ya preparados en un índice Git.
- .nojekyll existe en la raíz y tiene 0 bytes. Publicar desde main, / (root), sin compilación ni frameworks.

## Archivos modificados o creados en esta tarea

- .gitignore: máster, capturas locales, secretos/configuración privada y temporales excluidos; no se excluyen recursos de ejecución necesarios.
- .nojekyll: nuevo y vacío.
- README.md: descripción y arquitectura reales, previsualización, pruebas y pasos de Git/Pages.
- qa/pages-server.mjs: servidor local de comprobación bajo /change-lab/, con soporte Range de MP4 y exclusión del máster.
- qa/pages-check.mjs: rutas relativas, capitalización, recursos dinámicos, tamaños y respuestas HTTP.
- PUBLICACION.md: inventario y resultados de esta preparación.

No se modificó ningún HTML, CSS, JavaScript de la aplicación, imagen o MP4.

## Video y presupuesto multimedia

| Archivo | Bytes | MiB | Decisión |
| --- | ---: | ---: | --- |
| assets/videos/fast-fashion-web.mp4 | 16692802 | 15,92 | Incluir, mantiene la integración existente |
| assets/videos/fast-fashion.mp4.mp4 | 194607490 | 185,59 | Excluir de Git y de la previsualización preparada; conservar localmente |

El MP4 web no supera 50 MiB ni 100 MiB; no requiere excluirlo ni modificar el estado del reproductor. Los archivos multimedia previstos para el repositorio suman aproximadamente **32.11 MiB**, incluyendo originales gráficos y copias optimizadas.

GitHub advierte por archivos mayores de 50 MiB y bloquea los mayores de 100 MiB en Git normal. [Límites oficiales de archivos](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github). Si el video web cambia en el futuro, ejecutar de nuevo qa/pages-check.mjs antes de incluirlo.

No se habilitó Git LFS ni un alojamiento de video externo. No se recodificó ni cambió el archivo MP4. El README describe cómo dejar un estado vacío honesto si algún día se retira del despliegue.

## Inventario completo de candidatos al repositorio (93)

La revisión debe incluir los originales gráficos: al usar un repositorio público, también serán descargables aunque una página utilice una copia WebP.

```text
.gitignore
.nojekyll
ARCHIVO_SOCIAL.md
assets/episodios/fast-fashion/don-limon-web.webp
assets/episodios/fast-fashion/don-limón.png
assets/episodios/fast-fashion/fresa-web.webp
assets/episodios/fast-fashion/fresa.png
assets/episodios/fast-fashion/mora-web.webp
assets/episodios/fast-fashion/mora.png
assets/episodios/fast-fashion/platano-web.webp
assets/episodios/fast-fashion/plátano.png
assets/episodios/fast-fashion/portada-fast-fashion-web.webp
assets/episodios/fast-fashion/portada-fast-fashion.png
assets/episodios/fast-fashion/poster-fast-fashion-card.webp
assets/episodios/fast-fashion/poster-fast-fashion-web.webp
assets/episodios/fast-fashion/poster-fast-fashion.png
assets/icons/.gitkeep
assets/images/.gitkeep
assets/images/hero/multitud-web.webp
assets/images/hero/multitud.jpg
assets/images/identidad/isotipo-tns-web-f716e431.webp
assets/images/identidad/isotipo-tns.png
assets/images/identidad/logo fya.png
assets/images/identidad/logo-fya-web.webp
assets/images/identidad/logotipo-tns-web.webp
assets/images/identidad/logotipo-tns.png
assets/images/problematicas/ciberacoso-web.webp
assets/images/problematicas/ciberacoso.jpg
assets/images/problematicas/fast-fashion.jpg
assets/images/problematicas/pandillaje-web.webp
assets/images/problematicas/pandillaje.jpg
assets/posters/.gitkeep
assets/posters/fast-fashion.webp
assets/subtitles/.gitkeep
assets/videos/.gitkeep
assets/videos/fast-fashion-web.mp4
contacto.html
CONTACTO.md
css/about.css
css/components.css
css/contact.css
css/episode.css
css/fast-fashion.css
css/home.css
css/reflection.css
css/resources.css
css/responsive.css
css/styles.css
css/topics.css
DESIGN_SYSTEM.md
FRUTINOVELAS.md
index.html
js/contact-channels.js
js/contact-data.js
js/contact.js
js/decision-lab.js
js/episode-media.js
js/episode.js
js/episodes-data.js
js/home.js
js/idea-mailbox.js
js/main.js
js/navigation.js
js/quiz.js
js/reflection-data.js
js/reflection.js
js/resource-reader.js
js/resource-sources.js
js/resources-data.js
js/resources.js
js/topics-data.js
js/topics-filter.js
js/topics.js
problematicas.html
PUBLICACION.md
QA_REPORT.md
qa/check.mjs
qa/pages-check.mjs
qa/pages-server.mjs
README.md
RECURSOS_VISUALES.md
recursos.html
RECURSOS.md
recursos/convivencia-digital.html
recursos/moda-rapida.html
recursos/pandillaje-prevencion.html
reflexiona.html
REFLEXIONA.md
sobre-nosotros.html
temas/ciberacoso.html
temas/fast-fashion.html
temas/pandillaje.html
templates/tema.html
```

## Archivos existentes excluidos (4)

- assets/videos/fast-fashion.mp4.mp4 — 194607490 bytes (185.59 MiB)
- qa/episodio-002-preview.png — 96904 bytes (0.09 MiB)
- qa/inicio-fotografias.png — 113147 bytes (0.11 MiB)
- qa/isotipo-actualizado.png — 64576 bytes (0.06 MiB)

No hay otros archivos existentes excluidos por las reglas actuales. .gitignore también previene añadir .env, claves privadas, configuración local, node_modules y temporales si se incorporan posteriormente. No se hallaron esos archivos en la inspección actual.

Las capturas del directorio qa permanecen disponibles localmente. No son imágenes usadas por el sitio ni se enlazan desde sus páginas públicas.

## Tamaños de todos los archivos multimedia actuales

| Archivo | Bytes | MiB | Repositorio |
| --- | ---: | ---: | --- |
| assets/episodios/fast-fashion/don-limon-web.webp | 63740 | 0.061 | Incluir |
| assets/episodios/fast-fashion/don-limón.png | 2136094 | 2.037 | Incluir |
| assets/episodios/fast-fashion/fresa-web.webp | 51758 | 0.049 | Incluir |
| assets/episodios/fast-fashion/fresa.png | 1772290 | 1.690 | Incluir |
| assets/episodios/fast-fashion/mora-web.webp | 45886 | 0.044 | Incluir |
| assets/episodios/fast-fashion/mora.png | 1789413 | 1.707 | Incluir |
| assets/episodios/fast-fashion/platano-web.webp | 35042 | 0.033 | Incluir |
| assets/episodios/fast-fashion/plátano.png | 1797930 | 1.715 | Incluir |
| assets/episodios/fast-fashion/portada-fast-fashion-web.webp | 235020 | 0.224 | Incluir |
| assets/episodios/fast-fashion/portada-fast-fashion.png | 2617121 | 2.496 | Incluir |
| assets/episodios/fast-fashion/poster-fast-fashion-card.webp | 60374 | 0.058 | Incluir |
| assets/episodios/fast-fashion/poster-fast-fashion-web.webp | 236062 | 0.225 | Incluir |
| assets/episodios/fast-fashion/poster-fast-fashion.png | 2760668 | 2.633 | Incluir |
| assets/images/hero/multitud-web.webp | 121784 | 0.116 | Incluir |
| assets/images/hero/multitud.jpg | 300407 | 0.286 | Incluir |
| assets/images/identidad/isotipo-tns-web-f716e431.webp | 32136 | 0.031 | Incluir |
| assets/images/identidad/isotipo-tns.png | 92236 | 0.088 | Incluir |
| assets/images/identidad/logo fya.png | 1630394 | 1.555 | Incluir |
| assets/images/identidad/logo-fya-web.webp | 184932 | 0.176 | Incluir |
| assets/images/identidad/logotipo-tns-web.webp | 17860 | 0.017 | Incluir |
| assets/images/identidad/logotipo-tns.png | 67695 | 0.065 | Incluir |
| assets/images/problematicas/ciberacoso-web.webp | 37406 | 0.036 | Incluir |
| assets/images/problematicas/ciberacoso.jpg | 41485 | 0.040 | Incluir |
| assets/images/problematicas/fast-fashion.jpg | 108122 | 0.103 | Incluir |
| assets/images/problematicas/pandillaje-web.webp | 187700 | 0.179 | Incluir |
| assets/images/problematicas/pandillaje.jpg | 457695 | 0.436 | Incluir |
| assets/posters/fast-fashion.webp | 95480 | 0.091 | Incluir |
| assets/videos/fast-fashion-web.mp4 | 16692802 | 15.919 | Incluir |
| assets/videos/fast-fashion.mp4.mp4 | 194607490 | 185.592 | Excluido |
| qa/episodio-002-preview.png | 96904 | 0.092 | Excluido |
| qa/inicio-fotografias.png | 113147 | 0.108 | Excluido |
| qa/isotipo-actualizado.png | 64576 | 0.062 | Excluido |

## Rutas y pruebas reales

- node qa/check.mjs: nueve grupos aprobados; 13 HTML (incluye plantilla) y 21 módulos JavaScript. Incluye 63 evaluaciones de quizzes y simulaciones de menú, decisiones, video y Clipboard.
- node qa/pages-check.mjs: **58 rutas locales** correctas y capitalización exacta, incluidas referencias HTML, CSS, imports JS, datos de fichas y rutas de imágenes/videos.
- Previsualización y solicitudes HTTP bajo **/change-lab/**: recursos preparados responden 200; MP4 responde 206 a Range con MIME video/mp4. Una ruta errónea desde la raíz del dominio devuelve 404; el máster excluido también devuelve 404.
- Navegador Chrome: se recorrieron las 12 páginas públicas bajo /change-lab/, con un h1, main y enlaces locales dentro del prefijo.
- Cuestionarios de Pandillaje, Fast Fashion y Ciberacoso: tres respuestas correctas, retroalimentación y reinicio comprobados en navegador.
- Catálogo: búsqueda moda + Medio ambiente devuelve un tema. Recursos: ropa + Fast fashion devuelve una ficha.
- Reflexiona: las tres situaciones, una respuesta de cada una, retroalimentación, reintento y cambio de situación comprobados por teclado.
- Contacto: contador 51 / 500, copiado real de una propuesta de prueba al portapapeles y borrado a 0 / 500, sin envío. Se restauró el portapapeles previo. El error de copia también está cubierto mediante simulación en la suite.
- Video de Fast Fashion: MP4 y poster se resuelven dentro de /change-lab/. Se comprobó reproducción manual, avance hasta aproximadamente 24,7 segundos y pausa, sin errores. No se revisó la película completa en esta tarea.
- Menú móvil: apertura con Enter y cierre con Escape, aria-expanded true/false.
- Consola sin errores ni advertencias en las comprobaciones efectuadas.
- No se realizó un despliegue real: quedan pendientes la configuración de GitHub, permisos del repositorio, URL pública, caché/CDN y una comprobación final tras publicar.

## Seguridad, privacidad y autorizaciones

La inspección de archivos de texto y nombres no detectó contraseñas, claves privadas, tokens típicos ni archivos de credenciales. No es una garantía exhaustiva ni sustituye la revisión final del índice por una persona. No se hallaron rutas locales absolutas de disco usadas por la aplicación; las URLs de localhost en la documentación y los scripts QA son instrucciones de prueba, no dependencias del sitio publicado.

Los cuatro nombres de integrantes son datos personales intencionales del proyecto. No existen retratos personales del equipo: se muestran isotipo y nombres. **No se puede certificar el consentimiento de publicación desde el código** y no se encontraron documentos de autorización.

Pendiente confirmar:
- Consentimiento de Grace Torrejón, Luana Tapia, Victoria Torres e Ilter Macedo para mostrar sus nombres, y autorizaciones adicionales que correspondan.
- Permiso/licencia de fotografías: assets/images/hero/multitud.jpg y las tres de assets/images/problematicas/, incluidos derechos de las personas que aparezcan.
- Permiso de uso público de isotipo/logotipo TNS y logo de Fe y Alegría N.º 2.
- Titularidad o licencias de personajes, portadas, escenas, voces, música y otros elementos de la frutinovela, incluidos términos de las herramientas de creación cuando correspondan.
- Referencias específicas de las afirmaciones educativas. Los portales institucionales generales no son citas que las validen automáticamente.

No se añadió una licencia que prometa derechos sobre archivos de terceros. Los recursos actuales son técnicamente publicables, pero **su autorización de publicación sigue pendiente de confirmación**.

## Recursos y enlaces que requieren atención

- No se detectaron enlaces locales rotos en el inventario preparado.
- Google Fonts requiere conexión al servicio externo; si falla se usan fuentes alternativas.
- UNICEF, UNESCO y PNUMA son enlaces externos y su disponibilidad no depende de GitHub Pages.
- No hay MP4 publicados para Pandillaje y Ciberacoso: sus placeholders son intencionales.
- Faltan WebVTT y transcripción de Fast Fashion; no hay rutas falsas a archivos inexistentes.
- Los canales de contacto siguen sin configurar; no se inventaron correos ni redes.
- Las capturas qa/*.png y el máster no deben enlazarse como recursos públicos: se excluyen deliberadamente.
- Espacios y tildes en originales se conservan; usar exactamente las rutas y capitalización actuales.
- GitHub Pages no proporciona backend; Contacto continúa siendo un borrador que se copia localmente.

## Próximo paso, a cargo del usuario después de revisar

Seguir los comandos completos de README.md: instalar/verificar Git, git init -b main, git add ., revisar git status y git ls-files --cached, confirmar que el máster no está en el índice, crear el commit, añadir el remoto real y hacer push. No ejecutar ese último paso hasta aprobar contenido y permisos.

Después: repositorio público change-lab → Settings → Pages → Deploy from a branch → main → / (root). [Configuración oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Para repetir pruebas sin publicar:
```powershell
node qa/check.mjs
node qa/pages-check.mjs
node qa/pages-server.mjs
```
Abrir la dirección local mostrada por el servidor; cerrarlo con Ctrl+C.
