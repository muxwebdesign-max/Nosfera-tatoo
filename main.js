document.addEventListener('DOMContentLoaded', () => {

    /* --- Intersection Observer for Scroll Animations --- */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Optional: animate only once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));


    /* --- Mobile Menu Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            const isActive = mobileMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isActive);
            
            if (isActive) {
                hamburger.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`;
            } else {
                hamburger.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* --- Dynamic Navbar Background --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- GDPR Cookie Banner Logic --- */
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('accept-cookies');
    const btnReject = document.getElementById('reject-cookies');

    const cookieChoice = localStorage.getItem('nosferatu_cookie_consent');

    if (!cookieChoice) {
        // Delay showing banner slightly for aesthetics
        setTimeout(() => {
            if (cookieBanner) cookieBanner.classList.add('show');
        }, 2000);
    }

    const hideBanner = (choice) => {
        localStorage.setItem('nosferatu_cookie_consent', choice);
        cookieBanner.classList.remove('show');
    };

    if (btnAccept) {
        btnAccept.addEventListener('click', () => hideBanner('accepted'));
    }

    if (btnReject) {
        btnReject.addEventListener('click', () => hideBanner('rejected'));
    }
});
