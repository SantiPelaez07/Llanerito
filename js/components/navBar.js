const toggle = document.querySelector(".toggle-icon");
const menu = document.querySelector(".options");

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
})




// Apertura para aplicar el filtro en mobile
const filterButton = document.querySelector('.buttonFilter');
const categoryHeading = document.querySelector('.categoryHeading');
const xButton = document.querySelector('.categoryHeading .bx-x');
const allView = document.querySelectorAll('.allProducts');

if (filterButton) {
    filterButton.addEventListener('click', (event) => {
        event.stopPropagation();
        categoryHeading.classList.toggle("active");
    });
}

if (xButton) {
    xButton.addEventListener('click', () => {
        categoryHeading.classList.remove("active");
    });
}

if (categoryHeading) {
    categoryHeading.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

document.addEventListener('click', () => {
    if(categoryHeading){
        categoryHeading.classList.remove("active");
    }
});

if (categoryHeading) {
    categoryHeading.addEventListener('change', () => {
        categoryHeading.classList.remove("active");
    });
}

allView.forEach(button => {
    button.addEventListener('click', () => {
        categoryHeading.classList.remove("active");
    });
});

function initNavbar() {
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        toggle.classList.toggle("active");
    });
}