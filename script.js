/* ============================================
   BASAO WORKFORCE OS — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header with scroll effect ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const headerNav = document.getElementById('headerNav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    headerNav.classList.toggle('mobile-open');
    document.body.style.overflow = headerNav.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      headerNav.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep it visible
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Animated Number Counters ---
  const counters = document.querySelectorAll('[data-target]');
  let countersAnimated = new Set();

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
        countersAnimated.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.textContent.startsWith('$') ? '$' : '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (isDecimal) {
          el.textContent = prefix + target.toFixed(1) + suffix;
        } else {
          el.textContent = prefix + target.toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(update);
  }

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollPos >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // --- Search interaction (visual feedback) ---
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchBtn.textContent = '⏳ Searching...';
      searchBtn.style.opacity = '0.7';

      setTimeout(() => {
        searchBtn.textContent = '✅ 247 Opportunities Found!';
        searchBtn.style.opacity = '1';

        setTimeout(() => {
          searchBtn.textContent = '🔍 Search Opportunities';
        }, 2500);
      }, 1500);
    });
  }

  // --- Parallax effect on hero floating badges ---
  const badges = document.querySelectorAll('.floating-badge');
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    badges.forEach((badge, i) => {
      const speed = (i + 1) * 8;
      const x = mouseX * speed;
      const y = mouseY * speed;
      badge.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // --- AI diagram node hover pulse ---
  const aiNodes = document.querySelectorAll('.ai-node');
  aiNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.style.borderColor = 'var(--primary-light)';
      node.style.boxShadow = '0 0 20px rgba(14, 116, 144, 0.15)';
    });
    node.addEventListener('mouseleave', () => {
      node.style.borderColor = 'var(--gray-100)';
      node.style.boxShadow = 'var(--shadow-md)';
    });
  });

});
