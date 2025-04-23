const containerFatherCategory = document.querySelector('#categoryRestaurant');


document.addEventListener('DOMContentLoaded', () => {
    apiMainCategory();
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
            <h4>${element.name}</h4>
            <p>$ ${element.price}</p>
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
        const categoryButton = document.createElement('button')
        categoryButton.innerHTML += `
            <h4>${element.id}</h4>
            <h4>${element.name}</h4>
            <p>${element.numberProducts}</p>
        `;
        categoryButton.addEventListener('click', () => categorySelect(element.name));
        categoryCard.appendChild(categoryButton);
        containerFatherCategory.appendChild(categoryCard);

    });
    } catch(error){
        console.log("Error en el print", error)
    }
}
