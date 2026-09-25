// Navigation remains available when JavaScript is disabled.
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
const mobileViewport = window.matchMedia('(max-width: 768px)');

if (menuToggle && navList) {
    const setMenuOpen = (open) => {
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        navList.classList.toggle('active', open);
    };

    menuToggle.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navList.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;
        setMenuOpen(false);
        // Move focus with the navigation so it never remains inside a hidden menu.
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('#mobile-menu') && !event.target.closest('#nav-list')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('focusin', (event) => {
        if (!navList.contains(event.target) && !menuToggle.contains(event.target)) setMenuOpen(false);
    });

    mobileViewport.addEventListener('change', () => {
        if (mobileViewport.matches && navList.contains(document.activeElement)) menuToggle.focus();
        if (!mobileViewport.matches && document.activeElement === menuToggle) navList.querySelector('a').focus();
        setMenuOpen(false);
    });

    document.documentElement.classList.add('js');
    menuToggle.hidden = false;
}
