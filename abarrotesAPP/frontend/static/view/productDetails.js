import AbstracView from "./AbstracView.js";
import { tienda } from "../javaScript/abarrotes.js";

export default class extends AbstracView{
    constructor(params){
        super(params);
        this.setTitle(params.nombre);
        this.setIcon('https://cdn-icons-png.flaticon.com/512/1440/1440500.png')
        this.productID = params.id;
    }

    async getHTML(){
        try {
            const product = await tienda.productDetails(this.productID);

            //lista de atributos del producto...
            const attributesList = product[0].productAttributes.map(item => {
                if(item.att_name === 'Garantia'){
                    return `<li><span>${item.att_name}:</span> <a href="${item.att_value}">Garantia con el probedor</a></li>`;
                }
                return `<li><span>${item.att_name}:</span> ${item.att_value}</li>`;
            }).join('');

            //function to print recommendations...
            const recommendations = async () => {
                //we get the title of the product...
                //in this way we will look for the matches...
                const category = product[0].title.toLowerCase();

                try {
                    //we get all the products...
                    let products = await tienda.products();
                    /*we filter the products and we get the matching ones... */
                    let filterData = products.filter((item) => {
                        return item.title.toLowerCase().includes(category);
                    });
                    //the information obtained is transformed into a html...
                    const titlesHTML = filterData.map(item => {
                        /*we can`t recommend the same item, so we verify 
                        that if the id matches we do not launch it... */
                        if(item.id_p !== product[0].id_p){
                            return `
                            <section class="cart_reco">
                                <a  href="/articulo/${item.title}/${item.id_p}" class="cart_reco_img_cont" data-link>
                                    <img class="product_photo" src="${item.img}">
                                    <div class="overlay"></div>
                                </a>
                                <div class="cart_reco_info_cont">
                                    <div class="price">
                                        <h3>$${item.price}</h3>
                                    </div>
                                    <div class="brand_des">
                                        <p>${item.brand}</p>
                                        <p>${item.description}</p>
                                    </div>
                                </div>
                                <input type="text" value="${item.id_p}" hidden>
                                <button class="addReco"><i class='bx bx-cart-add'></i> Agregar</button>
                            </section>
                            `;
                        }
                    }).join(''); 
                    /*if the array is empty we notice that there are no matches...*/
                    if(titlesHTML.length === 0){
                        return `<h3>No hay recomendaciones</h3>`
                    } else{
                        return titlesHTML; 
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            //function to check promotions..
            const promo = (promo) => {
                if(promo !== 0){
                    return `<div class="price_reduction"><i class='bx bx-down-arrow-alt'></i> Rebaja del ${promo}%</div>`;
                } else{
                    return `<div class="price_reduction_no">abarrotes UNEDL</div>`
                }
            };

            //function to print the correct discount of the product...
            const discount = () => {
                if (product[0].detailsOfProduct.promo !== 0) {
                    //discounted price calculation...
                    let discountedPrice = product[0].price * (1 - product[0].detailsOfProduct.promo / 100);

                    return `<p>$${discountedPrice.toFixed(2)} <span>$${product[0].price.toFixed(2)}</span></p>`;
                } else {
                    return `<p>$${product[0].price.toFixed(2)}</p>`;
                }
            };

            //function that takes the opinios from the API and
            const opinions = () => {
                if(product[0].opinions.length !== 0){
                    //the information obtained is transformed into a html...
                    const opinionsHTML = product[0].opinions.map(item => {
                        return `
                                <div class="opinion_cart">
                                    <div class="score_date">
                                        <div class="score">
                                            <div class="stars" data-rating="4"></div>
                                            <span class="rating-value">4</span>
                                        </div>
                                        <div class="date">
                                            <p>${item.fecha}</p>
                                        </div>
                                    </div>
                                    <div class="des_opinion_cart">
                                        <h3>${item.title}</h3>
                                        <p>${item.opinion}</p>
                                    </div>
                                    <div class="name_user_cart">
                                        <span>${item.name_user}</span>
                                    </div>
                                </div>
                            `;

                    }).join(''); 

                    return opinionsHTML; 
                } else{
                    return `<p>Aun no hay opiniones sobre el producto: ${product[0].description}</p>`;
                }
            }

            //starts rating...
            const starts = () => {
                return `
                    <div class="stars_slider" data-rating="0"></div>
                    <span class="rating_slider"></span>
                `
            }

            const productDetailsHTML = `
                <secition class="details_zone">
                    <div class="main_info">
                        <div class="slogan">
                            <span><i class='bx bxs-shopping-bags'></i></span>
                            <span class="text">¡Abarrotes Unedl, tu opción cercana en un click!</span>
                            <span><i class='bx bxs-mouse' ></i></span>
                        </div>
                        <div class="photos_cont">
                            <div class="side_photos">
                                <div class="photos_cont">
                                    <img src="${product[0].detailsOfProduct.img.img1}">
                                </div>
                                <div class="photos_cont">
                                    <img src="${product[0].detailsOfProduct.img.img2}">
                                </div>
                                <div class="photos_cont">
                                    <img src="${product[0].detailsOfProduct.img.img3}">
                                </div>
                            </div>
                            <div class="main_photo">
                                <img src="${product[0].img}">
                            </div>
                        </div>
                        <div class="long_description">
                            <h3>${product[0].description}</h3>
                            <p>${product[0].detailsOfProduct.long_description}</p>
                        </div>
                        <div class="details">
                            <h3>Especificaciones</h3>
                            <ul>
                                ${attributesList}
                            </ul>
                        </div>
                        <div class="recommendations">
                            ${await recommendations()}
                        </div>
                        <div class="opinios_of_product">
                            ${await opinions()}
                        </div>
                        <div class="opinion">
                            <a href="/opinion/${product[0].title}/${product[0].id_p}" data-link>
                                <i class='bx bxs-edit'></i>Escribe tu opinión
                            </a>
                        </div>
                    </div>

                    <!--Here we have the aside element...-->
                    <div class="sider">
                        <div class="info_cart_sider">
                            <div class="info_sider_des">
                                <div class="promos">
                                    ${promo(product[0].detailsOfProduct.promo)}
                                </div>
                                <div class="brandNdescription">
                                    <p>${product[0].brand}</p>
                                    <p>${product[0].description}</p>
                                </div>
                                <div class="score">
                                    ${starts()}
                                </div>
                                <div class="price">
                                    ${discount()}
                                </div>
                                <button class="addBtn_slider">Agregar</button>
                            </div>
                            <div class="info_sider_delivery">
                                <ul>
                                    <li>
                                        <span><i class='bx bx-package'></i></span> Envío disponible, entrega estimada 
                                        el viernes. 17 de nov a Valle de México, 07840
                                    </li>
                                    <li>
                                        <span><i class='bx bx-store-alt' ></i></span> Vendido y enviado por PCEL
                                    </li>
                                    <li>
                                        <span><i class='bx bx-rotate-left'></i></span> Devolución no disponible
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </secition>
            `;

            return productDetailsHTML;

        } catch (error) {
            console.log(error);
        }
    }
}