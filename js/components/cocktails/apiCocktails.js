const containerCards = document.querySelector('.cardsContainer');

document.addEventListener('DOMContentLoaded', apiRequestCocktails())

async function apiRequestCocktails() {
    const url = `http://localhost:8080/llanerito/api/v1/product/category?categoryName=Cocteles`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        printCategoryCocktails(data);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

function printCategoryCocktails(data) {
    containerCards.innerHTML += '';
    data.forEach(element => {
        containerCards.innerHTML += `
        <div class="card">
            <h3>${element.name}</h3>
            <div class="imgCard">
                <img src="${element.urlImage}" alt="">
            </div>
            <button>Conoce más aquí</button>
        </div>
        `;
    });
}