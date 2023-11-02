/*here we have all the code required for
the operation of the entire purchase process
on this site... */

//constantes globales...
const mainCont = document.getElementById('mainCont');
//
var cart = [];
var bill = [];
var total = 0; 

let tienda = {
    products: {
        display: async () => {
            try {
                const url = 'https://ramedina98.github.io/api_nat/tienda.json';
                const response = await fetch(url);
                const data = await response.json();
                tienda.products.search(data);
                return data.productos;
            } catch (error) {
                console.log(error);
                return []; // O retorna un valor por defecto en caso de error
            }
        }, 
        search: async (data) => {
            console.log(data)
        }, 
        move: async (id) => {
            let data = tienda.products.display();
            let producto = [];
        }
    }, 
    addCart: (products, amount) => {

    }, 
    printProducts: async () => {
        try {
            let products = await tienda.products.display();
            products.forEach((item) => {
                const productosHtml = `
                    <section>
                        <div class="img_cont">
                            <img src="${item.img}" alt="">
                        </div>
                        <div class="info_cont">
                            <div class="description">
                                <h2>${item.title}</h2>
                                <p>${item.Descriptcion}</p>
                            </div>
                            <div class="precio_marca">
                                <div><span>${item.Marca}</span></div>
                                <div><span>${'$' + item.Precio}</span></div>
                            </div>
                            <input type="text" value="${item.id}" hidden>
                            <button class="productoBtn"><i class='bx bx-cart-add'></i></button>
                        </div>
                    </section>
                `;
                mainCont.insertAdjacentHTML('beforeend', productosHtml);
            });
        } catch (error) {
            console.log(error);
        }
    }, 
    ticket: () => {}, 
    payTicket: () => {}
}

tienda.printProducts();

//
mainCont.addEventListener('click',(event) => {
    if (event.target.classList.contains('productoBtn')) {
        const section = event.target.closest('section');
        const id = section.querySelector('input[type="text"]').value;


        tienda.addCart()
    }
})