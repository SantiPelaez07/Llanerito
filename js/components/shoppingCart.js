const informationCart = document.querySelector('.informationCart');
const containerProduct = document.querySelector('#productsRestaurant');
const x = document.querySelector('.titleCart .bx-x');

const bottonIcon = document.querySelector('.cart');
const containerCart = document.querySelector('.shoppingCart');

const cart = [];

// Funciones para gestionar el Local Storage
const cart_key = "shopping_cart";

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    syncCart()
})


function saveCart() {
    localStorage.setItem(cart_key, JSON.stringify(cart));
}

function loadCart() {
    const data = localStorage.getItem(cart_key);
    if (data) {
        const parsed = JSON.parse(data);
        cart.push(...parsed);
    }
}


//Información de la orden
const containerOrder = document.querySelector('.totalOrder');
const placeOrderButton = document.querySelector('.placeOrder');

x.addEventListener('click', () => {
    containerCart.classList.toggle("active");
})

bottonIcon.addEventListener('click', () => {
    containerCart.classList.toggle("active");
})

informationCart.addEventListener('click', (e) => {
    const btnQuantiy = e.target.closest('.btn-quantity');
    const btnDelete = e.target.closest('.btn-delete');

    if (btnQuantiy) {
        const id = Number(btnQuantiy.dataset.id);
        const change = Number(btnQuantiy.dataset.change);

        updateQuantity(id, change);
    }

    if (btnDelete) {
        const id = Number(btnDelete.dataset.id);
        removeProduct(id);
    }

})

placeOrderButton.addEventListener('click', () => {
    if (cart.length === 0) return alert('No hay productos en el carrito')
    const clientName = prompt("Ingrese su nombre")
    const clientAddress = prompt("Ingresa la dirección para envíar el domicilio")
    sendMessage(clientName, clientAddress);
})


function addProductToCart(product) {
    console.log("Producto desde shopping: ", product)
    const productInCart = cart.find(p => p.id === product.id)
    if (productInCart) {
        productInCart.quantity++;
        printCart();
        order(cart);
        printCart();
        saveCart();
        return;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    order(cart);
    syncCart()
}



function printCart() {

    const summary = order(cart)
    informationCart.innerHTML = "";
    summary.products.forEach((element, index) => {
        const html = `
            <div class="productCart">
            <p>${index + 1}</p>
                <div class="imgProduct">
                    <img src='${element.urlImage}' alt="">
                </div>
                <div class="descriptionProduct">
                    <p>${element.name}</p>
                    <p>Unidad: $${element.price}   -   Subtotal: $${element.subtotal}</p>
                </div>
                    <div class="actionsProduct">
                        <button class="btn-quantity" data-id="${element.id}" data-change="-1">
                            <i class="bx bx-minus"></i>
                        </button>

                    <p>${element.quantity}</p>

                    <button class="btn-quantity" data-id="${element.id}" data-change="1">
                        <i class="bx bx-plus"></i>
                    </button>
                </div>

                <div class="deleteProduct">
                    <button class="btn-delete" data-id="${element.id}">
                        <i class="bx bx-trash-alt"></i>
                    </button>
                </div>
            </div>
        `
        informationCart.innerHTML += html;
    });

}


function updateQuantity(id, change) {
    const product = cart.find(p => p.id === id);
    if (!product) return
    product.quantity += change;
    if (product.quantity < 1) {
        removeProduct(product.id);
        return;
    }
    order(cart);
    syncCart()
}

function removeProduct(id) {
    const indexProduct = cart.findIndex(p => p.id === id);
    if (indexProduct === -1) return
    cart.splice(indexProduct, 1);
    order(cart);
    syncCart()
}

function order(cart) {
    return cart.reduce((acc, product) => {
        const subtotal = (product.price * product.quantity);

        acc.totalPrice += subtotal;

        acc.products.push({
            ...product,
            subtotal: subtotal
        })

        return acc;

    }, {
        totalPrice: 0,
        products: []
    })
}


function printOrder() {
    const summary = order(cart)
    containerOrder.innerHTML = "";
    containerOrder.innerHTML = `
         <h6>Productos: ${summary.products.length}</h6>
         <h6>Total a pagar: $${summary.totalPrice}</h6>
     `
}



//Envío del carrito a whatsapp
function generatedMessage(clientName, clientAddress) {
    const summary = order(cart);

    let message = `*NUEVO PEDIDO*\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += ` *Cliente:* ${clientName}\n`;
    message += `*Dirección:* ${clientAddress}\n`;
    message += `━━━━━━━━━━━━━━━\n`;

    message += `*DETALLE DEL PEDIDO*\n`;
    const date = new Date().toLocaleString();
    message += `*Fecha:* ${date}\n`;

    summary.products.forEach((product, index) => {
        message += `*${index + 1}. ${product.name}*\n`;
        message += `    - Cantidad: ${product.quantity}\n`;
        message += `    - Precio unitario: $${product.price}\n`;
        message += `    - Subtotal: $${product.subtotal}\n`;
    });

    message += `━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL A PAGAR: $${summary.totalPrice}*\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;

    message += `Gracias por tu compra`;

    return message;
}


function sendMessage(clientName, clientAddress) {
    const phone = '573117673822';
    const message = generatedMessage(clientName, clientAddress);

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank")

    cart.length = 0;
    syncCart()
}

function syncCart() {
    printCart();
    printOrder();
    saveCart();
}