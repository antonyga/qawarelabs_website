// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    setupMobileMenu();

    // Smooth scrolling for anchor links
    setupSmoothScrolling();

    // Add scroll animations
    setupScrollAnimations();

    // Products dropdown
    setupProductsDropdown();
});

// Sets up the mobile menu toggle functionality
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('block');
        
        if (isOpen) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('block');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        });
    });
}

// Sets up smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sets up subtle animations for elements when they come into view
function setupScrollAnimations() {
    // Add the animate-on-scroll class to elements you want to animate
    const animateElements = document.querySelectorAll('.bg-gray-800');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Initial check
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        if (isInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // Check on scroll
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// Helper function to add typing effect to elements
function addTypingEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !isHidden);
        mobileMenuButton.innerHTML = isHidden 
            ? '<i class="fas fa-times text-2xl"></i>' 
            : '<i class="fas fa-bars text-2xl"></i>';
    });
});

// Theme toggle synchronization
document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-mobile')
    ];
    
    // Sync theme state from localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true';
    themeToggles.forEach(toggle => {
        if (toggle) toggle.checked = darkMode;
    });
    
    // Sync toggles with each other
    themeToggles.forEach(toggle => {
        if (!toggle) return;
        
        toggle.addEventListener('change', (e) => {
            const isDark = e.target.checked;
            themeToggles.forEach(otherToggle => {
                if (otherToggle && otherToggle !== e.target) {
                    otherToggle.checked = isDark;
                }
            });
            localStorage.setItem('darkMode', isDark);
            document.body.classList.toggle('dark', isDark);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        // Toggle mobile menu
        mobileMenu.classList.toggle('hidden');
        
        // Toggle menu icon between bars and times (x)
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Theme handling
    const htmlElement = document.documentElement;
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial theme
    if (isDarkMode) {
        htmlElement.classList.add('dark');
    }
    
    // Theme toggle handlers
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    themeToggles.forEach(toggle => {
        toggle.checked = isDarkMode;
        toggle.addEventListener('change', (e) => {
            const isDark = e.target.checked;
            htmlElement.classList.toggle('dark', isDark);
            localStorage.setItem('darkMode', isDark);
            
            // Sync other toggle
            themeToggles.forEach(t => {
                if (t !== e.target) t.checked = isDark;
            });
        });
    });
    
    // Mobile menu handling
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');

        // Update icon
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove(isHidden ? 'fa-bars' : 'fa-times');
        icon.classList.add(isHidden ? 'fa-times' : 'fa-bars');
    });
});

// Products dropdown functionality
function setupProductsDropdown() {
    // Desktop dropdown
    const dropdownToggle = document.querySelector('.products-dropdown-toggle');
    const dropdownMenu = document.querySelector('.products-dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdownMenu.classList.contains('show');
            dropdownMenu.classList.toggle('show');
            dropdownMenu.classList.toggle('hidden', isOpen);
            dropdownToggle.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.products-dropdown')) {
                dropdownMenu.classList.remove('show');
                dropdownMenu.classList.add('hidden');
                dropdownToggle.classList.remove('active');
            }
        });
    }

    // Mobile dropdown
    const mobileToggle = document.querySelector('.mobile-products-toggle');
    const mobileMenu = document.querySelector('.mobile-products-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileToggle.classList.toggle('active');
        });
    }
}