// ===========================
// PARTICLES BACKGROUND (Subtle yellow sparkles)
// ===========================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 18) + 's';
    particle.style.animationDelay = (Math.random() * 12) + 's';

    container.appendChild(particle);
  }
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ===========================
// SMOOTH SCROLL
// ===========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===========================
// ACTIVE NAV LINK HIGHLIGHTING
// ===========================
function initActiveNav() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === '#' + id
          );
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ===========================
// HERO YELLOW CIRCLE PARALLAX
// ===========================
function initHeroParallax() {
  const heroImage = document.querySelector('.hero-image');
  const profileImg = document.querySelector('.image-frame img');

  if (!heroImage) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = window.innerHeight;

    if (scrolled < maxScroll) {
      const ratio = scrolled / maxScroll;
      // Subtle parallax on both circle (via custom property) and image
      heroImage.style.setProperty('--parallax-y', `${ratio * 20}px`);
      
      if (profileImg) {
        profileImg.style.transform = `translateY(${ratio * 10}px) scale(1)`;
      }
    }
  }, { passive: true });
}

// ===========================
// NETWORK NODE ANIMATION
// ===========================
function initNetworkAnimation() {
  const networkTop = document.querySelector('.hero-network-top');
  const networkBottom = document.querySelector('.hero-network-bottom');

  if (!networkTop && !networkBottom) return;

  let angle = 0;
  function animate() {
    angle += 0.3;
    const offset = Math.sin(angle * Math.PI / 180) * 5;

    if (networkTop) {
      networkTop.style.transform = `translateY(${offset}px) rotate(${angle * 0.05}deg)`;
    }
    if (networkBottom) {
      networkBottom.style.transform = `translateY(${-offset}px) rotate(${-angle * 0.05}deg)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ===========================
// INITIALIZE
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initActiveNav();
  initHeroParallax();
  initNetworkAnimation();
});
