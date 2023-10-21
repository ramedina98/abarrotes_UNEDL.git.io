/*here i have just the basic functions to opne 
things, close things, etc...*/
const cartIcon = document.getElementById('carrito');
const shoppingPreView = document.querySelector('.shopping_cart_cont');

cartIcon.addEventListener('click', () => {
    if(shoppingPreView.style.display === 'none' || shoppingPreView.style.display === ''){
        shoppingPreView.style.display = 'flex'; 
    } else {
        shoppingPreView.style.display = 'none'; 
    }
});