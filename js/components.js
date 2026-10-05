/**
 * PRIME FORTUNE TOMI ZAISAN FINANCIAL SERVICES
 * Reusable Header & Footer Component Loader
 */

document.addEventListener('DOMContentLoaded', async () => {
  const headerPlaceholder = document.getElementById('site-header');
  const footerPlaceholder = document.getElementById('site-footer');

  // Load Header Component
  if (headerPlaceholder) {
    try {
      const headerResp = await fetch('components/header.html');
      if (headerResp.ok) {
        headerPlaceholder.innerHTML = await headerResp.text();
        initNavigation();
      }
    } catch (e) {
      console.warn('Could not fetch components/header.html, using fallback if present:', e);
      initNavigation();
    }
  } else {
    initNavigation();
  }

  // Load Footer Component
  if (footerPlaceholder) {
    try {
      const footerResp = await fetch('components/footer.html');
      if (footerResp.ok) {
        footerPlaceholder.innerHTML = await footerResp.text();
      }
    } catch (e) {
      console.warn('Could not fetch components/footer.html:', e);
    }
  }

  function initNavigation() {
    // Determine Current Page
    const path = window.location.pathname;
    let pageName = path.split('/').pop() || 'index.html';
    if (pageName === '') pageName = 'index.html';

    // Highlight Active Link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const targetPage = link.getAttribute('data-page') || link.getAttribute('href');
      if (targetPage === pageName || (pageName === '' && targetPage === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Initialize Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
      mobileToggle.onclick = () => {
        navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-xmark');
        }
      };

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        });
      });
    }

    // Sticky Header Scroll Effect
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          mainHeader.classList.add('scrolled');
        } else {
          mainHeader.classList.remove('scrolled');
        }
      });
    }
  }
});
