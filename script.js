// 1. LÓGICA DEL MENÚ HAMBURGUESA (Mantenemos lo que ya tenías)
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

// 2. NUEVA LÓGICA DE SCROLL SUAVE (Solución Definitiva)
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
                behavior: "smooth" // Aquí forzamos la animación suave
            });
        }
    });
});