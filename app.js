// UPCON 2025 Conference Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScheduleTabs();
    initForms();
    initScrollEffects();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderBackground();
    });
    
    // Initial call to set active link
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    let activeSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = section.getAttribute('id');
        }
    });
    
    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Update header background opacity on scroll
function updateHeaderBackground() {
    const header = document.getElementById('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        header.style.background = 'rgba(19, 52, 59, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(19, 52, 59, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const lines = navToggle.querySelectorAll('.nav-toggle-line');
    if (navMenu.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const lines = navToggle.querySelectorAll('.nav-toggle-line');
    
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    
    // Reset hamburger menu animation
    lines[0].style.transform = 'none';
    lines[1].style.opacity = '1';
    lines[2].style.transform = 'none';
}

// Schedule tabs functionality
function initScheduleTabs() {
    const tabButtons = document.querySelectorAll('.schedule-tab');
    const tabContents = document.querySelectorAll('.schedule-day');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetDay);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Form handling
function initForms() {
    const registrationForm = document.getElementById('registrationForm');
    const contactForm = document.getElementById('contactForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formFields = e.target.querySelectorAll('.form-control');
    let isValid = true;
    
    // Basic validation
    formFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--color-error)';
        } else {
            field.style.borderColor = 'var(--color-border)';
        }
    });
    
    if (isValid) {
        // Show success message
        showNotification('Registration submitted successfully! We will contact you soon.', 'success');
        e.target.reset();
    } else {
        showNotification('Please fill in all required fields.', 'error');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formFields = e.target.querySelectorAll('.form-control');
    let isValid = true;
    
    // Basic validation
    formFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--color-error)';
        } else {
            field.style.borderColor = 'var(--color-border)';
        }
    });
    
    if (isValid) {
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        e.target.reset();
    } else {
        showNotification('Please fill in all required fields.', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-radius: var(--radius-base);
        padding: var(--space-16);
        max-width: 400px;
        z-index: 10000;
        box-shadow: var(--shadow-lg);
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-12);
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Set type-specific colors
    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--color-success)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'error') {
        notification.style.borderLeftColor = 'var(--color-error)';
        notification.style.borderLeftWidth = '4px';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.card, .speaker-card, .track-item, .timeline-item, .stat-item, .committee-member, .sponsor-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for scroll animations
    addScrollAnimationStyles();
}

function addScrollAnimationStyles() {
    if (document.getElementById('scroll-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'scroll-animations';
    style.textContent = `
        .card, .speaker-card, .track-item, .timeline-item, .stat-item, .committee-member, .sponsor-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .timeline-item {
            transition-delay: 0.1s;
        }
        
        .timeline-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .timeline-item:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .timeline-item:nth-child(4) {
            transition-delay: 0.4s;
        }
        
        .timeline-item:nth-child(5) {
            transition-delay: 0.5s;
        }
        
        .timeline-item:nth-child(6) {
            transition-delay: 0.6s;
        }
        
        .speaker-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .speaker-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .speaker-card:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .track-item:nth-child(even) {
            transition-delay: 0.1s;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .card, .speaker-card, .track-item, .timeline-item, .stat-item, .committee-member, .sponsor-item {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth reveal animation for hero section
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroEvent = document.querySelector('.hero-event');
    const heroDetails = document.querySelector('.hero-details');
    const heroActions = document.querySelector('.hero-actions');
    const heroImage = document.querySelector('.hero-image');
    
    const elements = [heroTitle, heroSubtitle, heroEvent, heroDetails, heroActions, heroImage];
    
    elements.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        }
    });
});

// Add loading state for forms
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced form validation with real-time feedback
function initRealTimeValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'var(--color-error)';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = 'var(--color-border)';
                hideFieldError(this);
            }
        });
    });
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'var(--color-error)';
                showFieldError(this, 'This field is required');
            } else {
                this.style.borderColor = 'var(--color-border)';
                hideFieldError(this);
            }
        });
    });
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Initialize real-time validation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initRealTimeValidation();
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Navigate schedule tabs with arrow keys
    if (e.target.classList.contains('schedule-tab')) {
        const tabs = Array.from(document.querySelectorAll('.schedule-tab'));
        const currentIndex = tabs.indexOf(e.target);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            tabs[currentIndex - 1].click();
            tabs[currentIndex - 1].focus();
        } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
            tabs[currentIndex + 1].click();
            tabs[currentIndex + 1].focus();
        }
    }
});