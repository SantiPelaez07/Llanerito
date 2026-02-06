const toggle = document.querySelector(".toggle-icon");
const menu = document.querySelector(".options");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
});