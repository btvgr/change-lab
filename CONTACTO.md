# Contacto — Buzón de ideas

## Archivos y alcance

- `contacto.html`: cinco bloques editoriales, composición SVG original, redacción local, canales futuros, participación y enlaces existentes.
- `css/contact.css`: estilos exclusivos; reutiliza variables, fuentes, botones, header/footer y espaciados del proyecto.
- `js/contact.js`: entrada modular.
- `js/contact-data.js`: configuración inicialmente vacía de correo y redes oficiales.
- `js/contact-channels.js`: validación de formato y render de enlaces.
- `js/idea-mailbox.js`: límite, contador, formato, copia y borrado.

No hay backend, formularios de envío, registros, analíticas ni servicios añadidos. El único cambio sobre archivos preexistentes es `contacto.html`; las demás páginas conservan sus archivos y comportamiento.

## Buzón y límite

El selector de categoría es opcional. El borrador admite hasta 500 unidades de texto según el criterio nativo de `maxlength` del navegador (UTF-16; algunos emojis ocupan dos unidades). El contador usa el mismo criterio y el módulo evita dejar un carácter Unicode cortado al limitar texto. Cuenta espacios y saltos de línea. El texto de la propuesta y la categoría se añaden al copiar, junto con el encabezado «Change Lab — Propuesta»; el límite de 500 corresponde al campo de borrador, no a esos metadatos adicionales.

Las etiquetas están asociadas a los controles. El contador visual no se anuncia en cada pulsación; se anuncian umbrales de 50 caracteres restantes y límite alcanzado. Los mensajes de copia/borrado usan otra región `role="status"`, `aria-live="polite"` y `aria-atomic="true"`.

«Copiar mi propuesta» se habilita cuando hay contenido distinto de espacios. «Borrar» reinicia el borrador y la categoría, actualiza el contador y devuelve el foco al campo de texto. Borrar el borrador no modifica una copia que ya exista en el portapapeles. Las selecciones y el texto solo existen en el estado de esta página; no se usa localStorage ni se envían a servidores.

Se pide evitar datos personales. No se solicitan nombre, correo, teléfono, edad ni otros identificadores del visitante. El futuro correo institucional es un enlace de contacto del proyecto, no un campo para recopilar el correo del visitante.

## Copia y estados de error

La acción parte exclusivamente de un botón activado por el visitante. Primero usa `navigator.clipboard.writeText` en un contexto seguro compatible (HTTPS, o localhost cuando lo permita el navegador). Si falla o no está disponible, intenta copiar mediante un textarea temporal y `document.execCommand('copy')`, solo si existe y el navegador lo permite. El buffer temporal se retira y se restaura el foco. No se lee el contenido previo del portapapeles.

Solo tras una copia confirmada se muestra el mensaje:

> Propuesta copiada. Puedes compartirla mediante un canal oficial del proyecto cuando esté disponible.

Si ambas vías fallan, se informa sin afirmar éxito y se selecciona el borrador para copiarlo manualmente desde el menú del dispositivo o con Ctrl+C/⌘C. El borrador no se pierde. No se afirma que el equipo haya recibido, registrado o leído la propuesta.

Durante una copia pendiente se impide iniciar una copia duplicada. Si el visitante borra el borrador antes de que termine, el resultado tardío no sobrescribe el mensaje de borrado. Si lo modifica, el éxito advierte que se copió una versión anterior y permite volver a copiar la nueva. No se bloquea la edición mientras el navegador resuelve la operación.

Sin JavaScript, se puede redactar dentro del límite nativo y copiar manualmente. Los botones permanecen deshabilitados y aparece una explicación; no se muestra un contador dinámico incorrecto ni se aparenta envío.

## Activar canales auténticos

Edita `contactChannels` en `js/contact-data.js`:

```js
export const contactChannels = {
  email: '', // Sustituir por el correo institucional auténtico confirmado.
  socials: [] // Añadir objetos { label, url } solo con cuentas oficiales verificadas.
};
```

No introduzcas el prefijo `mailto:` en `email`, solo la dirección. El componente muestra la dirección y genera su enlace `mailto:` cuando su formato es válido. Cada red requiere una etiqueta legible y una URL HTTPS completa de la cuenta real. No se muestran iconos ni enlaces mientras no haya datos.

La validación comprueba formato; no verifica que un buzón o una cuenta pertenezca al equipo. Confirma esa titularidad antes de configurar los canales. Si no queda ningún enlace válido, se mantiene «Nuestros canales oficiales estarán disponibles próximamente».

Si el correo también debe estar disponible sin JavaScript, añade su enlace real a `[data-channels-list]` en el HTML y sincroniza el estado `hidden` de esa lista y de `[data-channels-pending]`. Mantén el texto y la configuración de datos concordantes.

## Verificación de esta etapa

Pruebas sobre el código real con APIs/DOM simulados:

- Límite vacío, 499/500 caracteres, exceso y corte seguro de Unicode; categoría opcional y formato de copia.
- Clipboard con éxito y rechazo; alternativa con éxito, rechazo y excepción; falta de API y contexto inseguro; limpieza del textarea temporal y devolución de foco.
- Contador, umbrales, copia exacta, borrado, texto en blanco, recuperación manual sin perder el texto y cambios/reinicio durante una copia pendiente.
- Canales vacíos, correo/red configurados con datos técnicos de prueba y rechazo de configuración inválida. Los datos de prueba no se guardaron en los archivos de la web.

Se revisan estáticamente HTML, IDs, referencias accesibles, rutas y módulos. Se comparan mediante SHA256 los archivos preexistentes para preservar el resto del sitio. Estas pruebas no verifican el portapapeles nativo ni la representación real del navegador.

## Comprobar con Live Server

Abre `contacto.html` con **Open with Live Server** desde la carpeta completa en VS Code. Revisa a 375/768/1024/1440px, zoom al 200 %, Tab/Shift+Tab, Enter/Espacio, menú móvil, foco y movimiento reducido. Escribe, pega 500 caracteres, cambia la categoría, copia y pega el resultado en una aplicación local elegida por ti; comprueba el mensaje y luego Borrar.

Prueba una denegación de portapapeles cuando el navegador lo permita y confirma que los errores no aparenten éxito. No es necesario activar permisos adicionales para usar la alternativa de copia manual. Comprueba los enlaces a Sobre nosotros y Problemáticas. La revisión visual, con lector de pantalla y del portapapeles real queda pendiente en este entorno.
