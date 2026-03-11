const containerCards = document.querySelector('.cardsContainer');

document.addEventListener('DOMContentLoaded', apiRequestCocktails())

async function apiRequestCocktails() {
    const url = `http://localhost:8080/llanerito/api/v1/product/category?categoryName=Cocteles&page=1&size=6`;
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
        <div class="cardMain">
            <img src='${element.urlImage}'>
            <div class="infoCard">
            <div class="essencialInfo">
                <h4>${element.name}</h4>
                <p>$ ${element.price}</p>
            </div>
            <p>${element.description}</p>
            <div class="categoryInfo">
                <p>${element.category.name}</p>
                <button class="addToCart" data-id="${element.id}">Agregar</button>
            </div>
            </div>
        </div>
        `;
    });
}


