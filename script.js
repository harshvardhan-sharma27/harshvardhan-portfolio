// Technology labels and icons (icons come from the Devicon CDN)
const TECH = {
  java: ['Java', 'devicon-java-plain colored'], c: ['C', 'devicon-c-plain colored'],
  python: ['Python', 'devicon-python-plain colored'], jdbc: ['JDBC', 'devicon-java-plain colored'],
  servlets: ['Servlets', 'devicon-java-plain colored'], jsp: ['JSP', 'devicon-java-plain colored'],
  tomcat: ['Apache Tomcat', 'devicon-tomcat-line colored'], spring: ['Spring', 'devicon-spring-plain colored'],
  springboot: ['Spring Boot', 'devicon-spring-plain colored'], hibernate: ['Hibernate', 'devicon-hibernate-plain colored'],
  maven: ['Maven', 'devicon-maven-plain colored'], mysql: ['MySQL', 'devicon-mysql-plain colored'],
  postgresql: ['PostgreSQL', 'devicon-postgresql-plain colored'], sql: ['SQL', 'devicon-azuresqldatabase-plain colored'],
  html: ['HTML5', 'devicon-html5-plain colored'], css: ['CSS3', 'devicon-css3-plain colored'],
  js: ['JavaScript', 'devicon-javascript-plain colored'], bootstrap: ['Bootstrap', 'devicon-bootstrap-plain colored'],
  tailwind: ['Tailwind CSS', 'devicon-tailwindcss-original colored'], git: ['Git', 'devicon-git-plain colored'],
  github: ['GitHub', 'devicon-github-original'], eclipse: ['Eclipse', 'devicon-eclipse-plain colored'],
  workbench: ['MySQL Workbench', 'devicon-mysql-plain colored'], latex: ['LaTeX', 'devicon-latex-original'],
  arduino: ['Arduino', 'devicon-arduino-plain colored']
};
document.querySelectorAll('.chips').forEach(box => {
  box.innerHTML = box.dataset.tech.split(',').map(k => {
    const [label, icon] = TECH[k.trim()] || [k, ''];
    return `<span class="chip"><i class="${icon}"></i>${label}</span>`;
  }).join('');
});

// Mobile menu
const burger = document.querySelector('.burger'), menu = document.querySelector('.nav nav');
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));
menu.addEventListener('click', () => menu.classList.remove('open'));

// Hero: a request travels through the layers
const nodes = [...document.querySelectorAll('.node')];
let step = 0;
setInterval(() => {
  nodes.forEach((n, i) => n.classList.toggle('on', i === step));
  step = (step + 1) % (nodes.length + 1); // one beat of rest at the end
}, 900);

// Reveal on scroll, count-up stats, active nav link
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(c => {
    const to = +c.dataset.count; let n = 0;
    const t = setInterval(() => { c.textContent = ++n; if (n >= to) clearInterval(t); }, 300);
  });
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('.sec').forEach(s => { s.classList.add('reveal'); io.observe(s); });

const links = [...document.querySelectorAll('.nav nav a')];
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section').forEach(s => spy.observe(s));

// Toast for GitHub links that are not ready yet
const toast = document.getElementById('toast');
document.querySelectorAll('[data-soon]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  toast.textContent = 'This project goes on GitHub soon.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}));

// Image lightbox
const lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img');
document.querySelectorAll('img.zoom').forEach(img => img.addEventListener('click', () => {
  if (!img.getAttribute('src')) return;
  lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add('open');
}));
lb.addEventListener('click', () => lb.classList.remove('open'));
document.addEventListener('keydown', e => e.key === 'Escape' && lb.classList.remove('open'));
