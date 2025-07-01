document.getElementById('nav-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('nav-menu').classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-toggle').classList.remove('active');
        document.getElementById('nav-menu').classList.remove('active');
    });
});

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const indicators = document.querySelectorAll('.testimonial-carousel__indicator');
const track = document.querySelector('.testimonial-carousel__track');

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        document.querySelector('.testimonial-carousel__indicator.active').classList.remove('active');
        indicator.classList.add('active');
        
        track.style.transform = `translateX(-${index * 33.333}%)`;
    });
});

let currentSlide = 0;
setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    document.querySelector('.testimonial-carousel__indicator.active').classList.remove('active');
    indicators[currentSlide].classList.add('active');
    track.style.transform = `translateX(-${currentSlide * 33.333}%)`;
}, 5000);

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.event-card, .speaker-card, .timeline-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);