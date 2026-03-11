const containerFatherProduct = document.querySelector('#productsRestaurant');

document.addEventListener('DOMContentLoaded', () => {
    apiMainProduct(1);
})



async function apiMainProduct(page) {
    const url = `http://localhost:8080/llanerito/api/v1/product?page=${page}&size=10`;
    try {
        const response = await fetch(url);
        const data = await response.json();
         console.log("Respuesta completa:", data);
        printMainProduct(data.content);
        let totalPage = data.totalPages;
        console.log("Total pages:", data.totalPages);
        renderPagination(totalPage, data.number + 1, apiMainProduct);
    } catch (error) {
        console.log("Error en la respuesta de la promesa", error)
    }
}


function printMainProduct(data) {
    containerFatherProduct.innerHTML = "";
    if (!Array.isArray(data)) {
        console.error("Error: La respuesta no es un array. Contenido de data:", data);
        return;
    }
    try {
        data.forEach(element => {
            containerFatherProduct.innerHTML += `
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
    } catch (error) {
        console.log("Error en el print", error)
    }
}
