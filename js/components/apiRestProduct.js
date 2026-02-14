const containerFatherProduct = document.querySelector('#productsRestaurant');
const buttonPagination = document.querySelector('#pagination');
let currentPage = 1;
let totalPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  apiMainProduct();
})



async function apiMainProduct(page) {
    const url = `http://localhost:8080/llanerito/api/v1/product?page=${page}&size=10`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        printMainProduct(data.content);
    }catch(error){
        console.log("Error en la respuesta de la promesa", error)
    }
}


function printMainProduct(data){  
    containerFatherProduct.innerHTML = "";
    if (!Array.isArray(data)) {
        console.error("Error: La respuesta no es un array. Contenido de data:", data);
        return;
    }
    try{ 
    data.forEach(element => {
        containerFatherProduct.innerHTML += `
        <div class="cardMain">
            <img src='${element.urlImage}'>
            <h4>${element.name}</h4>
            
            <p>$ ${element.price}</p>
        </div>
        `;
    });
    } catch(error){
        console.log("Error en el print", error)
    }
}

// Pagination
function renderPagination(){
    buttonPagination.innerHTML = '';

    for(let i = 1; i <= totalPage; i++){
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('paginationButton');

        if(i === currentPage) button.disabled = true;

        button.addEventListener('click', () => {
          currentPage = i;
          apiMainProduct(i)
        });

        buttonPagination.appendChild(button);
    }
}

apiMainProduct(currentPage);