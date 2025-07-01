document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    const handleHeaderScroll = () => {
        header.classList.toggle('header-scrolled', window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleHeaderScroll);

    const toggleMenu = () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active');
    };

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show-menu')) {
                toggleMenu();
            }
        });
    });

    const handleScrollActiveLink = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    };
    window.addEventListener('scroll', handleScrollActiveLink);

    const track = document.querySelector('.testimonial-carousel__track');
    if (track) {
        const slides = Array.from(track.children);
        const indicatorsNav = document.querySelector('.testimonial-carousel__nav');
        const indicators = Array.from(indicatorsNav.children);
        let currentIndex = 0;
        let autoplayInterval;

        const updateCarousel = (targetIndex) => {
            const currentSlide = slides[currentIndex];
            const targetSlide = slides[targetIndex];
            const currentIndicator = indicators[currentIndex];
            const targetIndicator = indicators[targetIndex];
            
            track.style.transform = `translateX(-${targetSlide.offsetLeft}px)`;
            currentIndicator.classList.remove('active');
            targetIndicator.classList.add('active');
            currentIndex = targetIndex;
        };

        indicatorsNav.addEventListener('click', e => {
            const targetIndicator = e.target.closest('.testimonial-carousel__indicator');
            if (!targetIndicator) return;
            const targetIndex = indicators.findIndex(dot => dot === targetIndicator);
            updateCarousel(targetIndex);
            resetAutoplay();
        });

        const autoplay = () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        };
        
        const resetAutoplay = () => {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(autoplay, 5000);
        };

        indicators[0].classList.add('active');
        autoplayInterval = setInterval(autoplay, 5000);
    }

    const revealElements = document.querySelectorAll('.hero__content > *, .event-card, .speaker-card, .timeline-item, .testimonial, .registration__form > *, .footer__col');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

});