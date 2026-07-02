document.addEventListener('DOMContentLoaded', () => {

  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 400);
  });

  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('main section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function handleActiveLink() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 140; // offset for fixed navbar

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Default to "home" when at the very top of the page
    if (window.scrollY < 200) {
      currentSectionId = 'home';
    }

    navLinks.forEach((link) => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleActiveLink();
  });

  // Run once on load in case the page is refreshed mid-scroll
  handleNavbarScroll();
  handleActiveLink();

  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('[data-link]');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    const isOpen = mobileMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile menu whenever a nav link is clicked
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return; // ignore bare "#"

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  // Fade elements in as they scroll into view
  const animatedEls = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  animatedEls.forEach((el) => revealObserver.observe(el));

  // Count-up animation for the stats section
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out for a smoother finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(eased * target);

      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => statsObserver.observe(el));

  // Monthly/yearly pricing toggle
  const pricingToggle = document.getElementById('pricingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');
  const priceAmounts = document.querySelectorAll('.price-card__amount .amount');

  let isYearly = false;

  pricingToggle.addEventListener('click', () => {
    isYearly = !isYearly;
    pricingToggle.classList.toggle('active', isYearly);
    monthlyLabel.classList.toggle('active', !isYearly);
    yearlyLabel.classList.toggle('active', isYearly);

    priceAmounts.forEach((amountEl) => {
      const value = isYearly
        ? amountEl.getAttribute('data-yearly')
        : amountEl.getAttribute('data-monthly');
      amountEl.textContent = value;
    });
  });

  // FAQ accordion — only one item open at a time
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-item__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((otherItem) => otherItem.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Ripple effect on buttons
  const rippleButtons = document.querySelectorAll('[data-ripple]');

  rippleButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);

      // Clean up after animation completes
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Contact form — validation + Formspree submission
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function validateField(field) {
    const group = field.closest('.form-group');
    let isValid = field.checkValidity();

    // Extra check for a properly formatted email
    if (field.type === 'email' && field.value.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(field.value.trim());
    }

    group.classList.toggle('error', !isValid);
    return isValid;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = contactForm.querySelectorAll('input[required], textarea[required]');
    let formIsValid = true;

    fields.forEach((field) => {
      const fieldValid = validateField(field);
      if (!fieldValid) formIsValid = false;
    });

    if (!formIsValid) {
      formSuccess.classList.remove('show');
      return;
    }

    // Disable the submit button while sending to avoid double submissions
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formSuccess.textContent = '';
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-circle-check';
        formSuccess.appendChild(icon);
        formSuccess.append(' Your message has been sent successfully!');
        formSuccess.classList.add('show');
        contactForm.reset();
      } else {
        throw new Error('Formspree responded with an error');
      }
    } catch (err) {
      formSuccess.textContent = '';
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-circle-exclamation';
      formSuccess.style.color = '#F87171';
      formSuccess.appendChild(icon);
      formSuccess.append(' Something went wrong. Please try again or email us directly.');
      formSuccess.classList.add('show');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;

      // Hide the message after a few seconds
      setTimeout(() => {
        formSuccess.classList.remove('show');
        formSuccess.style.color = '';
      }, 5000);
    }
  });

  // Live-validate fields as the user types (clears error state early)
  contactForm.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('error')) {
        validateField(field);
      }
    });
  });

  const newsletterForm = document.getElementById('newsletterForm');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');

    if (input.value.trim() !== '') {
      input.value = '';
      input.placeholder = 'Thanks for subscribing!';
      setTimeout(() => {
        input.placeholder = 'Enter your email';
      }, 3000);
    }
  });

  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.scrollY > 500);
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('currentYear').textContent = new Date().getFullYear();

});