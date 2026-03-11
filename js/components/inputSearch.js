const inputSearch = document.querySelector('.productSearch');
let timer = 0;

inputSearch.addEventListener('input', (event) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        const value = event.target.value.trim();
        if (value === "") {
            apiMainProduct(1);
            return;
        }

        if (value.length < 2) {
            return;
        }
        searchProducts(value);
    }, 500)
})


async function searchProducts(searchName) {
    const url = `http://localhost:8080/llanerito/api/v1/product/search?name=${encodeURIComponent(searchName)}&page=1&size=10`
    try {
        const response = await fetch(url);
        const data = await response.json();
        printMainProduct(data);
        renderPagination(data.totalPages, data.number + 1, (page) => searchProducts(searchName, page))
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}