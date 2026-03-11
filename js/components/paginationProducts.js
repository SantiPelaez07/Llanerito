const paginationNumber = document.querySelector('#paginationNumbers');
const containerPagination = document.querySelector('#pagination');

function renderPagination(totalPages, currentPage, loadFunction) {

    const prevPageButton = document.querySelector('#prevPage');
    const nextPageButton = document.querySelector('#nextPage');

    console.log("Total pages recibidas: " + totalPages);

        // Ocultar paginación si no es necesaria
    if (totalPages === undefined) {
        containerPagination.style.display = "none";
        return;
    }

    // Mostrar paginación si hay más de una página
    containerPagination.style.display = "flex";

    paginationNumber.innerHTML = "";

    prevPageButton.onclick = () => {
        if (currentPage > 1) {
            loadFunction(currentPage - 1);
            prevPageButton.disabled = currentPage === 1;
        }
    };

    nextPageButton.onclick = () => {
        if (currentPage < totalPages) {
            loadFunction(currentPage + 1);
            nextPageButton.disabled = currentPage === totalPages;
        }
    };

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement('button');

        button.textContent = i;
        button.classList.add('paginationButton');

        if (i === currentPage) button.disabled = true;

        button.onclick = () => {
            loadFunction(i);
        };

        paginationNumber.appendChild(button);
    }
}