# Biblioteca de Recursos

## Archivos

- `recursos.html`: cinco bloques: portada editorial, controles del explorador, fichas, fuentes y cierre.
- `recursos/pandillaje-prevencion.html`, `recursos/moda-rapida.html`, `recursos/convivencia-digital.html`: lecturas completas. Funcionan sin JavaScript, incluyen regreso al archivo y enlace a la frutinovela correspondiente.
- `js/resources-data.js`: fichas reutilizables y array vacío `specificSources` para referencias concretas futuras.
- `js/resources.js`: render de tarjetas, búsqueda/categoría y estados accesibles.
- `js/resource-sources.js`: selección y render de referencias revisadas.
- `js/resource-reader.js`: muestra las referencias específicas vinculadas a la ficha de lectura.
- `css/resources.css`: estilos exclusivos de la biblioteca y las lecturas.

Se reutilizan variables, tipografías, header, footer, botones, tarjetas, espaciados y estilos de controles del proyecto. La biblioteca carga `css/topics.css` para los controles existentes y usa `filterTopics` de `js/topics-filter.js` sin modificarlo. No se agregan dependencias. Las otras páginas permanecen intactas.

## Añadir una ficha

1. Agrega un objeto a `resources` en `js/resources-data.js`: `id` y `slug` únicos, `category`, `title`, `introduction`, `keywords`, `route`, `episodeRoute` y `sections` (cada sección con `title` y `text`). Las categorías actuales son `Pandillaje`, `Fast fashion` y `Ciberacoso`.
2. Crea el HTML real indicado en `route`, copiando una lectura de `recursos/`. Actualiza metadatos, número, categoría, h1, introducción y apartados a partir del mismo objeto. Mantén el header/footer y rutas relativas `../` para enlaces al nivel raíz.
3. Actualiza `data-resource-sources` en la sección de fuentes de la ficha con su slug. Esto selecciona solo las referencias que le corresponden.
4. Añade su tarjeta de respaldo dentro de `#resource-grid` en `recursos.html`; conserva un ID único para su h3 y un enlace a la página existente. Actualiza el recuento estático y el rango editorial si cambia el archivo.
5. Si aparece una categoría nueva, agrega su botón en `recursos.html`. `data-resource-category` debe coincidir con el campo `category` del objeto.

La biblioteca interactiva usa los datos del módulo. Los HTML estáticos son el respaldo para lectura y navegación sin JavaScript: deben actualizarse junto con el objeto. No existe un build obligatorio ni un generador que haya que ejecutar para publicar. No añadas una ruta al archivo antes de crear su página.

Los controles están ocultos hasta que se inicializa el módulo correctamente; las tres fichas HTML permanecen disponibles si JavaScript falla o está desactivado. La búsqueda filtra título y palabras clave, ignora mayúsculas/tildes y exige coincidencia para cada término. Se combina con una categoría mediante AND. El recuento usa `role="status"`; los botones, `aria-pressed`. No se envían ni guardan consultas ni datos personales.

## Añadir fuentes concretas

Los enlaces a UNICEF, UNESCO y PNUMA son portales institucionales generales. Se comprobó que sus páginas principales responden; no se han usado como respaldo de ninguna afirmación concreta. UNESCO y PNUMA redirigen actualmente a sus portadas en inglés. Se conservaron las URLs solicitadas.

`specificSources` está vacío: no se inventaron referencias ni fechas. Para cada fuente que se haya leído y verificado, añade un objeto con:

- `title`: título exacto del documento o página.
- `institution`: institución responsable identificada en el recurso.
- `date`: fecha de publicación verificada en formato `AAAA-MM-DD`, o `null` si no está indicada; se muestra «Fecha no indicada» sin inventar una fecha.
- `url`: URL HTTPS concreta, revisada y accesible.
- `resourceSlugs`: array con los slugs de las fichas que apoya.
- `verified`: `true` únicamente después de la revisión editorial.

El módulo solo muestra entradas completas y marcadas como revisadas, y filtra por `resourceSlugs` en las páginas de lectura. Los registros incompletos o sin revisión permanecen ocultos y no sustituyen el aviso de pendientes. Estas comprobaciones validan estructura/formato, no comprueban automáticamente la veracidad del documento ni la vigencia de la URL.

No basta con que una institución sea reconocida: verifica que el documento concreto respalde la afirmación, su contexto y el público al que se dirige. Si una fuente apoya solo un apartado, añade la cita cerca de ese texto en el HTML correspondiente. Actualiza también el respaldo HTML de las referencias cuando deban estar disponibles sin JavaScript. Mantén separados los portales generales y las citas concretas.

## Revisión educativa pendiente

Los textos de las fichas son los borradores suministrados. Antes de publicarlos como información definitiva, requieren revisión pedagógica y referencias específicas:

- Pandillaje: relación de presión de grupo, violencia en el entorno y redes de apoyo con el riesgo; papel protector de educación, acompañamiento, participación y espacios seguros. Evitar explicaciones deterministas o estigmatizantes.
- Moda rápida: frecuencia de consumo/ciclos de tendencias, uso de recursos, residuos textiles, condiciones laborales y alcance de las alternativas propuestas.
- Ciberacoso: definición y reconocimiento del hostigamiento repetido, privacidad y prevención, y pautas de apoyo/reporte adecuadas a adolescentes y a las plataformas utilizadas.

Las preguntas de reflexión son invitaciones abiertas; no son mediciones ni resultados comprobados. No se añadieron estadísticas, PDFs, autores ficticios ni bibliografía sin verificar.

## Comprobación

Pruebas sobre código real: 14 casos de búsqueda/categoría y 9 de selección estructural de fuentes; controlador con DOM simulado para enlaces, búsqueda/filtro, `aria-pressed`, vacío y reset con foco; render de referencias por ficha. También se comprueban rutas, imports, IDs y que las páginas preexistentes permanezcan intactas. Estas pruebas no sustituyen la revisión visual en navegador.

Abre `recursos.html` mediante **Open with Live Server** en VS Code. Prueba `ropa` + Fast fashion (una ficha), `ropa` + Pandillaje (vacío), `PREVENCION` + Pandillaje, y restablece para ver las tres. Entra a cada lectura, vuelve al archivo y abre su episodio. Usa Tab/Shift+Tab, Enter y Escape para el menú móvil.

Revisión visual pendiente a 375, 768, 1024 y 1440px: foco, zoom al 200 %, ausencia de scroll horizontal, fuentes, consola y movimiento reducido. Desactiva JavaScript y confirma que siguen disponibles fichas, lecturas y portales. Las referencias futuras requieren además comprobar sus URLs y su respaldo HTML.
