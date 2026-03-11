const containerFatherCategory = document.querySelector('#categoryRestaurant');

// Para controlar visualmente la categoría seleccionada


document.addEventListener('DOMContentLoaded', () => {
    apiMainCategory()
    

  })



async function apiMainCategory() {
    const url = "http://localhost:8080/llanerito/api/v1/category";
    try{
        const response = await fetch(url);
        const data = await response.json();
        printMainCategory(data.content);
        
    }catch(error){
        console.log("Error en la respuesta de la promesa", error)
    }
}

async function categorySelect(categoryName) {
    containerFatherProduct.innerHTML = ""
    const url = `http://localhost:8080/llanerito/api/v1/product/category?categoryName=${categoryName}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        totalPage = data.totalPages;
        printCategoryByName(data);
        renderPagination();
    } catch(error){
        console.log(error);
    }
}

function printCategoryByName(data){
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
}


function printMainCategory(data){  
    containerFatherCategory.innerHTML = "";
    if (!Array.isArray(data)) {
        console.error("Error: La respuesta no es un array. Contenido de data:", data);
        return;
    }
    try{ 
    data.forEach(element => {

        const categoryCard = document.createElement('div');
        categoryCard.classList.add('cardMainCategory');
        const cardMainCategory = document.createElement('cardMainCategory');
        cardMainCategory.innerHTML += `
        <div class="categoryCards">
            <input type="radio" name="category" value="${element.name}">
            <h4>${element.name}</h4>
            <p>${element.numberProducts}</p>
        </div>
        `;
        cardMainCategory.addEventListener('change', () => categorySelect(element.name));
        categoryCard.appendChild(cardMainCategory);
        containerFatherCategory.appendChild(categoryCard);

    });

    const allProducts = document.querySelectorAll('.allProducts');
    allProducts.forEach(button =>{
        button.addEventListener('click', () => {
            apiMainProduct(1);
        const checkedInput = containerFatherCategory.querySelector('input[type="radio"]:checked');
        if (checkedInput) checkedInput.checked = false;
        })
    })
 

    } catch(error){
        console.log("Error en el print", error)
    }
}
