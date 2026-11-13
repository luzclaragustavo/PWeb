/* Compromiso Laboral — movimiento de la página
   - Sombra en el header al scrollear
   - Aparición suave de secciones y fichas al entrar en pantalla
   Si el usuario pidió reducir movimiento, solo se aplica la sombra. */

(function () {
  var header = document.querySelector('.site-header');

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var selector = [
    '.somos-figure', '.somos-copy',
    '.mas-sobre .h2', '.index-row',
    '.enlaces-inner',
    '.contactos .h2', '.contactos-intro', '.contacto',
    '.section-header',
    '.infra-card', '.service-card',
    '.staff-group-title', '.staff-card'
  ].join(',');

  var items = document.querySelectorAll(selector);

  var observer = new IntersectionObserver(function (entries) {
    var visibles = entries.filter(function (e) { return e.isIntersecting; });
    visibles.forEach(function (entry, i) {
      var el = entry.target;
      // Escalonado entre los elementos que entran juntos (máx. ~0.4 s)
      el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
      el.classList.add('is-visible');
      observer.unobserve(el);
      // Al terminar, se limpia para que los efectos de hover respondan rápido
      el.addEventListener('transitionend', function done(ev) {
        if (ev.target !== el || ev.propertyName !== 'opacity') return;
        el.classList.remove('reveal', 'is-visible');
        el.style.transitionDelay = '';
        el.removeEventListener('transitionend', done);
      });
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  items.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
