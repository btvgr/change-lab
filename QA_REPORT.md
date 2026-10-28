# QA_REPORT — Change Lab

## Resultado y alcance

Auditoría del proyecto real, conservando identidad, contenido y arquitectura. Se corrigieron **dos problemas acotados**: un desbordamiento móvil y la jerarquía de encabezados del respaldo de Reflexiona sin JavaScript. No se reescribieron páginas, no se sustituyeron collages y no se añadieron dependencias al sitio.

Se revisaron **12 páginas públicas**, una plantilla de autoría, **10 CSS y 21 módulos JavaScript**. Los directorios `assets/images`, `assets/videos`, `assets/posters`, `assets/subtitles` y `assets/icons` solo contienen marcadores `.gitkeep`: no hay fotografías, MP4, posters ni WebVTT reales.

Páginas públicas:

- `index.html`, `sobre-nosotros.html`, `problematicas.html`, `recursos.html`, `reflexiona.html`, `contacto.html`.
- `temas/pandillaje.html`, `temas/fast-fashion.html`, `temas/ciberacoso.html`.
- `recursos/pandillaje-prevencion.html`, `recursos/moda-rapida.html`, `recursos/convivencia-digital.html`.

`templates/tema.html` es una plantilla de autoría con `noindex`, no una cuarta frutinovela publicada.

## 1. Problemas encontrados y correcciones

| ID | Hallazgo y evidencia | Corrección / estado |
| --- | --- | --- |
| QA-01 | En Chrome a 375 px, el cierre de Sobre nosotros desbordaba: documento de 364 px frente a 360 px útiles; el h2 tenía contenido de 344 px dentro de 320 px. Captura y medición DOM confirmaron que «transformaciones» sobresalía. | Corregido en `css/about.css`: mínimo móvil de ese título de 2,75 a 2,5rem y ajuste de palabras. Repetida la medición real: documento 360/360 y título 320/320, sin overflow. La escala de escritorio y los collages se conservan. |
| QA-02 | En el respaldo sin JavaScript de Reflexiona, las opciones de lectura usaban h4 bajo el h2 del laboratorio; el h3 del panel interactivo permanece oculto en ese modo. Detectado mediante inspección del HTML y sus estados `hidden`. | Corregido: h3 en esas nueve opciones y regla tipográfica específica que conserva su aspecto anterior. No cambia los encabezados ni los textos del laboratorio interactivo. La prueba visual sin JavaScript quedó interrumpida, por lo que no se declara validación visual de este respaldo. |
| QA-03 | El navegador solicitó `/favicon.ico` y recibió 404. No es un enlace del sitio ni un recurso necesario para sus funciones. | Pendiente menor y opcional: incorporar un favicon oficial cuando se defina. No se inventó un recurso de marca ni se modificaron trece cabeceras por este detalle. |

No se encontraron enlaces internos rotos, rutas de detalle inexistentes en las tarjetas activas, descargas PDF ficticias ni botones de envío a un backend inexistente. Los estados de producción y de canales pendientes son deliberados, no errores de navegación.

## 2. Archivos modificados y añadidos

Modificados:

- `css/about.css`: ajuste del título móvil identificado.
- `reflexiona.html`: h4 → h3 únicamente en la lectura de respaldo.
- `css/reflection.css`: conserva la tipografía anterior de esos encabezados.

Añadidos:

- `qa/check.mjs`: suite local con módulos nativos de Node, sin paquetes.
- `QA_REPORT.md`: este informe.

La comparación SHA256 contra el estado previo confirmó que **todos los demás archivos preexistentes permanecen idénticos**. No se cambiaron datos de episodios, preguntas, filtros, reproductor, buzón, header, footer, fuentes ni paleta.

## 3. Pruebas reales en Chrome

Se levantó una previsualización HTTP temporal sobre el proyecto. No se publicó ni desplegó el sitio. Tras un problema inicial de conexión, se recuperó la sesión y se ejecutaron las siguientes pruebas reales:

| Área | Prueba y resultado |
| --- | --- |
| Responsive | 12 páginas × 4 viewports = **48 mediciones DOM** a 375, 768, 1024 y 1440 px, altura 900 px. Se compararon `scrollWidth` y ancho útil, desbordamientos de encabezados, un h1 y tamaño de botones principales. Se detectó QA-01; los otros 47 casos no mostraron overflow horizontal. Se repitió el caso corregido de Sobre nosotros a 375 px y pasó. |
| Inspección visual | Capturas completas revisadas de Inicio a 375 px, Sobre nosotros a 375 px, Contacto a 1440 px, Ciberacoso a 768 px y Recursos a 375 px. No se afirmó una revisión visual individual de los 48 casos: las 48 comprobaciones son mediciones DOM, apoyadas por estas capturas representativas. |
| Menú móvil | Enter abrió el menú; Escape desde un enlace lo cerró y devolvió foco al botón. Al cambiar a 1024 px, la navegación quedó visible y el botón oculto. |
| Catálogo | `prevencion` + Entorno digital mostró Ciberacoso; `ropa` + Sociedad produjo estado vacío; restablecer recuperó las tres tarjetas, categoría Todos y foco en búsqueda. Se entró a Pandillaje desde su enlace real. |
| Quizzes | En las tres páginas se probó envío vacío, una opción incorrecta y la opción correcta de cada pregunta, y reinicio completo. **Nueve preguntas**, con feedback `retry/correct`; las claves B/A/C, A/B/A y B/C/A funcionaron. Los resets dejaron cero radios seleccionados, borraron feedback y enfocaron la primera pregunta. |
| Video | En las tres páginas: video oculto, sin `src`, sin controles y sin autoplay. Marco medido con relación **0,5625 = 9/16**. No se reprodujo ningún video porque no existe un MP4. |
| Recursos | `ropa` + Fast fashion mostró una ficha; cambiar a Pandillaje produjo vacío; reset devolvió tres fichas y foco al buscador. Se abrieron las tres lecturas y se volvió al archivo con sus enlaces reales. |
| Reflexiona | En móvil se recorrieron las **nueve decisiones**, con sus feedbacks y preguntas finales exactos. Se probaron los nueve reinicios de respuesta y los tres cambios de situación. Se limpiaron selecciones y se devolvió foco al selector. Las nueve vistas de resultado conservaron ancho 360/360 sin desbordamiento. |
| Contacto | Se escribieron **500 caracteres de prueba**, se eligió Medio ambiente y se copió mediante Enter. Se leyó el portapapeles únicamente después de esta acción de prueba: coincidió exactamente con el texto generado y su categoría. Borrar dejó texto/categoría vacíos, contador 0/500, botón de copia deshabilitado y foco en el textarea. No se utilizaron datos personales reales. |
| Consola y carga | La consulta de consola realizada en la vista de Contacto de escritorio devolvió cero errores/advertencias. En los registros del servidor no hubo 404 de páginas, CSS o JS del sitio; solo la petición automática de favicon indicada en QA-03. No se declara una captura exhaustiva de toda la consola de cada navegación. |

El viewport temporal se restableció al finalizar. La sesión de Chrome se desconectó durante un intento posterior de probar el respaldo sin JavaScript; ese intento **no se considera aprobado ni completado**.

## 4. Pruebas automatizadas repetibles

Se ejecutó `qa/check.mjs` sobre los archivos actuales con Node real. **Nueve grupos aprobados**:

1. Rutas, fragmentos, IDs, referencias ARIA/labels, coincidencia de mayúsculas/minúsculas de rutas para GitHub Pages y un h1 en los 13 HTML.
2. Imports existentes y carga nativa de los 21 módulos JS con DOM inerte. No es una prueba visual.
3. Rutas de datos, coincidencia entre las tres fichas y sus datos, fuentes concretas/canales vacíos y MP4 sin configurar.
4. Nueve combinaciones de búsqueda y categoría entre catálogo y biblioteca: tildes, mayúsculas, espacios, consulta múltiple y resultados vacíos.
5. **63 evaluaciones** de los tres quizzes: opciones correctas/incorrectas y selecciones inválidas.
6. Menú con DOM simulado: apertura, Escape, devolución de foco y paso a escritorio.
7. Nueve decisiones de Reflexiona con DOM simulado, reintentos y cambio; verificación del modo de desplazamiento reducido.
8. Reproductor con eventos simulados: fuente vacía, resolución de URL bajo un subdirectorio, track VTT, metadatos y error.
9. Contacto: límite 500, Unicode sin cortar un par sustituto, formato con categoría, Clipboard simulado exitoso/fallido y alternativa de copia con limpieza y foco.

Los dobles DOM y eventos de video se identifican como simulados; no prueban la decodificación del video ni la compatibilidad de los controles nativos en otros dispositivos.

Para repetir, si dispones de **Node 22 o posterior**:

```text
node qa/check.mjs
```

No requiere `npm install`. Node solo se utiliza como herramienta opcional de desarrollo; el sitio continúa funcionando con HTML/CSS/JS y Live Server/GitHub Pages.

## 5. Accesibilidad, seguridad e identidad

- Un h1 por página, landmarks, enlace de salto, navegación principal identificada y etiquetas asociadas a búsqueda, categorías, textarea y opciones de quiz.
- Filtros y decisiones usan `aria-pressed`; hay estados visibles adicionales al color: borde, marcador o texto «Seleccionada».
- Feedback con regiones `status`/`aria-live`; foco visible observado al navegar por teclado y en el radio tras reset. La compatibilidad con un lector de pantalla concreto sigue pendiente.
- `prefers-reduced-motion` está declarado globalmente. El componente Reflexiona consulta la misma preferencia para el desplazamiento. Se comprobó su lógica con medios simulados, no se cambió la preferencia real del sistema operativo.
- Espacios para subtítulos mediante configuración de captions en WebVTT; todavía no existe una pista real que sincronizar o escuchar.
- No hay formularios de envío, cuentas, bases de datos ni captación de datos personales. El borrador de Contacto solo se copia por acción explícita; no se afirma recepción por parte del equipo.
- Revisión de los 21 JS: no se encontraron usos de localStorage, sessionStorage, indexedDB, cookies, sendBeacon, XMLHttpRequest o fetch para guardar/enviar elecciones o borradores. La escritura de contenido en estos componentes usa nodos/textContent, no HTML construido a partir de entradas del visitante.
- Los enlaces externos existentes no abren nuevas pestañas, por lo que no requieren `noopener` para `target="_blank"`. Los canales oficiales siguen vacíos; no se inventaron correos o redes.
- Se consultaron las portadas de [UNICEF](https://www.unicef.org/), [UNESCO](https://www.unesco.org/) y [PNUMA](https://www.unep.org/). Siguen identificadas como portales generales, sin tratarlas como evidencia específica de cada texto educativo.

Contrastes calculados con luminancia relativa sRGB sobre los colores del código:

| Texto / fondo | Relación |
| --- | --- |
| Tinta / azul | 7,05:1 |
| Blanco roto / carbón | 11,77:1 |
| Azul / carbón | 4,71:1 |
| Carbón / blanco roto | 11,77:1 |
| Tinta / gris niebla | 12,89:1 |

Estas combinaciones superan 4,5:1. El punto azul de la marca sobre blanco roto es decorativo, no un texto de lectura ni un indicador único. Los cálculos y las comprobaciones realizadas no constituyen una certificación completa de WCAG.

## 6. Rendimiento conservador

- El código de producción contiene aproximadamente **62.553 bytes CSS** y **44.967 bytes JS** sin comprimir, repartidos entre páginas/componentes; no se cargan todos en cada página.
- No hay frameworks, librerías de terceros, paquetes instalados ni compilación obligatoria.
- No hay archivos de imagen o video reales que recomprimir. Los collages son SVG/CSS originales; se conservaron.
- Las imágenes futuras del Inicio usan proximidad al viewport; las del catálogo tienen carga diferida y dimensiones reservadas. Se revisó el código, no se midieron descargas de imágenes inexistentes.
- El video vacío usa `preload="none"`; cuando se configura, el componente solicita metadatos sin autoplay.
- Outfit/Inter/Space Mono conservan Google Fonts con `display=swap`, preconexiones y alternativas locales. Chrome informó estado de fuentes `loaded` en la matriz inspeccionada. Google Fonts sigue siendo una dependencia externa existente: no se han añadido otras.
- No se minificó, agrupó o cambió el diseño para perseguir puntuaciones. No se ejecutó Lighthouse ni se inventaron métricas de Core Web Vitals, FPS o tiempo de carga.

## 7. Pendientes y pruebas manuales faltantes

1. **Sin JavaScript:** la prueba en navegador quedó interrumpida. Desactiva JavaScript en DevTools y recarga catálogo, Recursos, Reflexiona y Contacto. Deben mantenerse enlaces/fichas, lecturas desplegables y redacción/copia manual; no deben aparentar funcionar controles desactivados.
2. **Lector de pantalla:** probar con NVDA/Firefox o VoiceOver/Safari los anuncios de filtros, respuestas y copia, el orden de foco y el cambio de situaciones. No se ejecutó un lector de pantalla durante esta auditoría.
3. **Zoom 200 % / 400 % y reflow a 320 px:** revisar títulos largos y opciones, sin ocultar contenido ni crear scroll horizontal. Los cuatro viewports solicitados sí se midieron; estos escenarios adicionales no.
4. **Otros navegadores/dispositivos:** Safari/iOS, Firefox y Android reales. El navegador utilizado fue Chrome de escritorio con viewport emulado, no dispositivos físicos.
5. **Copia denegada:** en un perfil de prueba, bloquear la API de portapapeles y probar la alternativa/mensaje manual. Esta auditoría comprobó el éxito nativo y los fallos mediante dobles de API, no una denegación real de permisos del navegador.
6. **Video real:** incorporar MP4 propio/autorizado, poster, captions VTT y transcripción; entonces probar audio manual, pausa, avance, encuadre completo, error de archivo y subtítulos sincronizados. El formato 9:16 y el estado vacío sí se comprobaron.
7. **Contenido editorial:** las fuentes específicas, guiones y permisos siguen pendientes. Revisar las afirmaciones educativas antes de publicarlas como definitivas. No se inventaron referencias ni videos durante QA.
8. **Favicon:** opcional, QA-03. No afecta a las funciones probadas.
9. **GitHub Pages:** no se desplegó. Tras publicar, volver a recorrer desde la URL del repositorio para confirmar el subdirectorio y la caché real.

## 8. Recorrido manual recomendado

1. Abrir la carpeta completa en VS Code y usar **Open with Live Server** sobre `index.html`.
2. Recorrer los seis enlaces del header; en móvil abrir con Enter, cerrar con Escape y cambiar de ancho con el menú abierto.
3. En Problemáticas, probar `prevencion` + Entorno digital, `ropa` + Sociedad y restablecer. Entrar en los tres episodios y volver al catálogo.
4. En cada episodio, responder una opción incorrecta, cambiar a la correcta, comprobar feedback y pulsar «Volver a intentarlo».
5. En Recursos, buscar `ropa`, filtrar Fast fashion, abrir las tres lecturas y regresar.
6. En Reflexiona, recorrer las nueve opciones; probar ambos botones de reinicio/cambio y la navegación por teclado.
7. En Contacto, escribir 500 caracteres de prueba, elegir categoría, copiar y pegar en una aplicación local; borrar y revisar foco/contador. No utilizar datos personales en las pruebas.
8. Repetir a 375/768/1024/1440 px y ejecutar los pendientes de accesibilidad, movimiento reducido y video real cuando corresponda.
