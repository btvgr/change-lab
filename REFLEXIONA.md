# Reflexiona — Laboratorio de decisiones

## Alcance y archivos

- `reflexiona.html`: cinco bloques, header/footer existentes y respaldo de lectura sin JavaScript.
- `css/reflection.css`: composición editorial y estilos aislados del laboratorio.
- `js/reflection-data.js`: tres situaciones ficticias con contexto, opciones, feedback, reflexión y ruta al episodio.
- `js/decision-lab.js`: componente reutilizable `initDecisionLab(root, experiences)`.
- `js/reflection.js`: entrada que conecta los datos con el componente.

No se reutiliza el sistema de corrección de los quizzes: aquí no hay claves correctas, puntos, resultados morales ni etiquetas personales. No se importan ni modifican sus módulos. Las otras páginas y los archivos compartidos permanecen intactos.

## Comportamiento

1. Las tarjetas son botones nativos cuando carga JavaScript. Cada una muestra número, tema y título. `aria-pressed` y el texto visible «Seleccionada» indican la experiencia activa, además del fondo y el borde.
2. Al elegir una situación, se muestran contexto y tres decisiones. El foco pasa al encabezado del panel, sin provocar un salto de foco por sí mismo; después se desplaza al panel como resultado de la acción del usuario.
3. Elegir una opción muestra su retroalimentación exacta y la pregunta final. Los controles permanecen disponibles para comparar otras opciones, sin clasificar a la persona ni limitar intentos.
4. «Explorar otra respuesta» limpia la opción y el feedback, conserva la situación y enfoca la primera decisión y desplaza el grupo de opciones a la vista respetando movimiento reducido.
5. «Elegir otra situación» limpia la experiencia activa y la elección, devuelve el foco a la tarjeta desde la que se comenzó y muestra de nuevo el estado inicial.
6. Elegir otra tarjeta directamente también descarta la respuesta anterior. No se conserva un historial entre situaciones.

Hay dos regiones de anuncio acotadas: una breve para apertura/reinicio/cambio de situación y otra visible para el feedback y la reflexión. No se anuncia todo el laboratorio en cada actualización. La selección usa botones con `aria-pressed`, sin implementar un patrón de pestañas que requiera un comportamiento de flechas personalizado. Tab/Shift+Tab, Enter y Espacio son suficientes para recorrer y activar los controles.

El desplazamiento solo ocurre tras una acción explícita de selección/cambio. Usa movimiento suave normalmente e inmediato cuando `prefers-reduced-motion: reduce` está activo. Las transiciones CSS heredan la regla global de reducción de movimiento. No hay reproducción, scroll automático al cargar ni animaciones continuas.

La zona de feedback y los indicadores reservan espacio para reducir saltos. No tienen altura máxima ni recortan textos al ampliar la fuente. Las composiciones pasan de una columna móvil a dos tarjetas a 40rem, y a tres tarjetas con panel de dos columnas a 64rem. Las columnas usan `minmax(0, …)` y tamaños fluidos.

## Respaldo sin JavaScript

Las tarjetas iniciales son enlaces a las situaciones desplegables de la misma página. Cada `<details>` permite leer contexto, opciones con su feedback y reflexión mediante controles nativos del navegador. Los botones del laboratorio interactivo permanecen ocultos. Cuando se inicializa el componente, sustituye los enlaces por botones y retira únicamente el respaldo de lectura. Header, footer, navegación y cierre siguen disponibles.

## Datos y ampliación

Cada entrada de `experiences` en `js/reflection-data.js` utiliza:

- `id`: número editorial único como string (`001`).
- `slug`: identificador único para el respaldo y los detalles de estilo.
- `label`, `topic`, `title`: etiqueta, temática y título de la situación.
- `context`: situación ficticia breve.
- `options`: tres objetos `{ text, feedback }`, sin propiedad de respuesta correcta.
- `reflection`: pregunta final abierta.
- `route`: ruta relativa desde la raíz a una página individual existente.

Para añadir una experiencia, agrega sus datos y actualiza los enlaces/tarjetas estáticas y el `<details>` de respaldo en `reflexiona.html`. Conserva IDs únicos, rutas reales y la numeración editorial. El controlador detecta las nuevas entradas sin cambiar su lógica.

Para usar el componente en otro lugar, conserva el contrato de elementos `data-*` del panel y llama a `initDecisionLab(contenedor, datos)`. La API devuelve `selectExperience(id)`, `chooseResponse(index)`, `retryResponse()`, `chooseAnotherSituation()` y `getState()`. Estos últimos datos son solo el estado efímero necesario para la interfaz, no una evaluación.

## Privacidad y lenguaje

No hay campos para respuestas abiertas, formulario de envío, registro, publicidad ni servicios añadidos. Las elecciones existen únicamente en la memoria de esta página, se limpian al reiniciar/cambiar y no se guardan en cookies, localStorage ni servidores. No se recopilan datos personales.

Las situaciones y sus implicaciones son ficticias y educativas, no evaluaciones psicológicas. Los textos fueron los proporcionados para esta etapa. Cualquier ampliación debe evitar estigmas, diagnósticos, puntuaciones personales y promesas de resultados. La pregunta abierta final es contenido para pensar; no solicita escribir ni enviar información.

## Verificación

Se ejecutó el controlador real con un DOM simulado para las tres situaciones y sus nueve decisiones: feedback y pregunta exactos, reintento, limpieza, cambio directo/de situación, foco, selección visible, `aria-pressed`, rutas, entradas inválidas y preferencia de movimiento reducido. Se revisan estáticamente enlaces, imports, IDs y estructura HTML, y se comparan los archivos preexistentes mediante SHA256.

La revisión visual, de scroll real y con lector de pantalla queda pendiente. Abre `reflexiona.html` con **Open with Live Server** en VS Code, desde la carpeta completa del proyecto. Prueba a 375, 768, 1024 y 1440px; verifica ausencia de scroll horizontal, foco, zoom al 200 %, teclado y movimiento reducido. Comprueba las nueve opciones, ambos botones de reinicio/cambio y los enlaces a las frutinovelas. Desactiva JavaScript para revisar los desplegables nativos. No abras con `file://`, porque los módulos ES6 requieren servidor.

