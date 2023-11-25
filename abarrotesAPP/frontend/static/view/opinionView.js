import AbstracView from "./AbstracView.js";
import { tienda } from "../javaScript/abarrotes.js";
export default class extends AbstracView{
    constructor(params){
        super(params);
        this.setTitle("Te escuchamos");
        this.setIcon("https://cdn-icons-png.flaticon.com/512/1436/1436584.png");
        this.productID = params.id;
    }

    async getHTML(){

        const product = await tienda.productDetails(this.productID);

        const attributesList = product[0].productAttributes.map(item => {
            if(item.att_name === 'Garantia'){
                return `<li><span>${item.att_name}:</span> <a href="${item.att_value}">Garantia con el probedor</a></li>`;
            }
            return `<li><span>${item.att_name}:</span> ${item.att_value}</li>`;
        }).join('');

        return `
            <div class="section_opinion_cont_all">
                <div class="product_to_review">
                    <div class="image_cont">
                        <img src="${product[0].img}">
                    </div>
                    <div class="info_pro">
                        <h3>${product[0].description}</h3>
                        <ul>
                            ${attributesList}
                        </ul>
                    </div>
                </div>
                <!--This form will send the infor of the user's opinion...-->
                <form id="opinionForm">
                    <div class="title_form">
                        <h3>Dinos que opinas</h3>
                    </div>
                    <div class="name_title">
                        <div>
                            <label for="name">Nombre</label>
                            <input type="text" name="name_user" id="name" placeholder="Ingrese su nombre">
                        </div>
                        <div>
                            <label for="title">Title</label>
                            <input type="text" name="title" id="title" placeholder="Titulo de su opinion">
                        </div>
                    </div>
                    <div class="score_product">
                        <div>
                            <label for="score">Puntuacion</label>
                            <input type="number" name="score" id="score" placeholder="5" max="5">
                        </div>
                        <div class="cont">
                            <span class="pro">${product[0].description}</span>
                        </div>
                    </div>
                    <div class="text_opinion">
                        <label for="message">Escriba su opinión</label>
                        <textarea id="message" name="opinion" rows="6" cols="50"></textarea>
                    </div>
                    <input id="id_product" type="number"name="id_product" value="${product[0].id_p}" hidden>
                    <div class="btns">
                        <!--is hidden-->
                        <a href="/articulo/${product[0].title}/${product[0].id_p}" class="hidden-link" data-link></a>

                        <button type="submit" class="opinion_btn">Enviar</button>
                        <a href="/articulo/${product[0].title}/${product[0].id_p}" class="regresar" data-link>Regresar</a>
                    </div>
                </form>
            </div>
        `;
    }
}