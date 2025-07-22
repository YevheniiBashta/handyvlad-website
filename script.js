
// Enhanced JavaScript for HANDYVLAD website
document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('.about');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }

    // Enhanced form handling
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create success message
            const existingSuccess = form.querySelector('.form-success');
            if (existingSuccess) {
                existingSuccess.remove();
            }

            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = '✓ Thank you! Your message has been sent successfully. We\'ll contact you soon!';
            form.insertBefore(successDiv, form.firstChild);
            
            setTimeout(() => {
                successDiv.classList.add('show');
            }, 100);

            // Animate form submission
            const submitBtn = form.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.style.background = '#2ecc71';
            
            setTimeout(() => {
                submitBtn.textContent = 'SENT ✓';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);

            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successDiv && successDiv.parentNode) {
                    successDiv.classList.remove('show');
                    setTimeout(() => {
                        if (successDiv.parentNode) {
                            successDiv.remove();
                        }
                    }, 300);
                }
            }, 5000);
        });

        // Real-time form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', validateInput);
        });

        function validateInput(e) {
            const input = e.target;
            const isValid = input.checkValidity();
            
            if (!isValid && input.value) {
                input.style.borderColor = '#e74c3c';
                input.style.backgroundColor = '#fdf2f2';
            } else if (isValid && input.value) {
                input.style.borderColor = '#2ecc71';
                input.style.backgroundColor = '#f8fff8';
            } else {
                input.style.borderColor = '#e0e0e0';
                input.style.backgroundColor = '#fafafa';
            }
        }
    }

    // Service cards animation on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Tools animation
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add floating animation to service icons
    const serviceIcons = document.querySelectorAll('.service-card i');
    serviceIcons.forEach(icon => {
        icon.style.animation = 'float 3s ease-in-out infinite';
    });

    // Add CSS for floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }
    `;
    document.head.appendChild(floatStyle);

    // Add stagger animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // Phone number click to call
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    console.log('🚀 HANDYVLAD website enhanced with animations!');
});
