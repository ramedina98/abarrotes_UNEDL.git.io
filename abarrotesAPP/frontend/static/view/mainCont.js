import AbstracView from "./AbstracView.js";
import {tienda} from "../javaScript/abarrotes.js";

export default class extends AbstracView{
    constructor(params){
        super(params);
        this.setTitle("Productos");
        this.setIcon('https://icon-library.com/images/home-delivery-icon/home-delivery-icon-7.jpg')
    }

    async getHTML(){
        try {
            const products = await tienda.products();

            const productsHtml = products.map((item) => `
                <section>
                    <a href="/articulo/${item.title}/${item.id_p}" class="img_cont" data-link>
                        <img class="photo" src="${item.img}" alt="${item.description}">
                        <div class="overlay"></div>
                    </a>
                    <div class="info_cont">
                        <div class="description">
                            <h2>${item.title}</h2>
                            <p>${item.description}</p>
                        </div>
                        <div class="precio_marca">
                            <div><span>${item.brand}</span></div>
                            <div><span>${'$' + item.price}</span></div>
                        </div>
                        <input type="text" value="${item.id_p}" hidden>
                        <button class="productoBtn"><i class='bx bx-cart-add'></i></button>
                    </div>
                </section>
            `).join('');

            return productsHtml; 

        } catch (error) {
            console.log(error.name)

            if(error.message.includes('404')){
                return `
                    <div class="main_conter">
                        <p>
                            Lamentamos profundamente las molestias por el inconveniente, 
                            estamos trabajando duro para solucionarlo...
                        </p>
                        <h1>404 Error Page #1</h1>
                        <section class="error-container">
                            <span><span>4</span></span>
                            <span>0</span>
                            <span><span>4</span></span>
                        </section>
                    </div>
                `;
            } else{
                return `
                <div class="main_conter">
                    <p>
                        Lamentamos profundamente las molestias por el inconveniente, 
                        estamos trabajando duro para solucionarlo...
                    </p>
                </div>
            `;
            }
        }
    }
}