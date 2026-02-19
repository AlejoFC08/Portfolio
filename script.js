// ==========================================
// 1. LÓGICA DEL MENÚ HAMBURGUESA
// ==========================================
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('nav ul.nav-list');

// Alternar el menú
menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Cerrar si clic afuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('#mobile-menu') && !e.target.closest('.nav-list')) {
        navList.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// ==========================================
// 2. LÓGICA DE SCROLL SUAVE (Smooth Scroll)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el salto brusco automático

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculamos la posición restando la altura de tu header (aprox 80px)
            // para que el título no quede tapado por la barra de navegación.
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ==========================================
// 3. INICIALIZACIÓN DE ANIMACIONES AOS
// ==========================================
// Usamos DOMContentLoaded para asegurarnos de que el HTML haya cargado 
// antes de inicializar los efectos visuales.
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000, // Duración de la animación (1 segundo)
        once: true,     // La animación solo ocurre la primera vez que haces scroll
        offset: 100     // Distancia de scroll antes de que empiece a animar
    });
});