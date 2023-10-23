/*here i have just the basic functions to opne 
things, close things, etc...*/
const cartIcon = document.getElementById('carrito');
const shoppingPreView = document.querySelector('.shopping_cart_cont');
const delateAll = document.querySelector(".delate_all_btn");
const mainContPorducts = document.querySelector('.main_cart');
const conterOfproducts = document.getElementById('n');
const headerConter = document.querySelector('.conter');
const icon = document.querySelector('.icon i');

cartIcon.addEventListener('click', () => {
    if(shoppingPreView.style.display === 'none' || shoppingPreView.style.display === ''){
        shoppingPreView.style.display = 'flex'; 
        icon.className = 'bx bx-window-close';
    } else {
        shoppingPreView.style.display = 'none';
        icon.className = 'bx bxs-cart-alt';
    }
});

//this function is to delate all the products in the
//shopping cart...
delateAll.addEventListener('click', () => {
    mainContPorducts.innerHTML = "";
    conterOfproducts.textContent = '0';
    headerConter.textContent = '0 carrito';
});