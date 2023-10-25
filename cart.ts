//here we have all the code that makes the cart works...
//tsc shoping_cart.ts
const mainCont: HTMLElement | null = document.getElementById('mainCont');
const cart: HTMLButtonElement | null = document.querySelector('.conter');
const conter: HTMLElement | null = document.getElementById('n');
const cartCont: HTMLDivElement | null = document.querySelector('.main_cart');
const btnBuy: HTMLElement | null = document.getElementById('buy_btn');
const delateAllbtn: HTMLButtonElement | null = document.querySelector(".delate_all_btn");
const shoppingPre: HTMLElement | null = document.querySelector('.shopping_cart_cont'); 
let index:number = 0; 
var d: any[] = []; 
//this is for array products...
interface Producto {
    id: number;
    img: string;
    title: string;
    Descriptcion: string; 
    Precio: string;
    Marca: string;
}
//this is for the total bill array...
interface Total {
    id: number;
    img: string;
    title: string;
    Descriptcion: string; 
    Precio: string;
    Cantidad: string;
    Marca: string;
}

if(mainCont){
    //we add a message to know if we make click... 
    var e = 0;
    mainCont.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;

        //check if the element that we clicked on is a button...
        if(target.classList.contains('productoBtn')){
            //index... 
            let SectionIndex: number = 0;
            const sections = mainCont.querySelectorAll('section');
            const input = mainCont.querySelectorAll('input');

            for(let i = 0; i < sections.length; i++){
                if(sections[i].contains(target.parentElement)){
                    SectionIndex = i;
                    break;
                }
            }
            e++;
            if(cart !== null && conter !== null){
                cart.textContent = e + ' producto';
                conter.textContent = e.toString();
            }
            var id: number = parseInt(input[SectionIndex].value);
            agregarCarrito(id);
            delateAllbtn?.addEventListener('click', () => {
                e = 0;
                d = [];
            });
        }
    });
    function informationProcessing(products: Producto[]): Total[] {
        var total: Total[] = [];
        products.sort((a, b) => a.id - b.id);
    
        let currentId = -1;
        let totalQuantity = 0;
        let totalCost = 0;
    
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === currentId) {
                totalQuantity++; // Incrementa la cantidad
                totalCost += parseFloat(products[i].Precio); // Acumula el costo
            } else {
                // Cuando cambia el id, agrega el producto anterior
                if (currentId >= 0) {
                    total.push({
                        id: currentId,
                        img: products[i - 1].img,
                        title: products[i - 1].title,
                        Descriptcion: products[i - 1].Descriptcion,
                        Precio: totalCost.toString(),
                        Cantidad: totalQuantity.toString(),
                        Marca: products[i - 1].Marca,
                    });
                }
    
                // Establece el nuevo id y reinicia los acumuladores
                currentId = products[i].id;
                totalQuantity = 1;
                totalCost = parseFloat(products[i].Precio);
            }
    
            // Cuando llegas al último elemento, agrega el último producto
            if (i === products.length - 1) {
                total.push({
                    id: currentId,
                    img: products[i].img,
                    title: products[i].title,
                    Descriptcion: products[i].Descriptcion,
                    Precio: totalCost.toString(),
                    Cantidad: totalQuantity.toString(),
                    Marca: products[i].Marca,
                });
            }
        }
    
        return total;
    }
    function theTotalAccount(array:Total[]): number{
        var total:number = 0;
        
        for(let i = 0; i < array.length; i++){
            total += parseFloat(array[i].Precio);
        }

        return total; 
    }
    function plazos(total:number):number[]{
        var plazos:number [] =[];
        let e = 3;

        for(let i = 0; i < 4; i++){
            if(i === 0){
                plazos[i] = 0;
            }else{
                plazos[i] = parseFloat((total / e).toFixed(2));
                e = e*2;
            }
        }

        return plazos;
    }
    function ticket(productos:Producto[]): void{
        //the total bill to be paid must first be drawn up and sorted...
        var total = informationProcessing(productos);
        var amount = theTotalAccount(total);
        var meses = plazos(amount);
        setTimeout(function(){
            const amountCont = document.querySelector('.products_conteiner') as HTMLDivElement;
            const totalPedido = document.querySelector('.total span') as HTMLElement;
            const plazos = document.getElementById('terms') as HTMLElement;
            if (amountCont !== null) {
                total.forEach((item, index) => {
                    // Create a new product element
                    const productElement = document.createElement('div');
                    productElement.classList.add('info_compras'); // Add the class "info_compras"

                    // Customize the inner HTML structure using the data from the item in total
                    productElement.innerHTML = `
                        <div class="img_producto">
                            <img src="${item.img}" alt="${item.title}">
                        </div>
                        <div class="informacion_cantidad">
                            <div class="info">
                                <span>${item.Descriptcion}</span>
                            </div>
                            <div class="cantidad">
                                <span>${item.Cantidad} x $${item.Precio}</span>
                            </div>
                        </div>
                    `;
                    //Append the productElement to the amountCont...
                    amountCont.appendChild(productElement);
                })
            }
            if(totalPedido !== null){
                totalPedido.textContent = 'Total del Pedido: $' + amount;
            }
            if(plazos !== null){
                let e = 0;
                let value = '';
                meses.forEach((item, index) => {
                    const option = document.createElement('option');
                    value = e.toString();
                    option.value = value;
                    if(index === 0){
                        option.textContent = 'Sin meses';
                        e = 3;
                    }else{
                        option.textContent = value + ' meses de: $' + item.toString();
                        e *= 2;
                    }
                    plazos.appendChild(option);
                })
            }
        }, 200);

    }
    function caja(productos:Producto[]): void{
        const dato: Producto = productos[productos.length - 1];
        cartCont?.insertAdjacentHTML('beforeend', `<div class="producto">
                                                    <div class="img_cont_pro">
                                                        <img src="${dato.img}" alt="producto">
                                                    </div>
                                                    <div class="info_pro">
                                                        <div class="descripcion">
                                                            <span>${dato.Descriptcion}</span>
                                                        </div>
                                                        <div class="precio_btn_cont">
                                                            <div class="precio">
                                                                <span>Precio: $${dato.Precio}</span>
                                                            </div>
                                                            <div class="btn_eliminar_cont">
                                                                <button id="eliminar" class="btnDelateProduct">Eliminar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>`);
    }
    function agregarCarrito(pro:number): void{
        var identificador = pro; 

        let url = 'https://ramedina98.github.io/api_nat/tienda.json';
        fetch(url)
            .then(res => res.json())
            .then(data => showData(data.productos))
            .catch(error => console.log(error))

        const showData = (jsonD: any) => {
            d.push(jsonD[identificador - 1]);
            caja(d);
        }
    }
    //functions of the btn = eliminar...
    if(cartCont){
        cartCont.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if(target.classList.contains('btnDelateProduct')){
                let btnIndex: number = 0;
                const productos = cartCont.querySelectorAll('.producto');

                for(let i = 0; i < productos.length; i++){
                    if(productos[i].contains(target.parentElement)){
                        btnIndex = i;
                        break;
                    }
                }
                let producto = productos[btnIndex];
                producto.remove();
                e--; 
                if(e > 0){
                    if(cart !== null && conter !== null){
                        cart.textContent = e + ' producto';
                        conter.textContent = e.toString();
                    }
                }else{
                    if(cart !== null && conter !== null){
                        cart.textContent = e + ' carrito';
                        conter.textContent = e.toString();
                    }
                }
                //We delete the data at the corresponding index..
                if (btnIndex >= 0 && btnIndex < d.length) {
                    d.splice(btnIndex, 1);
                }
            }
        })
    }
    if(btnBuy){
        btnBuy.addEventListener('click', () => {
            if(d.length > 0){
                //empty...
                mainCont.innerHTML = '';
                //close the shopping pre cart...
                if(shoppingPre){
                    shoppingPre.style.display = 'none';
                }
                //new component...
                const paymentZone = `<article class="form_payment" id="paymentZone">
                                        <div class="informacion_compra">
                                            <!--products...-->
                                            <div class="products_conteiner">
                                                <!--This is the component...-->
                                                
                                                <!--<div class="info_compras">
                                                    <div class="img_producto">
                                                        <img src="https://res.cloudinary.com/riqra/image/upload/v1678811199/sellers/3/ca6jtcmc2skfvxrzqmsh.jpg" alt="">
                                                    </div>
                                                    <div class="informacion_cantidad">
                                                        <div class="info">
                                                            <span>Sabritas habanero 245 grs</span>
                                                        </div>
                                                        <div class="cantidad">
                                                            <span>2 x $40</span>
                                                        </div>
                                                    </div>
                                                </div>-->
                                            </div>
                                            <!--Total...-->
                                            <div class="total_payment_terms">
                                                <div class="total">
                                                    <span>Total del pedido: $0</span>
                                                </div>
                                                <div class="terms">
                                                    <select name="terms" id="terms">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <form action="">
                                            <fieldset class="two_elements">
                                                <legend>Datos personales</legend>
                                                <div class="elements">
                                                    <div>
                                                        <label for="name">Nombre(s)</label>
                                                        <input type="text" placeholder="Ingrese su nombre completo">
                                                    </div>
                                                    <div>
                                                        <label for="name">Apellidos</label>
                                                        <input type="text" placeholder="Ingrese sus apellidos">
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset class="direccion">
                                                <legend for="direccion">Direccion de envio</legend>
                                                <input type="text" placeholder="Ingrese estado">
                                                <input type="text" placeholder="Ingrese ciudad">
                                                <input type="text" placeholder="Ingrese colonia">
                                                <input type="text" placeholder="Ingrese calle">
                                                <input type="text" placeholder="Ingrese numero exterior">
                                                <input type="text" placeholder="Ingrese C.P.">
                                            </fieldset>
                                            <fieldset class="two_elements">
                                                <legend>Correo y numero de contacto</legend>
                                                <div class="elements">
                                                    <div>
                                                        <label for="correo">Correo</label>
                                                        <input type="text" placeholder="Ingrese su correo (eje: m_12@email.com)">
                                                    </div>
                                                    <div>
                                                        <label for="telefono">Telefono</label>
                                                        <input type="text" placeholder="Ingrese su numero (eje: 3354789620)">
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
                                                        <input type="text" name="numeros" placeholder="Ingrese los 16 digitos de su tarjeta">
                                                        <label for="dueño">Nombre de la tarjetas</label>
                                                        <input type="text" name="dueño" placeholder="Nombre del dueño de la tarjeta">
                                                    </div>
                                                    <div class="vence">
                                                        <label for="vence">Fecha de vencimiento</label>
                                                        <input type="text" name="vence" placeholder="Ingrese la fecha de vencimiento">
                                                    </div>
                                                    <div class="cvv">
                                                        <label for="vence">Fecha de vencimiento</label>
                                                        <input type="text" name="vence" placeholder="Ingrese la fecha de vencimiento">
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <div class="btns">
                                                <button class="comprar" type="submit">Comprar</button>
                                                <button class="cancelar" id="cancelar">Cancelar</button>
                                            </div>
                                        </form>
                                    </article>`
                //we insert this new component in the main...
                mainCont.insertAdjacentHTML('beforeend', paymentZone);
                //we call ticket function...
                ticket(d);
            }else{
                //a messages that let know the cart is empty...
            }
        })
    }
}