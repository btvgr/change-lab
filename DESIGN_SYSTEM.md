# Change Lab — Sistema de diseño

Identidad oficial implementada a partir de la dirección artística proporcionada. Editorial juvenil, contemporánea y experimental: grandes titulares, espacio negativo, recortes gráficos y fotografía documental. No se ha inspeccionado ni reproducido el Google Sites.

## Paleta y roles

| Token primitivo | Valor | Uso |
| --- | --- | --- |
| `--blue` | `#5DA7C9` | Acento, CTA, página activa y recortes |
| `--fog` | `#D3D5DD` | Superficies secundarias y base fotográfica |
| `--charcoal` | `#343331` | Footer, superficies oscuras y texto secundario |
| `--off-white` | `#F7F7F5` | Fondo principal y texto sobre carbón |
| `--ink` | `#111111` | Texto principal, bordes de controles e iconos |

Los tokens semánticos en `css/styles.css` separan fondos (`--color-bg`), superficies (`--color-surface`, `--color-surface-muted`, `--color-surface-accent`, `--color-surface-dark`), texto (`--color-text`, `--color-muted`, `--color-on-accent`, `--color-on-dark`), bordes y foco. Los bordes de controles utilizan tinta; el borde sutil se reserva para separadores decorativos.

Contrastes calculados mediante luminancia relativa sRGB:

| Texto / fondo | Relación |
| --- | --- |
| Tinta / azul | 7,05:1 |
| Carbón / blanco roto | 11,77:1 |
| Blanco roto / carbón | 11,77:1 |
| Tinta / gris niebla | 12,89:1 |
| Blanco roto / azul | 2,50:1 — no usar para texto |

El punto azul de la marca es decorativo y se oculta a tecnologías de asistencia. No sirve como indicador único de estado. La página activa combina fondo azul y borde tinta, además de `aria-current`.

## Tipografía

- **Outfit 800/900**: títulos y marca. El h1 de Inicio usa Black; títulos internos usan ExtraBold.
- **Inter 400/600**: lectura, navegación y botones.
- **Space Mono 400**: etiquetas editoriales y notas pequeñas.

Se cargan gratuitamente mediante Google Fonts en los seis HTML con `display=swap`, preconexión y alternativas locales: Segoe UI/Arial para lectura, Arial Black para títulos, Consolas/monospace para etiquetas. Sin conexión se conserva el contenido y se usan esas alternativas. La disponibilidad de las fuentes remotas no se ha confirmado en navegador.

Escalas fluidas con `clamp()`: `--text-body`, `--text-label`, `--text-title`, slogan, títulos secundarios y marca. Texto de lectura con interlineado 1,65 y ancho aproximado de 52 caracteres; titulares compactos y con ajuste de palabras. No aplicar mayúsculas a textos largos.

## Espaciado y forma

`--space-1` a `--space-7` organizan la escala desde 0,5rem hasta 7rem, con espacios mayores fluidos. `--page-gutter` define márgenes laterales; `--content-width`, el ancho máximo. Radios pequeños de 2–4px; bordes finos. La sombra editorial de tarjeta es discreta, sin desenfoque. Evitar gradientes y efectos de vidrio. En Inicio se permite una aparición breve por desplazamiento, sin ocultar contenido y respetando movimiento reducido.

## Componentes reutilizables

| Clases | Uso |
| --- | --- |
| `.container` | Contenedor centrado con márgenes fluidos |
| `.section-shell` | Espaciado vertical para futuras secciones |
| `.surface--blue`, `.surface--fog`, `.surface--paper`, `.surface--dark` | Alternancia futura de fondos con texto compatible |
| `.section-heading` | Encabezado editorial secundario |
| `.eyebrow`, `.label`, `.label--boxed` | Etiquetas pequeñas, simples o enmarcadas |
| `.button`, `.button--primary`, `.button--secondary` | Botón tinta, CTA azul y variante clara |
| `.text-link` | Enlace de texto subrayado |
| `.card`, `.card__title`, `.card__description` | Tarjeta editorial reutilizable |
| `.icon` | SVG de 24 unidades, trazo 1,75, sin relleno |

Usar enlaces para navegar y botones para acciones. Una tarjeta completa enlazada debe ser un solo enlace, sin botones ni otros enlaces anidados. Inicio utiliza las tarjetas y variantes de superficie; las páginas internas conservan su contenido provisional. Las variantes oscuras ajustan el foco a blanco roto.

## Aplicación actual

Header blanco roto con logotipo tipográfico `change lab.` y punto azul; navegación con estado activo. Hero de Inicio asimétrico en escritorio, con texto y área gráfica reservada. En móvil, el texto precede al área visual. Las páginas internas conservan encabezados y descripciones. Footer carbón con texto blanco roto y el crédito original.

## Fotografía y collage pendientes

No hay imágenes en `assets/images/`; no se han descargado ni generado fotografías. `.hero__visual` es un espacio gráfico con gris niebla y un recorte azul creado en CSS. Su aviso identifica que la fotografía está pendiente. Se oculta al lector de pantalla porque no aporta información del contenido.

Cuando se proporcionen imágenes autorizadas:

1. Guardar los archivos en `assets/images/` con rutas relativas.
2. Incorporar la fotografía documental con `.documentary-image`, que aplica blanco y negro y `object-fit: cover`. Definir dimensiones y revisar el encuadre en móvil.
3. Usar `.collage-cutout` para una figura ya recortada y tratada en azul. Esta clase posiciona el recurso, no realiza el recorte ni lo recolorea.
4. Sustituir el aviso y retirar `aria-hidden` si la imagen aporta información; en ese caso, escribir un `alt` adecuado. Si es puramente decorativa, usar `alt=""`.
5. Revisar composición y contraste de nuevo. Mantener los textos de lectura fuera de la fotografía.

## Responsive y accesibilidad

Base mobile-first. A 40rem, footer horizontal; a 64rem, navegación horizontal y hero en dos columnas. El breakpoint de 64rem coincide con `navigation.js`, que no se ha modificado. Las columnas usan `minmax(0, …)` para permitir encogimiento y el texto largo admite saltos. La navegación sin JavaScript permanece visible.

Se mantienen enlace de salto, landmarks, un h1 por página, foco visible, menú con `aria-expanded`/`aria-controls`, Escape y navegación por teclado. Controles con altura mínima de 44px y CTA de 48px. No hay animaciones automáticas; las transiciones breves de color y sombra se desactivan con `prefers-reduced-motion`. Se incluye tratamiento de página activa para colores forzados.

## Verificación y límites

Se comprobaron estáticamente las rutas locales, las seis páginas, un h1 y un estado activo por documento, sin imágenes rotas, formularios ni enlaces de relleno. Se calcularon las relaciones de contraste anteriores.

La política de seguridad del navegador bloqueó la vista existente `file://`, por lo que no se ha realizado una verificación visual o interactiva de esta revisión. Las reglas responsive se revisaron en el código; falta confirmar su representación real y la descarga de fuentes.

Para comprobar con Live Server: abrir `index.html` mediante **Open with Live Server**, revisar a 320, 390, 768, 1024 y 1440px; confirmar ausencia de desplazamiento horizontal; recorrer las seis páginas; usar Tab/Shift+Tab, Enter y Escape; cambiar ancho con menú abierto; probar zoom 200 % y 400 %, JavaScript desactivado y movimiento reducido; revisar consola y carga de fuentes en la pestaña Network. Confirmar que las páginas largas, especialmente Recursos y Sobre nosotros, mantienen títulos legibles.

## Ampliación: Inicio completo

Esta etapa sustituye el hero provisional de Inicio por cinco bloques editoriales. Las notas de la primera revisión anteriores describen la base; para el Inicio actual prevalece esta ampliación.

- Hero de aproximadamente una pantalla en escritorio con titular protagonista, multitud vectorial abstracta y figura azul. La zona de texto es opaca y está separada del área fotográfica, por lo que una futura imagen no compromete su contraste.
- Presentación azul con megáfono en collage y CTA tinta.
- Problemáticas en carbón: tres tarjetas numeradas, fondos gráficos diferentes y alineación escalonada en escritorio. Todas enlazan a una página real existente.
- Reflexión gris niebla con recortes de ojos vectoriales y signo de pregunta azul.
- Cierre blanco roto con tipografía de gran escala y subrayado azul; footer original conservado.

Los estilos de esta ampliación están aislados en `css/home.css`, enlazado solo desde Inicio. Usa las variables, superficies, contenedores, botones, etiquetas e iconos existentes. `js/home.js` añade la aparición de una sola vez por elemento mediante IntersectionObserver y la carga opcional de imágenes. El contenido nunca se oculta antes de aparecer. Al cambiar la preferencia de movimiento, se desconecta la animación. No hay carruseles ni desplazamiento automático.

Responsive: una columna móvil; a 40rem, composiciones de dos columnas y tarjetas en dos columnas; a 64rem, hero en dos columnas y tres tarjetas. El hero crece con el texto en lugar de recortarlo con una altura fija. Contenedores y columnas permiten encogimiento. La navegación global y su breakpoint no se alteraron.

Ver `README.md`, apartado **Inicio editorial**, para los recursos pendientes, incorporación con `data-local-image`, carga diferida, fallbacks y comprobaciones manuales. La portada admite una composición final con figura azul; el filtro monocromo se aplica solo a las tarjetas. El megáfono y los ojos ya funcionan como ilustraciones decorativas locales, sin descargas.

Verificación de esta etapa: rutas y anclas, cinco bloques y jerarquía de encabezados comprobados estáticamente. Los hashes de las cinco páginas internas se conservaron. La previsualización no pudo iniciarse porque el servidor HttpListener no está soportado por este entorno; falta revisión visual y de consola a 375/768/1024/1440px en Live Server.
