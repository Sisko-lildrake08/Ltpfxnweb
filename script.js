const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        dropdown?.classList.remove('active');
    });
}

if (dropdown) {
    const dropdownLink = dropdown.querySelector('a');

    dropdownLink.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Ferme le menu mobile quand un lien est cliqué, sauf si c'est le menu Filieres
const navItems = document.querySelectorAll('.nav-links > li > a');
navItems.forEach(link => {
    link.addEventListener('click', (e) => {
        const isDropdown = e.target.closest('.dropdown');
        if (!isDropdown && navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Toggle more info for every filiere
const blurOverlay = document.querySelector('.blur-overlay');
const savoirPlusButtons = document.querySelectorAll('.btn-savoir-plus');

function closeAllMore() {
    document.querySelectorAll('.more.show').forEach(panel => panel.classList.remove('show'));
    blurOverlay?.classList.remove('active');
}

savoirPlusButtons.forEach(button => {
    const filiere = button.closest('.filiere');
    const moreDiv = filiere?.querySelector('.more');

    if (!moreDiv) return;

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllMore();
        moreDiv.classList.add('show');
        blurOverlay?.classList.add('active');
    });
});

blurOverlay?.addEventListener('click', closeAllMore);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllMore();
    }
});