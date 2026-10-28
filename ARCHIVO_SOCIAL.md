# Archivo social — Problemáticas

Página: `problematicas.html`. Estilos aislados en `css/topics.css`. Navegación, header, footer, fuentes, variables y componentes globales se conservan. No se modifican Inicio ni Sobre nosotros.

## Estructura

- `js/topics-data.js`: datos reutilizables; única fuente del archivo interactivo.
- `js/topics-filter.js`: funciones puras de normalización y filtrado.
- `js/topics.js`: render, eventos, estados activos, recuento y estado vacío.
- `problematicas.html`: portada, explorador, fichas estáticas de respaldo y reflexión final.

No se agregan frameworks ni paquetes. Las fichas estáticas funcionan sin JavaScript; los controles se muestran solo cuando el módulo inicializa correctamente. El render sustituye esas fichas con los datos del módulo, sin duplicarlas. La búsqueda permanece en memoria y no recopila ni envía datos.

## Añadir una problemática

1. Añade un objeto a `topics` en `js/topics-data.js`, con un `id` y `slug` únicos.
2. Completa `title`, `category`, `label`, `description` y `keywords`. Las categorías iniciales son `Sociedad`, `Medio ambiente` y `Entorno digital`; `Todos` muestra todo el archivo.
3. Deja `image: { src: '', alt: '' }` mientras no exista una imagen autorizada. Se mostrará la composición gráfica genérica. Para añadir una imagen, guarda el archivo local y escribe su ruta relativa, por ejemplo `assets/images/nuevo-tema.webp`. Usa `alt` informativo si aporta contenido y `alt: ''` si es decorativa. Las fotografías se muestran en blanco y negro, con carga diferida y espacio reservado; si fallan, vuelve a quedar visible el gráfico.
4. Deja `route: null` mientras el detalle no esté creado y revisado. Guarda su ruta prevista en `plannedRoute`; este campo no genera enlaces. Cuando exista una página real, asigna su ruta relativa a `route`. No se comprueba su existencia en el navegador: revisa el archivo y el enlace antes de publicarlo.
5. Actualiza también las fichas de respaldo dentro de `#archive-grid` en `problematicas.html` para mantener disponible el contenido sin JavaScript. Cada título necesita un ID único. Actualiza el recuento estático inicial y la numeración decorativa de portada si cambia el rango de archivo.

Ejemplo de objeto:

```js
{
  id: '004',
  slug: 'nuevo-tema',
  title: 'Título aprobado',
  category: 'Sociedad',
  label: 'Etiqueta editorial',
  description: 'Descripción revisada del tema.',
  keywords: ['palabra clave', 'otra palabra'],
  image: { src: '', alt: '' },
  route: null,
  plannedRoute: 'temas/nuevo-tema.html'
}
```

Para añadir una categoría nueva, incorpora su botón en el fieldset de HTML. El valor de `data-category` debe coincidir exactamente con el campo `category` de los datos. El controlador lo detecta sin cambios adicionales.

## Interacción y accesibilidad

La búsqueda filtra por título y palabras clave; no distingue mayúsculas ni tildes. Cada término de la consulta debe aparecer en el índice del tema. Se combina con la categoría mediante una condición AND. Las categorías usan botones nativos con `aria-pressed`, estado visual de fondo/borde y marcador geométrico. Tab recorre los controles, Enter/Espacio activa los botones. El foco permanece en el control usado; al restablecer se devuelve a la búsqueda.

El recuento se anuncia con `role="status"`, sin mover el foco. Al no haber coincidencias se muestra el mensaje solicitado y sugerencias para ampliar la búsqueda. La espera de 120ms evita actualizaciones excesivas al escribir. No hay carruseles, animaciones automáticas ni reproducción simulada. Los movimientos hover se desactivan con `prefers-reduced-motion`.

Los estados de preparación son texto, no botones deshabilitados ni enlaces aparentes. Los gráficos actuales son recortes CSS abstractos: no representan víctimas ni personas vinculadas a delitos. Las imágenes futuras deben contar con permiso y contexto adecuado.

## Diseño responsive

Una columna desde móvil; dos a partir de 40rem (640px), y tres desde 80rem (1280px). Así se mantienen tarjetas amplias a 768 y 1024px. Portada y reflexión usan dos columnas desde 64rem. Los filtros se ajustan en varias líneas, la búsqueda puede encogerse y los textos no tienen alturas fijas.

## Verificación realizada

- 13 pruebas sobre el módulo real de filtrado: categorías, búsqueda combinada, tildes, mayúsculas, espacios, términos múltiples, palabras compartidas y estado vacío.
- Controlador real ejecutado con un DOM simulado: render inicial, búsqueda, categoría combinada, `aria-pressed`, recuento, vacío, restablecimiento y ausencia de enlaces a detalles no publicados.
- Revisión estática de rutas, imports, IDs, referencias accesibles y estructura. Comparación SHA256 de archivos preexistentes ajenos a Problemáticas para conservar Inicio, Sobre nosotros y estilos compartidos.

Estas pruebas no sustituyen una revisión visual en navegador. Para abrir, haz clic derecho en `problematicas.html` en VS Code y elige **Open with Live Server**. No abras con `file://`, porque los módulos ES6 requieren servidor.

Prueba a 375, 768, 1024 y 1440px y con zoom al 200 %. Revisa scroll horizontal, teclado, menú móvil, fuentes, consola, JavaScript desactivado y movimiento reducido. Casos manuales: `prevencion` + Sociedad muestra Pandillaje; `prevencion` + Entorno digital muestra Ciberacoso; `ropa` + Sociedad muestra el estado vacío; restablecer devuelve los tres temas. La verificación visual y de consola queda pendiente en este entorno.

## Contenido pendiente para páginas individuales

Las tres páginas `temas/pandillaje.html`, `temas/fast-fashion.html` y `temas/ciberacoso.html` están creadas y enlazadas desde el catálogo, con contexto educativo y cuestionario. Sus frutinovelas permanecen en producción. Se necesitan textos revisados y fuentes educativas verificadas, material audiovisual real con permisos, subtítulos y transcripciones, recursos asociados y fotografías autorizadas o gráficos adecuados. No hay videos publicados ni reproductores ficticios.

Consulta [FRUTINOVELAS.md](FRUTINOVELAS.md) para la plantilla de episodios, el video vertical y el cuestionario.


