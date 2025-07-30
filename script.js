 // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function highlightNavigation() {
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Show success message
      alert(`Thank you ${name}! We have received your message and will contact you back at ${email} soon.`);
      
      // Reset form
      contactForm.reset();
    });

    // Stats counter animation
    function animateCounter(element, target) {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        if (target >= 1000000) {
          element.textContent = + (current / 1000000).toFixed(0) + 'M+';
        } else if (target >= 1000) {
          element.textContent = (current / 1000).toFixed(0) + 'K+';
        } else if (target < 100) {
          element.textContent = current.toFixed(0) + '%';
        } else {
          element.textContent = current.toFixed(0) + '+';
        }
      }, 20);
    }

    // Trigger counter animation when about section is visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => {
            const text = stat.textContent;
            let target;
            
            if (text.includes('1000+')) {
              target = 1000;
            } else if (text.includes('95%')) {
              target = 95;
            } else if (text.includes('$50M+')) {
              target = 50000000;
            } else if (text.includes('50+')) {
              target = 50;
            }
            
            animateCounter(stat, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
      statsObserver.observe(aboutSection);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .team-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Form validation enhancements
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
          this.style.borderColor = '#ef4444';
          this.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
        } else {
          this.style.borderColor = '#10b981';
          this.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
        }
      });
      
      input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
        this.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
      });
    });

    // Add loading state to contact form
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    contactForm.addEventListener('submit', function(e) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 2000);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-visual');
      if (hero) {
        const speed = scrolled * 0.1;
        hero.style.transform = `translateY(${speed}px)`;
      }
    });

    // Add typing effect to hero text
    function typeWriter(element, texts, speed = 100) {
      let textIndex = 0;
      let charIndex = 0;
      
      function type() {
        if (textIndex < texts.length) {
          if (charIndex < texts[textIndex].length) {
            element.innerHTML = texts[textIndex].substring(0, charIndex + 1) + '<span class="highlight">' + texts[textIndex].substring(charIndex + 1) + '</span>';
            charIndex++;
            setTimeout(type, speed);
          } else {
            setTimeout(() => {
              textIndex++;
              charIndex = 0;
              if (textIndex >= texts.length) textIndex = 0;
              type();
            }, 2000);
          }
        }
      }
      type();
    }

    // Initialize enhanced interactions
    window.addEventListener('load', () => {
      // Add stagger animation to feature cards
      const featureCards = document.querySelectorAll('.feature-card');
      featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
      
      // Add stagger animation to team cards
      const teamCards = document.querySelectorAll('.team-card');
      teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
    });