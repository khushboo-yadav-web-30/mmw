// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHeaderScroll();
    initProductFilters();
    initWhatsAppWidget();
    initBackToTop();
    initCounters();
    initForms();
    initSmoothScroll();
    initActiveNavigation();
    initHeroVideo();
    initHeroShrink();
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        el.style.opacity = '0';
        if (el.classList.contains('fade-in-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('fade-in-left')) {
            el.style.transform = 'translateX(-50px)';
        } else if (el.classList.contains('fade-in-right')) {
            el.style.transform = 'translateX(50px)';
        }
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// PRODUCT FILTERS
// ========================================
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            const filterValue = button.getAttribute('data-filter');
            
            productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Product Modal
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const productIndex = button.getAttribute('data-product');
            
            // Product data
            const products = [
                {
                    title: 'Single Facer Corrugation Machine',
                    category: 'Corrugation',
                    image: 'https://images.unsplash.com/photo-1757080497801-f41011b9b56c?w=600',
                    description: 'High-speed single facer for corrugated board production with advanced automation and precision control.',
                    features: [
                        'Automatic tension control',
                        'Digital speed display',
                        'Energy efficient operation'
                    ]
                },
                {
                    title: 'Paper Slitting Machine',
                    category: 'Cutting & Slitting',
                    image: 'https://images.unsplash.com/photo-1630327722923-5ebd594ddda9?w=600',
                    description: 'Precision slitting for paper and flexible packaging materials with multiple blade options.',
                    features: [
                        'Precision cutting technology',
                        'Multiple blade configurations',
                        'Easy setup and operation'
                    ]
                },
                {
                    title: 'Automatic Rewinding Machine',
                    category: 'Rewinding',
                    image: 'https://images.unsplash.com/photo-1730584475392-b633246fd486?w=600',
                    description: 'Fully automated rewinding system with precision control and high productivity.',
                    features: [
                        'Automatic core loading',
                        'Tension monitoring system',
                        'High productivity output'
                    ]
                },
                {
                    title: 'Sheet Cutting Machine',
                    category: 'Paper Cutting',
                    image: 'https://images.unsplash.com/photo-1712319164119-16a640291082?w=600',
                    description: 'Industrial sheet cutting with advanced automation and safety features.',
                    features: [
                        'Programmable cutting patterns',
                        'Safety sensor system',
                        'Low maintenance design'
                    ]
                }
            ];

            const product = products[productIndex];
            if (product) {
                document.getElementById('modalProductTitle').textContent = product.title;
                document.getElementById('modalProductImage').src = product.image;
                document.getElementById('modalProductImage').alt = product.title;
                document.getElementById('modalProductCategory').textContent = product.category;
                document.getElementById('modalProductDescription').textContent = product.description;
                
                const featuresList = document.getElementById('modalProductFeatures');
                featuresList.innerHTML = '';
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.innerHTML = `<div class="d-flex align-items-center gap-2"><div style="width: 6px; height: 6px; background: #DC2626; border-radius: 50%;"></div>${feature}</div>`;
                    featuresList.appendChild(li);
                });
            }
        });
    }
}

// ========================================
// WHATSAPP WIDGET
// ========================================
function initWhatsAppWidget() {
    const whatsappButton = document.getElementById('whatsappButton');
    const whatsappChat = document.getElementById('whatsappChat');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessage = document.getElementById('chatMessage');
    const quickReplies = document.querySelectorAll('.quick-reply');

    if (!whatsappButton || !whatsappChat) return;

    // Toggle chat
    whatsappButton.addEventListener('click', () => {
        whatsappChat.classList.toggle('show');
    });

    // Close chat
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            whatsappChat.classList.remove('show');
        });
    }

    // Send message
    if (sendMessage && chatMessage) {
        sendMessage.addEventListener('click', () => {
            sendWhatsAppMessage(chatMessage.value);
        });

        // Enter key to send
        chatMessage.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendWhatsAppMessage(chatMessage.value);
            }
        });
    }

    // Quick replies
    quickReplies.forEach(reply => {
        reply.addEventListener('click', () => {
            const message = reply.getAttribute('data-message');
            sendWhatsAppMessage(message);
        });
    });

    function sendWhatsAppMessage(message) {
        if (message.trim()) {
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/911234567890?text=${encodedMessage}`, '_blank');
            if (chatMessage) {
                chatMessage.value = '';
            }
            whatsappChat.classList.remove('show');
        }
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// ANIMATED COUNTERS
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ========================================
// FORM SUBMISSIONS
// ========================================
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you! We will contact you soon.');
            contactForm.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Successfully subscribed to our newsletter!');
            newsletterForm.reset();
        });
    }
}

// ========================================
// TOAST NOTIFICATION
// ========================================
function showToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    const toastElement = document.getElementById('successToast');
    
    if (toastMessage && toastElement) {
        toastMessage.textContent = message;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just # or #!
            if (href === '#' || href === '#!') {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ========================================
// ACTIVE NAVIGATION
// ========================================
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero orbs parallax
    const orb1 = document.querySelector('.hero-orb-1');
    const orb2 = document.querySelector('.hero-orb-2');
    
    if (orb1) {
        orb1.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.05}px)`;
    }
    if (orb2) {
        orb2.style.transform = `translate(${scrolled * -0.03}px, ${scrolled * -0.03}px)`;
    }
});

// ========================================
// MOUSE MOVE EFFECT (Hero Section)
// ========================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 50;
    mouseY = (e.clientY - window.innerHeight / 2) / 50;
});

function animateHeroOrbs() {
    const orb1 = document.querySelector('.hero-orb-1');
    const orb2 = document.querySelector('.hero-orb-2');
    
    if (orb1 && window.scrollY < window.innerHeight) {
        orb1.style.transform = `translate(${mouseX * 2}px, ${mouseY * 2}px)`;
    }
    if (orb2 && window.scrollY < window.innerHeight) {
        orb2.style.transform = `translate(${mouseX * -1.5}px, ${mouseY * -1.5}px)`;
    }
    
    requestAnimationFrame(animateHeroOrbs);
}

animateHeroOrbs();

// ========================================
// LAZY LOAD IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PREVENT DEFAULT FOR EMPTY LINKS
// ========================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ========================================
// PRELOADER (Optional)
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// PERFORMANCE: Debounce Function
// ========================================
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Your scroll logic here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ========================================
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (navbarToggler) {
                navbarToggler.click();
            }
        }
    });
});

// ========================================
// TESTIMONIAL CAROUSEL AUTO PLAY
// ========================================
const testimonialCarousel = document.getElementById('testimonialCarousel');
if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
        interval: 5000,
        wrap: true,
        keyboard: true
    });
}

// ========================================
// ADD ANIMATION ON SCROLL FOR STATS
// ========================================
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
                    }, index * 100);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
}

// ========================================
// CATEGORY CARDS HOVER EFFECT
// ========================================
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// PRODUCT CARDS HOVER EFFECT
// ========================================
document.querySelectorAll('.product-card').forEach(card => {
    const overlay = card.querySelector('.product-overlay');
    
    card.addEventListener('mouseenter', function() {
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c👋 Welcome to MMW Machine!', 'font-size: 20px; font-weight: bold; color: #DC2626;');
console.log('%cWebsite developed with modern technologies', 'font-size: 12px; color: #6B7280;');

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ========================================
// ACCESSIBILITY: Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // ESC key closes modals and chat
    if (e.key === 'Escape') {
        const whatsappChat = document.getElementById('whatsappChat');
        if (whatsappChat && whatsappChat.classList.contains('show')) {
            whatsappChat.classList.remove('show');
        }
    }
});

// ========================================
// FORM VALIDATION ENHANCEMENT
// ========================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    });
});

// ========================================
// COPY TO CLIPBOARD (for contact info)
// ========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ========================================
// PRINT PAGE
// ========================================
function printPage() {
    window.print();
}

// ========================================
// SHARE FUNCTIONALITY
// ========================================
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'MMW Machine',
            text: 'Check out MMW Machine - Industrial Machinery Manufacturer',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        copyToClipboard(window.location.href);
        showToast('Link copied to clipboard!');
    }
}

// ========================================
// THEME PREFERENCE (Optional)
// ========================================
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Add dark mode logic if needed
}

// ========================================
// ANALYTICS (Placeholder)
// ========================================
function trackEvent(category, action, label) {
    // Add your analytics tracking code here
    console.log('Event tracked:', category, action, label);
}

// Track page view
trackEvent('Page', 'View', window.location.pathname);

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

// ========================================
// SERVICE WORKER (Optional - for PWA)
// ========================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/service-worker.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// ========================================
// RESIZE HANDLER
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle resize events here
        console.log('Window resized');
    }, 250);
});

// ========================================
// VISIBILITY CHANGE
// ========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// ========================================
// BROWSER DETECTION (if needed)
// ========================================
const userAgent = navigator.userAgent;
const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);
const isFirefox = /Firefox/.test(userAgent);
const isEdge = /Edg/.test(userAgent);

// Add browser class to body
if (isChrome) document.body.classList.add('chrome');
if (isSafari) document.body.classList.add('safari');
if (isFirefox) document.body.classList.add('firefox');
if (isEdge) document.body.classList.add('edge');

// ========================================
// COOKIE CONSENT (Optional)
// ========================================
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        // Show cookie consent banner
        // showCookieBanner();
    }
}

// ========================================
// HERO VIDEO (Same as index_bootstrap.js)
// ========================================
function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    
    const playVideo = () => {
        video.play().catch(e => {
            console.log('Video autoplay failed:', e);
            document.addEventListener('click', () => {
                video.play().catch(console.log);
            }, { once: true });
        });
    };
    
    if (video.readyState >= 3) {
        playVideo();
    } else {
        video.addEventListener('canplay', playVideo);
    }
    
    video.style.display = 'block';
    video.style.visibility = 'visible';
    video.style.opacity = '1';
}

// ========================================
// HERO SHRINK ON SCROLL (Same as index_bootstrap.js)
// ========================================
function initHeroShrink() {
    const root = document.documentElement;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const update = () => {
        const scrollY = window.scrollY;
        const collapse = Math.max(0, Math.min(1, scrollY / 400));
        
        const newHeight = 100 - (40 * collapse);
        hero.style.height = `${newHeight}vh`;
        
        const overlapAmount = -48 - (200 * collapse);
        root.style.setProperty('--hero-overlap', `${overlapAmount}px`);
        
        const allSections = document.querySelectorAll('#categories, #products, #about, #services, #certifications, #contact');
        allSections.forEach(section => {
            section.style.marginTop = `${overlapAmount}px`;
            section.style.transition = 'margin-top 0.3s ease';
        });
        
        root.style.setProperty('--hero-collapse', String(collapse));
    };
    
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
}

// ========================================
// ENHANCED SCROLL ANIMATIONS
// ========================================
function initEnhancedScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Call enhanced scroll animations
initEnhancedScrollAnimations();

// ========================================
// LOADING ANIMATION COMPLETE
// ========================================
console.log('%c✅ All scripts loaded successfully!', 'color: #10B981; font-weight: bold;');

