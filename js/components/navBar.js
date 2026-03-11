const toggle = document.querySelector(".toggle-icon");
const menu = document.querySelector(".options");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
});


// Apertura para aplicar el filtro en mobile
const filterButton = document.querySelector('.buttonFilter');
const categoryHeading = document.querySelector('.categoryHeading');
const xButton = document.querySelector('.categoryHeading .bx-x');
const allView = document.querySelectorAll('.allProducts');

filterButton.addEventListener('click', (event) => {
    event.stopPropagation();
    categoryHeading.classList.toggle("active");
});

xButton.addEventListener('click', () => {
    categoryHeading.classList.remove("active");
});

categoryHeading.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener('click', () => {
    categoryHeading.classList.remove("active");
});

categoryHeading.addEventListener('change', () => {
    categoryHeading.classList.remove("active");
});

// allView.addEventListener('click', () => {
//     categoryHeading.classList.remove("active");
// });

allView.forEach(button => {
    button.addEventListener('click', () => {
        categoryHeading.classList.remove("active");
    });
});