/* =========================================================
   Shabbeer Ali — Portfolio Script
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initTypingEffect();
  initSkills();
  initScrollReveal();
  initBackToTop();
  initActiveNavOnScroll();
  initParticles();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- Loader ---------- */
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 500);
  });
}

/* ---------- Navbar scroll effect ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu() {
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    })
  );
}

/* ---------- Dark/Light theme toggle ---------- */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = btn.querySelector('i');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    icon.className = 'fa-solid fa-sun';
  }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ---------- Typing animation ---------- */
function initTypingEffect() {
  const target = document.getElementById('typing');
  const phrases = ['Full Stack Developer', 'React Engineer', 'Node.js Developer', 'Problem Solver', 'CS Student'];
  let pi = 0, ci = 0, deleting = false;

  const tick = () => {
    const phrase = phrases[pi];
    target.textContent = phrase.slice(0, ci);
    if (!deleting && ci < phrase.length) {
      ci++; setTimeout(tick, 90);
    } else if (deleting && ci > 0) {
      ci--; setTimeout(tick, 45);
    } else {
      deleting = !deleting;
      if (!deleting) pi = (pi + 1) % phrases.length;
      setTimeout(tick, deleting ? 1400 : 300);
    }
  };
  tick();
}

/* ---------- Skills grid ---------- */
function initSkills() {
  const skills = [
    { name: 'HTML',      icon: 'fa-brands fa-html5',    level: 95 },
    { name: 'CSS',       icon: 'fa-brands fa-css3-alt', level: 90 },
    { name: 'JavaScript',icon: 'fa-brands fa-js',       level: 90 },
    { name: 'React',     icon: 'fa-brands fa-react',    level: 88 },
    { name: 'Angular',   icon: 'fa-brands fa-angular',  level: 75 },
    { name: 'Node.js',   icon: 'fa-brands fa-node-js',  level: 85 },
    { name: 'Express.js',icon: 'fa-solid fa-server',    level: 82 },
    { name: 'MongoDB',   icon: 'fa-solid fa-leaf',      level: 80 },
    { name: 'Java',      icon: 'fa-brands fa-java',     level: 78 },
    { name: 'MySQL',     icon: 'fa-solid fa-database',  level: 80 },
    { name: 'Oracle DB', icon: 'fa-solid fa-database',  level: 70 },
  ];

  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = skills.map(s => `
    <div class="skill-card reveal" data-level="${s.level}">
      <div class="skill-head">
        <div class="name"><i class="${s.icon}"></i> ${s.name}</div>
        <div class="pct">${s.level}%</div>
      </div>
      <div class="progress"><div class="progress-fill"></div></div>
    </div>
  `).join('');

  // Animate progress bars when visible
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.progress-fill');
        fill.style.width = e.target.dataset.level + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  grid.querySelectorAll('.skill-card').forEach(c => io.observe(c));
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
}

/* ---------- Particles background ---------- */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(80, Math.floor((w * h) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.4,
    }));
  };
  resize();
  window.addEventListener('resize', resize);

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    // Particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.55)';
      ctx.fill();
    });
    // Connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(124, 92, 255, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = '✓ Thanks! Your message has been received.';
      form.reset();
    }, 900);
  });
}