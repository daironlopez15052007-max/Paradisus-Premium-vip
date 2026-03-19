// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('.section');
const reservaForm = document.getElementById('reserva-form');

// ===== STICKY HEADER (GLASSMORPHISM ON SCROLL) =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU TOGGLE (MOBILE) =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Optional: change icon
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1); // remove '#'
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== INTERSECTION OBSERVER (FADE-IN EFFECT) =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after first time to improve performance
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 }); // Trigger when 20% of the section is visible

sections.forEach(section => {
    observer.observe(section);
});

// ===== FORM VALIDATION & WHATSAPP SUBMIT =====
reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const nombre = document.getElementById('nombre').value.trim();
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;

    // Basic validation
    if (!nombre || !fecha || !personas) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (parseInt(personas) < 1) {
        alert('El número de personas debe ser al menos 1.');
        return;
    }

    // Format date to a more readable format (optional)
    const fechaObj = new Date(fecha);
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    // Construct WhatsApp message
    const mensaje = `Hola, quisiera reservar una mesa para ${nombre} el ${fechaFormateada} para ${personas} personas.`;
    const numero = '5352548717'; // Without '+'
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    // Open WhatsApp
    window.open(url, '_blank');
});

// ===== CLOSE HAMBURGER MENU WHEN CLICKING OUTSIDE (OPTIONAL) =====
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===== SET MIN DATE IN DATE INPUT TO TODAY =====
const today = new Date().toISOString().split('T')[0];
document.getElementById('fecha').setAttribute('min', today);