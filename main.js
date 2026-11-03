// Mobile menu: instant open state (no transition), so it paints above content.
var toggle = document.querySelector('[data-menu-toggle]');
var menu = document.querySelector('[data-mobile-menu]');
if (toggle && menu) {
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll-spy via IntersectionObserver.
var spyLinks = document.querySelectorAll('[data-spy]');
var sections = ['services', 'calmer-visit', 'happy-dogs', 'book-in', 'visit'];
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      spyLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('data-spy') === entry.target.id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(function (id) {
  var el = document.getElementById(id);
  if (el) observer.observe(el);
});

// Service tabs.
var tabBtns = document.querySelectorAll('.tab-btn');
var panels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    tabBtns.forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    panels.forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    var panel = document.querySelector('[data-panel="' + btn.getAttribute('data-tab') + '"]');
    if (panel) panel.classList.add('active');
  });
});

// Gallery lightbox.
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.g-item').forEach(function (item) {
  item.addEventListener('click', function () {
    lightboxImg.src = item.getAttribute('data-full');
    lightboxImg.alt = item.querySelector('img').alt;
    lightbox.hidden = false;
  });
});
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
}
var closeBtn = document.querySelector('.lightbox-close');
if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
});

// Booking form: opens the visitor's email app addressed to Tinkertails.
var form = document.getElementById('booking-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var body = 'Name: ' + data.get('name') + '\nDog: ' + data.get('dog') +
      '\nService wanted: ' + data.get('service') + '\nNotes: ' + (data.get('notes') || '');
    window.location.href = 'mailto:nickysdoggrooming@gmail.com?subject=' +
      encodeURIComponent('Booking request from the Tinkertails website') + '&body=' + encodeURIComponent(body);
  });
}
