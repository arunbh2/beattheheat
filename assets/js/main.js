/**
 * BeatTheHeat.global - Main JavaScript
 * Core functionality and interactions
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeatRibbon();
    initStatsCounters();
    initQuotesCarousel();
    initEventFilters();
    initModals();
    initForms();
    initScrollAnimations();
    initAccessibility();
    
    console.log('BeatTheHeat.global initialized');
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Heat Emergency Ribbon functionality
 */
function initHeatRibbon() {
    const ribbon = document.getElementById('heat-ribbon');
    if (!ribbon) return;
    
    // Simulate real-time data updates
    const locations = [
        { state: 'Rajasthan', city: 'Jaipur', temp: 45 },
        { state: 'Maharashtra', city: 'Nagpur', temp: 42 },
        { state: 'Gujarat', city: 'Ahmedabad', temp: 44 },
        { state: 'Uttar Pradesh', city: 'Lucknow', temp: 41 }
    ];
    
    let currentIndex = 0;
    
    function updateRibbonData() {
        const location = locations[currentIndex];
        const statesOnAlert = Math.floor(Math.random() * 5) + 15; // 15-19 states
        
        const ribbonText = ribbon.querySelector('.ribbon-text');
        if (ribbonText) {
            ribbonText.textContent = `${statesOnAlert} States on Red Alert | ${location.temp}°C Real-Feel in ${location.city}`;
        }
        
        currentIndex = (currentIndex + 1) % locations.length;
    }
    
    // Update every 30 seconds
    setInterval(updateRibbonData, 30000);
    
    // Make ribbon dismissible
    const dismissBtn = document.createElement('button');
    dismissBtn.innerHTML = '×';
    dismissBtn.className = 'ribbon-dismiss';
    dismissBtn.setAttribute('aria-label', 'Dismiss heat alert');
    dismissBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0 8px;
        margin-left: 12px;
    `;
    
    dismissBtn.addEventListener('click', function() {
        ribbon.style.transform = 'translateY(-100%)';
        document.body.style.paddingTop = '73px'; // Adjust for header only
    });
    
    ribbon.querySelector('.ribbon-content').appendChild(dismissBtn);
}

/**
 * Animated statistics counters
 */
function initStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(function() {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format large numbers
            let displayValue = Math.floor(current);
            if (target >= 1000000) {
                displayValue = (displayValue / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                displayValue = (displayValue / 1000).toFixed(0) + 'K';
            }
            
            element.textContent = displayValue;
        }, 16);
    }
    
    // Use Intersection Observer to trigger animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * Quotes carousel functionality
 */
function initQuotesCarousel() {
    const quotesCarousel = document.getElementById('quotes-carousel');
    if (!quotesCarousel) return;
    
    const quotes = quotesCarousel.querySelectorAll('.quote');
    let currentQuote = 0;
    
    function showQuote(index) {
        quotes.forEach((quote, i) => {
            quote.classList.toggle('active', i === index);
        });
    }
    
    function nextQuote() {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    }
    
    // Auto-advance every 5 seconds
    if (quotes.length > 1) {
        setInterval(nextQuote, 5000);
    }
    
    // Add pause on hover
    quotesCarousel.addEventListener('mouseenter', function() {
        quotesCarousel.style.animationPlayState = 'paused';
    });
    
    quotesCarousel.addEventListener('mouseleave', function() {
        quotesCarousel.style.animationPlayState = 'running';
    });
}

/**
 * Event filters functionality
 */
function initEventFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter events
            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                card.style.display = shouldShow ? 'flex' : 'none';
                
                // Animate the transition
                if (shouldShow) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        });
    });
}

/**
 * Modal functionality
 */
function initModals() {
    const modalTriggers = document.querySelectorAll('[href="#readiness-checklist"]');
    const modal = document.getElementById('readiness-checklist');
    const modalClose = modal?.querySelector('.modal-close');
    
    if (!modal) return;
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(modal);
        });
    });
    
    // Close modal
    modalClose?.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
    
    function openModal(modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

/**
 * Form handling
 */
function initForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(this);
        });
    }
    
    // Checklist form
    const checklistForm = document.getElementById('checklist-form');
    if (checklistForm) {
        checklistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleChecklistSubmit(this);
        });
    }
    
    // Add calendar buttons
    const addCalendarBtns = document.querySelectorAll('.add-calendar');
    addCalendarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            generateCalendarFile(eventId);
        });
    });
}

function handleNewsletterSubmit(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! Welcome to our community of changemakers.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track subscription
        trackEvent('newsletter_subscribe', { email: email });
    }, 1000);
}

function handleChecklistSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Generating...';
    submitBtn.disabled = true;
    
    // Simulate API call and file generation
    setTimeout(() => {
        // Close modal
        const modal = form.closest('.modal');
        closeModal(modal);
        
        // Trigger download
        downloadFile('heat-readiness-checklist.pdf');
        
        showNotification('Your Heat Readiness Checklist has been downloaded!', 'success');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track download
        trackEvent('checklist_download', data);
    }, 1500);
}

function generateCalendarFile(eventId) {
    // Sample event data - in real implementation, this would come from your events API
    const events = {
        'summit-2025': {
            title: 'Urban Heat Resilience Summit 2025',
            start: '2025-06-15T09:00:00',
            end: '2025-06-15T17:00:00',
            location: 'New Delhi, India',
            description: 'India\'s premier summit on urban heat resilience'
        },
        'who-webinar': {
            title: 'Heat-Health Early Warning Systems',
            start: '2025-06-22T14:00:00',
            end: '2025-06-22T15:30:00',
            location: 'Online',
            description: 'WHO webinar on heat-health early warning systems'
        }
    };
    
    const event = events[eventId];
    if (!event) return;
    
    // Generate ICS content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BeatTheHeat//EN
BEGIN:VEVENT
UID:${eventId}@beattheheat.global
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start.replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${event.end.replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
    
    // Download ICS file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventId}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Event added to calendar!', 'success');
}

/**
 * Scroll animations
 */
function initScrollAnimations() {
    // Fade in on scroll
    const fadeElements = document.querySelectorAll('.ecosystem-tile, .impact-card, .event-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Parallax for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        });
    }
}

/**
 * Accessibility enhancements
 */
function initAccessibility() {
    // Focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            modal.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const ribbonHeight = document.querySelector('.heat-ribbon').offsetHeight;
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - ribbonHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update focus for screen readers
                target.focus();
            }
        });
    });
    
    // Announce dynamic content changes
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    window.announce = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

/**
 * Utility functions
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div class="alert-content">
            <p class="alert-message">${message}</p>
        </div>
        <button class="alert-dismiss" aria-label="Dismiss notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Manual dismiss
    notification.querySelector('.alert-dismiss').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function downloadFile(filename) {
    // Simulate file download - replace with actual file URL
    const link = document.createElement('a');
    link.href = `assets/downloads/${filename}`;
    link.download = filename;
    link.click();
}

function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/**
 * Analytics and tracking
 */
function trackEvent(eventName, data = {}) {
    // Integration point for analytics (Google Analytics, Mixpanel, etc.)
    console.log('Track Event:', eventName, data);
    
    // Example Google Analytics integration:
    // gtag('event', eventName, data);
    
    // Example custom analytics:
    // analytics.track(eventName, data);
}

// Track page interactions
document.addEventListener('click', function(e) {
    const element = e.target.closest('[data-track]');
    if (element) {
        const trackingData = element.getAttribute('data-track');
        trackEvent('click', { element: trackingData, url: window.location.href });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Report page load performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load', { load_time: loadTime });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno
    });
});

// Export for use in other files
window.BeatTheHeat = {
    trackEvent,
    showNotification,
    announce: window.announce
};
