// Simple JavaScript for basic functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initCarousel();
    initModal();
});

// Simple navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link and position indicator
        updateActiveNav();
        updatePositionIndicator();
    });
    
    // Smooth scroll on nav click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Update which nav link is active
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// Update position indicator
function updatePositionIndicator() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollTop / documentHeight;
    
    const positionIndicator = document.getElementById('position-indicator');
    if (positionIndicator) {
        const indicatorWidth = scrollProgress * 100;
        positionIndicator.style.width = `${indicatorWidth}%`;
    }
}

// Simple carousel
function initCarousel() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
            showSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            showSlide(currentSlide);
        });
    }
    
    // Auto play
    setInterval(() => {
        currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }, 4000);
}

// Show specific slide
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[n]) slides[n].classList.add('active');
    if (indicators[n]) indicators[n].classList.add('active');
}

// Modal functionality
function initModal() {
    // Get all modals and triggers
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger, [data-modal]');
    const closeBtns = document.querySelectorAll('.close');
    
    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    // Close modal function
    function closeModal(modal) {
        modal.classList.remove('active');
    }
    
    // Add click listeners to modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
    });
    
    // Add click listeners to close buttons
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

console.log('Page loaded!');