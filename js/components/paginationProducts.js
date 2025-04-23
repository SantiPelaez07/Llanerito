const buttonPagination = document.querySelector('#pagination');
let currentPage = 1;
let totalPage = 1;

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
// categorySelect(currentPage);