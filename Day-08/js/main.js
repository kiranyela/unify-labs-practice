document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Logic
    const mobileBtn = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            
            // Hamburger animation toggle
            mobileBtn.classList.toggle('open');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 2. Dark Mode Logic with Persistence
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    // Set initial icon based on theme
    const updateIcon = (theme) => {
        themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else {
        updateIcon('dark'); // Default
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
});