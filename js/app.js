/**
 * PRIME FORTUNE TOMI ZAISAN FINANCIAL SERVICES
 * Main Application Logic & Interactive Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

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

  // 2. Sticky Header Styling on Scroll
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Service Filter Tabs
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterCategory === 'all' || category === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Service Detailed Modal Data
  const serviceDetails = {
    business: {
      title: 'Business Loans & Working Capital',
      badge: 'Commercial Financing',
      desc: 'Customized financing solutions to power business expansion, machinery purchase, inventory restocking, and operational cash flow management. We work with leading banks to offer customized unsecured and secured business credit lines.',
      features: [
        'Loan amounts up to ₹15 Crore with flexible collateral options',
        'Competitive interest rates starting from 9.25% p.a.',
        'Fast turnaround with approvals in as fast as 48–72 hours',
        'Minimal documentation tailored for proprietors, partnerships & Pvt Ltd companies'
      ],
      documents: [
        'Last 3 years Audited Financials (Balance Sheet & P&L)',
        'Last 12 months Bank Account Statements',
        'GST Returns (last 12 months) and Business PAN/Registration',
        'KYC of Promoters/Directors'
      ]
    },
    bank: {
      title: 'Bank Loans & Institutional Financing',
      badge: 'Direct Banking Network',
      desc: 'Assistance in securing high-value competitive loan options through our four decades of established banking relationships across PSU, private, and multinational lending institutions.',
      features: [
        'Direct priority processing through tier-1 banking partners',
        'Access to specialized institutional interest rates and zero hidden charges',
        'Structured term loans, overdraft (OD), and cash credit (CC) facilities',
        'End-to-end guidance from evaluation to sanction letter disbursement'
      ],
      documents: [
        'KYC Documents of Applicant and Co-applicants',
        'Income Tax Returns for last 2–3 Assessment Years',
        'Income/Salary slips or Business Proof',
        'Existing loan statements and track record'
      ]
    },
    housing: {
      title: 'Housing Loans & Home Construction',
      badge: 'Residential Financing',
      desc: 'Helping individuals and families finance their dream residences, villas, apartments, plots, or home renovation with customized interest rates and maximum tenure flexibility.',
      features: [
        'Lowest market interest rates starting from 8.35% p.a.',
        'Extended repayment tenure up to 30 years for manageable EMIs',
        'Home loan balance transfer with attractive top-up facilities',
        'Support for self-employed as well as salaried professionals'
      ],
      documents: [
        'Proof of Identity & Current Residential Address',
        'Last 6 months salary slips & Form 16 / 3 years ITR with computation',
        'Property title deeds, approved building plan, and sale agreement',
        'Latest 6 months bank statement'
      ]
    },
    gold: {
      title: 'Gold Loans & Immediate Liquidity',
      badge: 'Instant Secured Capital',
      desc: 'Quick and secure funding against certified gold ornaments and coins with convenient repayment options, minimal paperwork, and immediate same-day liquidity.',
      features: [
        'Instant valuation and disbursement within 30 to 60 minutes',
        'Safe custodian bank-grade vault storage with 100% insurance cover',
        'Flexible repayment choices: monthly interest, bullet payment, or regular EMI',
        'No income proof or stringent CIBIL constraints needed'
      ],
      documents: [
        'Government-issued Photo ID (Aadhaar, Passport, Voter ID, PAN)',
        'Address Proof',
        'Gold ornaments/coins for verification and valuation'
      ]
    },
    property: {
      title: 'Loan Against Property (LAP)',
      badge: 'High-Value Asset Financing',
      desc: 'Unlock substantial capital locked in your residential, commercial, or industrial property to fuel business expansion, medical requirements, education, or debt consolidation.',
      features: [
        'High ticket loan sanction up to ₹25+ Crore (up to 75% market value)',
        'Low interest rates compared to unsecured personal/business loans',
        'Long repayment tenure of up to 15 to 20 years',
        'Continue uninterrupted ownership and use of your property'
      ],
      documents: [
        'Complete original title chain documents and municipal tax receipts',
        'Approved plan and building sanction documents',
        'Income proof (3 years ITR with financials or 6 months salary records)',
        'Bank statements for last 12 months'
      ]
    },
    equity: {
      title: 'Equity Loans & Loan Against Securities (LAS)',
      badge: 'Portfolio Leverage',
      desc: 'Leverage your listed equity shares, mutual fund units, sovereign gold bonds, and financial securities to access rapid liquidity while retaining complete ownership and future capital gains.',
      features: [
        'Instant liquidity without liquidating your long-term investment portfolios',
        'Interest charged strictly on the amount utilized (Overdraft facility)',
        'Retain all dividends, bonuses, and capital appreciation benefits',
        'Paperless digital lien marking with quick limit generation'
      ],
      documents: [
        'Demat account holding statement & CAS (Consolidated Account Statement)',
        'KYC Documents (PAN card & Aadhaar)',
        'Bank mandate for overdraft link'
      ]
    },
    private: {
      title: 'Private Loans & Specialized Funding',
      badge: 'Bespoke Capital Solutions',
      desc: 'Tailored private lending arrangements and bridging finance designed to fulfill urgent, high-ticket, or unique funding requirements that fall outside typical rigid banking parameters.',
      features: [
        'Customized deal structuring suited for special transactions and urgent timelines',
        'Flexible repayment structures, milestone-based disbursals, and bullet options',
        'Strict confidentiality and professional discretionary handling',
        'Direct advisory from Vikram Chugh with 40+ years industry insight'
      ],
      documents: [
        'Requirement brief & purpose of funds',
        'Collateral or asset verification details',
        'Promoter background & cash flow projections'
      ]
    }
  };

  // Service Modal Logic
  const serviceModal = document.getElementById('service-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-service-title');
  const modalBadge = document.getElementById('modal-service-badge');
  const modalDesc = document.getElementById('modal-service-desc');
  const modalFeatures = document.getElementById('modal-service-features');
  const modalDocs = document.getElementById('modal-service-docs');
  const modalApplyBtn = document.getElementById('modal-apply-btn');

  window.openServiceModal = function (serviceKey) {
    const data = serviceDetails[serviceKey];
    if (!data || !serviceModal) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalDesc.textContent = data.desc;

    // Render features
    modalFeatures.innerHTML = data.features
      .map(f => `<li><i class="fa-solid fa-circle-check" style="color:#10b981; margin-right:8px;"></i>${f}</li>`)
      .join('');

    // Render documents
    modalDocs.innerHTML = data.documents
      .map(d => `<li><i class="fa-solid fa-file-lines" style="color:#0284c7; margin-right:8px;"></i>${d}</li>`)
      .join('');

    modalApplyBtn.onclick = () => {
      closeServiceModal();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      const loanSelect = document.getElementById('contact-loan-type');
      if (loanSelect) {
        loanSelect.value = serviceKey;
      }
    };

    serviceModal.classList.add('active');
  };

  window.closeServiceModal = function () {
    if (serviceModal) {
      serviceModal.classList.remove('active');
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeServiceModal);
  }

  if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        closeServiceModal();
      }
    });
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Toast Notification Helper
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.2rem;"></i>
      <div>
        <div style="font-weight: 700;">${message}</div>
        <div style="font-size: 0.8rem; color: #64748b;">Our financial advisor will contact you shortly.</div>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // 7. Hero Quick Form Submission
  const heroQuickForm = document.getElementById('hero-quick-form');
  if (heroQuickForm) {
    heroQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loanType = document.getElementById('hero-loan-type').value;
      const loanAmount = document.getElementById('hero-loan-amount').value;
      const phone = document.getElementById('hero-phone').value;

      if (!phone || phone.trim().length < 8) {
        alert('Please enter a valid contact phone number.');
        return;
      }

      // Format WhatsApp Message
      const message = encodeURIComponent(
        `Hello Vikram / Prime Fortune TZ Team,\n\nI am requesting a quick consultation for:\n- Loan Type: ${loanType}\n- Required Amount: ${loanAmount}\n- Phone: ${phone}\n\nPlease get in touch with me.`
      );

      showToast('Thank you! Redirecting you to WhatsApp for direct VIP priority...');
      setTimeout(() => {
        window.open(`https://wa.me/919945106789?text=${message}`, '_blank');
      }, 1200);

      heroQuickForm.reset();
    });
  }

  // 8. Main Contact Form Submission
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const email = document.getElementById('contact-email').value;
      const loanType = document.getElementById('contact-loan-type').value;
      const messageText = document.getElementById('contact-message').value;

      if (!name || !phone) {
        alert('Please fill out your name and contact phone number.');
        return;
      }

      const waMsg = encodeURIComponent(
        `Hello Prime Fortune Tomi Zaisan Financial Services,\n\nNew Consultation Request:\n- Name: ${name}\n- Phone: ${phone}\n- Email: ${email || 'N/A'}\n- Service Needed: ${loanType}\n- Message: ${messageText || 'Consultation Request'}`
      );

      showToast(`Thank you, ${name}! Your request has been received.`);
      
      setTimeout(() => {
        const directChat = confirm('Would you like to connect directly with Founder Vikram Chugh on WhatsApp now for fast assistance?');
        if (directChat) {
          window.open(`https://wa.me/919945106789?text=${waMsg}`, '_blank');
        }
      }, 1000);

      contactForm.reset();
    });
  }
});
