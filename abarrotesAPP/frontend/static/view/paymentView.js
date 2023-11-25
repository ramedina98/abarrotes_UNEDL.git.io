import AbstracView from "./AbstracView.js";
import { cart } from "../javaScript/abarrotes.js";
import { tienda } from "../javaScript/abarrotes.js";

export default class extends AbstracView{
    constructor(params){
        super(params);
        this.setTitle("pagar");
        this.setIcon("https://evidencetec.com/img/roadmap-realice-primer-pago.png");
    }

    async getHTML(){

        //desarrollar las funciones requeridas...
        /*here we have the section where the products of the
        purchase are... */
        const productsOfPurchase = () => {
            const newItems = cart.map(item => {
                return`
                    <div class="info_compras">
                        <div class="img_producto">
                            <img src="${item.producto.img}" alt="${item.producto.title}">
                        </div>
                        <div class="informacion_cantidad">
                            <div class="info">
                                <span>${item.producto.description}</span>
                            </div>
                            <div class="cantidad">
                                <span>${item.total}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            return newItems;
        }
        const totalPurchase = () => {
            return `<span>Total del pedido: ${'$' + tienda.ticket()}</span>`;
        }
        const optionsTerms = () => {
            let q = 0;
            if(tienda.ticket() > 1499){
                let monthsPayment = [];
                q = 3;
                //we calculate interest-free months... 
                for(let i = 0; i <= 3; i++){
                    if(i === 0){
                        monthsPayment[i] = '';
                    }else{
                        monthsPayment[i] = (tienda.ticket()/q).toFixed(2);
                        //then the term is increased, from 3 to 6 and from 6 to 12...
                        q *= 2;
                    }
                }
                //we create a new array with the necessary html...
                const newItems = monthsPayment.map((month, index) => {
                    if(index === 0){
                        q = 3;
                        return `<option value="${q}">Sin meses</option>`;
                    }else{
                        q *= 2;
                        return `<option value="${q}">${q + ' meses de: ' + month}</option>`;
                    }
                })

                return newItems;
            } else if(tienda.ticket() < 1500){
                return `<option value="${q}">No opción de meses</option>`
            }
        }
        
        return `
            <article class="form_payment" id="paymentZone">
                <div class="informacion_compra">
                    <!--products...-->
                    <div class="products_conteiner">
                        <!--This is the component...-->
                        ${productsOfPurchase()}
                    </div>
                    <!--Total...-->
                    <div class="total_payment_terms">
                        <div class="total">
                            ${totalPurchase()}
                        </div>
                        <div class="terms">
                            <select name="terms" id="terms">
                                ${optionsTerms()}
                            </select>
                        </div>
                    </div>
                </div>
                <form method="post" action="https://api.ejemplo.com/ruta" id="formulario">
                    <fieldset class="two_elements">
                        <legend>Datos personales</legend>
                        <div class="elements">
                            <div>
                                <label for="name">Nombre(s)</label>
                                <input type="text" name="nombre" placeholder="Ingrese su nombre completo">
                            </div>
                            <div>
                                <label for="name">Apellidos</label>
                                <input type="text" name="apellidos" placeholder="Ingrese sus apellidos">
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="direccion">
                        <legend for="direccion">Direccion de envio</legend>
                        <input type="text" name="stado" placeholder="Ingrese estado">
                        <input type="text" name="ciudad" placeholder="Ingrese ciudad">
                        <input type="text" name="colonia" placeholder="Ingrese colonia">
                        <input type="text" name="calle" placeholder="Ingrese calle">
                        <input type="text" name="numero" maxlength="6" placeholder="Ingrese numero exterior">
                        <input type="text" name="CP" maxlength="5" placeholder="Ingrese C.P.">
                    </fieldset>
                    <fieldset class="two_elements">
                        <legend>Correo y numero de contacto</legend>
                        <div class="elements">
                            <div>
                                <label for="correo">Correo</label>
                                <input type="text" name="correo" placeholder="Ingrese su correo (eje: m_12@email.com)">
                            </div>
                            <div>
                                <label for="telefono">Telefono</label>
                                <input type="text" name="phone" maxlength="14" placeholder="Ingrese su numero (eje: 3354789620)">
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="metodo_pago">
                        <legend>Métodos de pago</legend>
                        <select name="metodo" id="metodo">
                            <option value="credito">Tarjeta de credito (visa / mastercart)</option>
                            <option value="debito">Tarjeta de debito (visa / mastercart)</option>
                        </select>
                        <div class="tarjeta">
                            <div class="name_numeros">
                                <label for="numeros">Numeros de la tarjeta (16)</label>
                                <input type="text" name="numeros" maxlength="19" placeholder="Ingrese los 16 digitos de su tarjeta">
                                <label for="dueño">Nombre de la tarjetas</label>
                                <input type="text" name="dueño" placeholder="Nombre del dueño de la tarjeta">
                            </div>
                            <div class="vence">
                                <label for="vence">Fecha de vencimiento</label>
                                <input type="text" maxlength="5" name="vence" placeholder="Ingrese la fecha de vencimiento">
                            </div>
                            <div class="cvv">
                                <label for="vence">CVC</label>
                                <input type="text" name="cvc" maxlength="3" placeholder="Ingrese la fecha de vencimiento">
                            </div>
                        </div>
                    </fieldset>
                    <div class="btns">
                        <button class="comprar" type="submit" >Pagar</button>
                        <a href="/" class="cancelar" id="cancelar" data-link>Cancelar</a>
                    </div>
                </form>
            </article>
        `;
    }
}