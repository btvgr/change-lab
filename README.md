# Change Lab

Plataforma educativa audiovisual gratuita creada por **The Nebula Society** en el taller de computación de Fe y Alegría N.º 2. Presenta frutinovelas verticales de ficción, información educativa y recursos sobre problemáticas sociales.

## Tecnologías

HTML5 semántico, CSS3 con variables, JavaScript ES6 modular y video HTML5. Sin frameworks, backend, registro de usuarios ni compilación. Las fuentes Outfit, Inter y Space Mono se cargan desde Google Fonts con alternativas locales. Las únicas otras salidas web visibles son los portales institucionales indicados en Recursos.

## Estado del contenido

- Inicio y Sobre nosotros con identidad editorial, imágenes oficiales y cuatro integrantes.
- Catálogo de Problemáticas con búsqueda y filtros.
- Episodios de Pandillaje, Fast Fashion y Ciberacoso con cuestionarios.
- Fast Fashion tiene MP4 real y portada propia. Pandillaje y Ciberacoso muestran su estado de producción.
- Recursos con tres fichas y enlaces institucionales generales.
- Reflexiona con tres situaciones de decisiones y retroalimentación.
- Contacto copia propuestas al portapapeles; no envía ni almacena datos en un servidor.
- Subtítulos WebVTT, transcripción de Fast Fashion y referencias educativas específicas: pendientes.
- Autorizaciones de publicación de nombres y recursos: pendientes de confirmación documental. No se asigna una licencia abierta a recursos ajenos.

## Estructura

```text
index.html
sobre-nosotros.html
problematicas.html
recursos.html
reflexiona.html
contacto.html
temas/          Pandillaje, Fast Fashion y Ciberacoso
recursos/       Tres fichas completas
css/            Tokens, componentes y estilos por página
js/             Navegación, datos e interacciones modulares
assets/
  images/       Fotografías e identidad, originales y copias web
  episodios/    Portadas y personajes oficiales
  videos/       MP4 web y máster local excluido
  posters/      Recursos de poster conservados
  subtitles/    Espacio para WebVTT
  icons/
templates/      Plantilla reutilizable de episodio
qa/             Comprobaciones sin paquetes y servidor de prueba
.nojekyll
.gitignore
PUBLICACION.md  Inventario y resultado de preparación
```

## Previsualización local

En VS Code, abre la carpeta completa, instala Live Server si lo necesitas y usa **Open with Live Server** sobre index.html. No abras los HTML directamente desde el sistema de archivos: los módulos requieren un servidor.

Para reproducir específicamente una URL de proyecto de GitHub Pages, con Node.js 22 o posterior:

```powershell
node qa/pages-server.mjs
```

Abre **http://127.0.0.1:8087/change-lab/**. El servidor no sirve el máster excluido. Se cierra con Ctrl+C.

## Comprobaciones

```powershell
node qa/check.mjs
node qa/pages-check.mjs
```

La primera prueba cubre rutas, módulos, filtros, cuestionarios, menú, Reflexiona, reproducción y buzón mediante datos y simulaciones DOM. La segunda comprueba rutas y mayúsculas/minúsculas bajo /change-lab/, recursos dinámicos, archivos excluidos, límites de tamaño y peticiones parciales del MP4. No sustituyen una prueba manual completa de accesibilidad ni una revisión del sitio publicado.

## Multimedia y Git

- Publicar: **assets/videos/fast-fashion-web.mp4**, 16 692 802 bytes (**15,92 MiB**).
- Conservar solo localmente: **assets/videos/fast-fashion.mp4.mp4**, 194 607 490 bytes (**185,59 MiB**). Está excluido específicamente en .gitignore.
- Se conservan originales gráficos y copias web necesarias. Las capturas qa/*.png son locales y no se incluyen.
- GitHub advierte por archivos mayores de 50 MiB y bloquea los mayores de 100 MiB en Git normal. El MP4 web actual no supera esos umbrales. [Límites oficiales](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).
- Si un futuro MP4 web supera 50 MiB, revisa y reduce su tamaño antes del commit; si supera 100 MiB, no lo incluyas en Git normal. No uses un puntero LFS como si fuera un MP4 reproducible.
- Si se retira el MP4 del despliegue, vacía media.src en js/episodes-data.js y retira src y controls del video de temas/fast-fashion.html, ocúltalo y muestra el estado honesto del placeholder. Poster y datos de subtítulos pueden mantenerse si existen. Luego incorpora una copia reducida en una ruta relativa y reactiva el reproductor cuando el archivo esté disponible. No se requiere hacer esto en el estado actual.

## Publicar con GitHub Pages, después de la revisión

**Esta preparación no crea commits, no hace push y no activa Pages.** En el entorno revisado no se encontró Git disponible ni un repositorio .git.

1. Instala [Git para Windows](https://git-scm.com/downloads/win) desde su sitio oficial si no lo tienes; reinicia la terminal y comprueba git --version.
2. Revisa PUBLICACION.md y confirma permisos para los nombres, fotografías, logos y frutinovela completa, incluidas voces y música.
3. Abre una terminal en la raíz del proyecto. Inicializa el repositorio y revisa los candidatos:

```powershell
git init -b main
git add .
git status --short
git check-ignore -v -- assets/videos/fast-fashion.mp4.mp4
git ls-files --cached -- assets/videos
git diff --cached --stat
git diff --cached --check
```

En la lista de videos preparados debe aparecer únicamente fast-fashion-web.mp4. Si el máster aparece en el índice o historial, detén el envío: .gitignore no retira archivos ya seguidos por Git. No uses git add -f para el máster.

4. Solo cuando hayas aprobado los archivos:

```powershell
git commit -m "Prepara Change Lab para GitHub Pages"
```

5. Crea en GitHub un repositorio **público** vacío llamado change-lab, sin README inicial. GitHub Pages está disponible para repositorios públicos con GitHub Free. [Documentación oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
6. Sustituye USUARIO por la cuenta u organización real; estos comandos son instrucciones para ejecutar después de la aprobación:

```powershell
git remote add origin https://github.com/USUARIO/change-lab.git
git push -u origin main
```

Autentícate por el flujo normal de GitHub; no incluyas contraseñas ni tokens en archivos o URLs.

7. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch → main → / (root) → Save**.
8. Revisa el despliegue y abre la dirección que muestre GitHub Pages. Para ese nombre de repositorio tendrá la forma https://USUARIO.github.io/change-lab/.
9. Verifica todas las páginas, menú móvil, filtros, quizzes, Reflexiona, copiado y reproducción. Revisa DevTools por errores 404. Clipboard requiere HTTPS en producción; GitHub Pages ofrece HTTPS.

index.html y .nojekyll deben quedar en la raíz, sin una carpeta contenedora adicional. .nojekyll omite el procesamiento Jekyll y permite servir directamente el sitio estático. [Creación de un sitio Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

Conserva las rutas relativas y las mayúsculas/minúsculas exactas. Los nombres con espacios o tildes en originales no necesitan renombrarse; las referencias actuales se verifican. La prueba local no verifica DNS, permisos de GitHub ni límites reales de ancho de banda. [Límites de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Antes de hacer público el contenido

Los cuatro nombres son datos personales: verificar el consentimiento de Grace Torrejón, Luana Tapia, Victoria Torres e Ilter Macedo, y las autorizaciones adicionales que correspondan. No hay retratos personales de integrantes: se muestran el isotipo y nombres.

Verificar licencia o permiso de las fotografías de multitud, comunidad, teléfono y residuos textiles; del isotipo/logotipo TNS y logo escolar; de los personajes y portadas; y de todo el material del video (incluidos música, voces y herramientas utilizadas para crear los recursos). Que un archivo exista localmente no acredita su autorización de publicación. No hay documentos de permisos en el proyecto inspeccionado.

Revisar también las afirmaciones educativas con fuentes concretas. Los enlaces generales de UNICEF, UNESCO y PNUMA no validan automáticamente cada afirmación.
