/** Funciones exclusivas del Inicio; la navegación global permanece independiente. */
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sections = document.querySelectorAll('[data-reveal]');
let observer;

function configureMotion() {
  observer?.disconnect();
  sections.forEach((section) => section.classList.remove('is-arriving'));
  if (motion.matches || !('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-arriving');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  sections.forEach((section) => observer.observe(section));
}
configureMotion();
motion.addEventListener('change', configureMotion);

// Completar data-local-image con una ruta relativa a una fotografía autorizada.
// Si no hay ruta o la carga falla, permanece la composición editorial original.
function loadLocalImage(slot) {
  const source = slot.dataset.localImage.trim();
  if (!source) return;
  const image = new Image();
  image.alt = '';
  image.className = 'local-art-image';
  image.decoding = 'async';
  image.addEventListener('load', () => {
    const frame = slot.querySelector('.cover-art__frame') || slot;
    frame.append(image);
    slot.classList.add('has-local-image');
  }, { once: true });
  image.addEventListener('error', () => {
    // No insertar imágenes fallidas: conservar el placeholder y su aviso.
    slot.classList.remove('has-local-image');
  }, { once: true });
  image.src = source;
}
const imageObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadLocalImage(entry.target);
        imageObserver.unobserve(entry.target);
      });
    }, { rootMargin: '400px' })
  : null;
document.querySelectorAll('[data-local-image]').forEach((slot) => {
  if (!slot.dataset.localImage.trim()) return;
  if (!imageObserver || slot.classList.contains('cover-art')) loadLocalImage(slot);
  else imageObserver.observe(slot);
});
