/*here we have all the code required for
the operation of the entire purchase process
on this site... */
//constantes globales...
const mainCont = document.getElementById('mainCont');
//this is the cont of the products in the shopping cart...
const shoppingPre = document.querySelector('.main_cart');
//all the shopping cart...
const shoppingCont = document.querySelector('.shopping_cart_cont');
//DELATE ALL BTN
const delateAll = document.querySelector(".delate_all_btn");
//btn buy...
const btnBuy = document.querySelector('.buy_btn');
//counters...
const counter1 = document.querySelector('.conter');
const counter2 = document.getElementById('n');
//the transition section...
const loadingSection = document.querySelector('.loading_cont_all');
//search input...
const searchInput = document.getElementById('searchInput');
//link to return to "inicio"...
const inicio = document.getElementById('inicio');
//icon cart...
const shoppingCartIcon = document.getElementById('carrito');

//variables globales
var cart = [];
var bill = [];

//functios...
let funciones = {
    ShoppingCartProduct: () => {
        shoppingPre.innerHTML = ''; 
        cart.forEach(dato => {
            const htmlProduct = `<div class="producto">
                <div class="img_cont_pro">
                    <img src="${dato.producto.img}" alt="producto">
                </div>
                <div class="info_pro">
                    <div class="descripcion">
                        <span>${dato.producto.Descriptcion}</span>
                    </div>
                    <div class="precio_btn_cont">
                        <div class="precio">
                            <span>Precio por unidad: $${dato.producto.Precio}</span>
                            <span>Total X producto: ${dato.total}</span>
                        </div>
                        <div class="btn_eliminar_cont">
                            <button id="eliminar" class="btnDelateProduct">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>`;

            shoppingPre.insertAdjacentHTML('beforeend', htmlProduct);
        });
        //we update the counters...
        let count = 0; 
        //we check how much products we have in the cart...
        cart.forEach(item => {
            count += item.cantidad;
        })

        if(count === 1){
            counter1.textContent = count + ' producto';
        } else if(count > 1){
            counter1.textContent = count + ' productos';
        } else if(count === 0){
            counter1.textContent = count + ' carrito    ';
        }
        counter2.textContent = count;

        //btn delate a specific product...
        const btnsDelate = shoppingPre.querySelectorAll('.btnDelateProduct');
        /*this btn delate a specific product of the shopping cart...*/
        btnsDelate.forEach((boton, index) => {
            boton.addEventListener('click', () => {
                cart.splice(index, 1);
                funciones.ShoppingCartProduct();
            });
        })
    }, 
    paymentZone: (total) => {
        //we eares what already exits...
        mainCont.innerHTML = '';
        //the new component...
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
                                                </div>
                                                <div class="terms">
                                                    <select name="terms" id="terms">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <form method="post" id="formulario">
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
                                                <button class="comprar" type="submit">Pagar</button>
                                                <button class="cancelar" id="cancelar">Cancelar</button>
                                            </div>
                                        </form>
                                    </article>`;
        mainCont.insertAdjacentHTML('beforeend', paymentZone);
        /*we make the function to print the products
        and the total of the purcharse...*/
        const purcharseSection = () => {
            const purcharseCont = document.querySelector('.products_conteiner');
            const totalSection = document.querySelector('.total');
            //section where we can see all the products that we
            //choose...
            cart.forEach(item => {
                const purchaseProducts = `<div class="info_compras">
                                            <div class="img_producto">
                                                <img src="${item.producto.img}" alt="${item.producto.title}">
                                            </div>
                                            <div class="informacion_cantidad">
                                                <div class="info">
                                                    <span>${item.producto.Descriptcion}</span>
                                                </div>
                                                <div class="cantidad">
                                                    <span>${item.total}</span>
                                                </div>
                                            </div>
                                        </div>`;
                purcharseCont.insertAdjacentHTML('beforeend', purchaseProducts);
            });

            //the total...
            let numbersStr = Number(total).toString(); 
            if(numbersStr.length > 3){
                numbersStr = numbersStr.slice(0, -3) + ',' + numbersStr.slice(-3);
            }
            totalSection.insertAdjacentHTML('beforeend', `<span>Total del pedido: ${'$' + numbersStr}</span>`);

            //interest-free months
            const selectMonthsInterestFree = document.getElementById('terms');
            let monthsPayment = [];
            let q = 3;
            //we calculate interest-free months... 
            for(let i = 0; i <= 3; i++){
                if(i === 0){
                    monthsPayment[i] = '';
                }else{
                    monthsPayment[i] = (total/q).toFixed(2);
                    //then the term is increased, from 3 to 6 and from 6 to 12...
                    q *= 2;
                }
            }
            /*now we show in the select the options of interest-free months... */
            monthsPayment.forEach((month, index) => {
                if(index === 0){
                    selectMonthsInterestFree.insertAdjacentHTML("beforeend", `<option value="${q}">Sin meses</option>`);
                    q = 3;
                }else{
                    selectMonthsInterestFree.insertAdjacentHTML("beforeend", `<option value="${q}">${q + ' meses de: ' + month}</option>`);
                    q *= 2;
                }
            })
        }
        purcharseSection();

        /*we need to work with the inputs, labels and the btn comprar (buy) of the form to make its 
        validation...*/
        const form = document.getElementById('formulario');
        const inputs = form.querySelectorAll('input');
        const labels = form.querySelectorAll('label');
        //btnBuy...
        const btnComprar = form.querySelector('.comprar') ;
        //btnCancell...
        const btnCancell = form.querySelector('.cancelar');
        //we send the required information to the validator function...
        inputs.forEach(input => {
            input.addEventListener('keyup', (e) => {
                funciones.validator(e.target, labels, e, btnComprar);
            })
        }); 

        //here is the code of the pay btn...
        btnComprar.addEventListener('click', (e) => {
            let empty = false; /*this variable is for cheking if any of
            the inputs is empty...*/

            inputs.forEach(input => {
                //check if any input is empty...
                if(input.value === ""){
                    input.id = 'warning_inputs';
                    input.placeholder = 'No puede estar vacio';
                    empty = true; 
                }
            });

            // If the email input is not empty, we have to check that its content is correct
            emailValidator(inputs[8], labels[2], e);

            // If any of the inputs is empty, we prevent the default action of the button and don't send anything
            if (empty) {
                e.preventDefault();
                btnComprar.id = 'warning_btn';
            } else { // If everything is okay, we send the information
                btnComprar.id = '';
                form.action = 'php/sendEmail.php';
            }
        });
        //here is the code of the cancel btn...
        btnCancell.addEventListener('click', (e) => {
            mainCont.innerHTML = '';
            setTimeout(() => {
                tienda.printProducts(tienda.products());
            }, 100)
        })
    }, 
    /*here is the input validation code... */
    //1. first, regular expressions...
    regularExp: {
        /*this regular expression is used for inputs that must contain
        only first name, last name, state, city, neighborhood and 
        street (only letters)...*/
        onlyLetters: /^[a-zA-Z][a-zA-Z\s]*$/,
        //zip code and cvc...
        onlyNumbers: /^\d+$/, 
        //house number...
        houseNumber: /^[a-zA-Z0-9]+$/, 
        //email...
        email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
        // 16-digit credit/debit card number...
        cardNumber: /^[0-9-]+$/,
        //expiration date of the credit/debit card...
        expirationmDate: /^[0-9/]+$/, 
        //cell phone number...
        phone: /^[0-9]+(-[0-9]+)*$/
    },
    /*2. function that gives us a card format in the input
    example: 123-456-789-123-4568*/
    cardNumberFormat: (input) => {
        let str = input.value;

        const groups = str.match(/\d{1,4}/g);

        if (groups && groups.length > 1) {
            const lastGroup = groups.pop();

            if (lastGroup && lastGroup.length === 1) {
                groups.push(lastGroup);
            } else {
                if (lastGroup) {
                    groups.push(lastGroup);
                }
                input.value = groups.join('-');
                return; //we stop the process...
            }
        }

        input.value = str; //default...
    },
    /*3. the following function helps us to set the format
    of the expiration date of a card... 12/12 */
    expirationDate: (input, key) => {
        const str = input.value;

        if (key.key !== 'Backspace') {
            if (/^\d{2}$/.test(str)) {
                const firstHalf = str.slice(0, 2);
                const secondHalf = str.slice(2);
                input.value = firstHalf + '/' + secondHalf;
            }
        }
    },
    /*4. we separate the phone numbers with a hyphen, 
    the digits are separated by two...*/
    phoneFormat: (input, key) => {
        const str = input.value; // Store the value of the input field in a variable 'str'

        if (key.key !== 'Backspace') { // Check if the key pressed is not 'Backspace'
            const phoneNumber = str.replace(/\D/g, ''); // Remove non-digits from the input string

            let formattedNumber = ''; // Initialize a variable to store the formatted phone number
            const chunkSizes = [2, 2, 2, 2, 2]; // Define an array containing chunk sizes for the phone number

            let index = 0; // Initialize the index for extracting chunks from the phone number
            for (const size of chunkSizes) { // Iterate through each chunk size
                const chunk = phoneNumber.substr(index, size); // Extract a chunk of the specified size from the phone number
                if (chunk) { // Check if the chunk is not empty
                    formattedNumber += chunk + '-'; // Append the chunk followed by a hyphen to the formatted number
                }
                index += size; // Move the index to the start of the next chunk
            }

            formattedNumber = formattedNumber.slice(0, -1); // Remove the last hyphen from the formatted number

            input.value = formattedNumber; // Set the input value to the formatted phone number
        }
    },
    /*5. we validate that the email has a valid format when
    we click on the pay button, if the format is not valid 
    you won't be able to make the purchase action, but that 
    code is somewhere else...*/
    emailValidator: (input, labels, btn) => {
        if (funciones.regularExp.email.test(input.value)) { // Check if the input value matches the email regular expression
            input.style.backgroundColor = ''; // Reset the background color of the input field
            input.style.transition = 'all 250ms'; // Apply transition to the input field
            input.style.width = ''; // Reset the width of the input field
            labels.textContent = 'Correo'; // Change the label text to 'Correo'
            btn.target.id = ''; // Reset the id of the target button
        } else {
            input.style.backgroundColor = 'red'; // Set the background color of the input field to red
            input.style.transition = 'all 250ms'; // Apply transition to the input field
            input.style.width = '90%'; // Set the width of the input field
            labels.textContent = 'Ingrese un formato valido'; // Change the label text to 'Ingrese un formato valido'
            btn.preventDefault(); // Prevent the default action of the button
            btn.target.id = 'warning_btn'; // Set the id of the target button to 'warning_btn'
            setTimeout(() => {
                input.value = ''; // Clear the value of the input field after 2 seconds
            }, 2000);
        }
    },
    /*6. here is everything to validate all the other inputs,
    these are validate with a key up listener...*/
    validator: (input, labels, event, btn) => {
        switch (input.name) {
            //this is the datos personales (personal information) zone
            case 'nombre':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.width = ''
                    input.style.transition = 'all 250ms'
                    labels[0].textContent = 'Nombre(s)';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.width = '90%'
                    input.style.transition = 'all 250ms'
                    labels[0].textContent = 'Ingrese solo letras';
                    btn.style.display = 'none';
                }
            break;
            case 'apellidos':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.width = ''
                    input.style.transition = 'all 250ms'
                    labels[1].textContent = 'Apellidos';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.width = '90%'
                    input.style.transition = 'all 250ms'
                    labels[1].textContent = 'Ingrese solo letras';
                    btn.style.display = 'none';
                }
            break;
            //here we are in the direccion de envio (shipping address) zone...
            case 'stado':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.placeholder = 'Ingrese estado';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    btn.style.display = 'none';
                    setTimeout(function(){
                        input.value = '';
                        input.placeholder = 'Ingrese solo letras';
                    }, 1000);
                }
            break;
            case 'ciudad':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.placeholder = 'Ingrese ciudad';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms';
                    btn.style.display = 'none';
                    setTimeout(function(){
                        input.value = '';
                        input.placeholder = 'Ingrese solo letras';
                    }, 1000);
                }
            break;
            case 'colonia':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.placeholder = 'Ingrese colonia';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms';
                    btn.style.display = 'none';
                    setTimeout(function(){
                        input.value = '';
                        input.placeholder = 'Ingrese solo letras';
                    }, 1000);
                }
            break;
            case 'calle':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.placeholder = 'Ingrese calle';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms';
                    btn.style.display = 'none';
                    setTimeout(function(){
                        input.value = '';
                        input.placeholder = 'Ingrese solo letras';
                    }, 1000);
                }
            break;
            case 'numero':
                if(funciones.regularExp.houseNumber.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.placeholder = 'Ingrese calle';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms';
                    btn.style.display = 'none';
                    setTimeout(function(){
                        input.value = '';
                        input.placeholder = 'Ingrese un formato valido (eje: 256 or 256A)';
                    }, 1000);
                }
            break;
            case 'CP':
                if(funciones.regularExp.onlyNumbers.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.placeholder = 'Ingrese C.P.';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms';
                    btn.style.display = 'none';
                    setTimeout(function(){
                        input.value = '';
                        input.placeholder = 'Ingrese solo numeros';
                    }, 1000);
                }
            break;
            //here we are in the phone section...
            /*The email is checked int the action of the
            buy button , it is better to check there if 
            the format is correct*/
            case 'phone':
                if(funciones.regularExp.phone.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[3].textContent = 'Telefono';
                    btn.style.display = '';
                    phone(input, event);
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[3].textContent = 'Ingrese un numero valido';
                    btn.style.display = 'none';
                }
            break;
            //we are in the payment method section...
            case 'numeros':
                if(funciones.regularExp.cardNumber.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[4].textContent = 'Numeros de la tarjeta (16)';
                    btn.style.display = '';
                    cardNumberFormat(input);
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[4].textContent = 'Ingrese solo numeros';
                    btn.style.display = 'none';
                }
            break;
            case 'dueño':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[5].textContent = 'Nombre de la tarjeta';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[5].textContent = 'Ingrese solo letras';
                    btn.style.display = 'none';
                }
            break;
            case 'vence':
                if(funciones.regularExp.expirationmDate.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[6].textContent = 'Fecha de vencimiento';
                    btn.style.display = '';
                    expirationmDate(input, event);
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[6].textContent = 'Ingrese solo numeros';
                    btn.style.display = 'none';
                }
            break;
            case 'cvc':
                if(funciones.regularExp.onlyNumbers.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[7].textContent = 'CVC';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[7].textContent = 'Ingrese solo numeros';
                    btn.style.display = 'none';
                }
            break;
        }
    }
}

let tienda = {
    products: async () => {
        try {
            const url = 'https://ramedina98.github.io/api_nat/tienda.json';
            //const url = '../tienda.json';
            const response = await fetch(url);
            const data = await response.json();

            return data.productos;
        } catch (error) {
            console.log(error);
            return []; // O retorna un valor por defecto en caso de error
        }
    }, 
    addCart: async (id, amount) => {
        //we get the products...
        const products = await tienda.products();
        //we get the rigth product...
        let product = products[id]; 
        //we verify that if the product alrredy exit in the array...
        var itemExists = cart.find(item => item.producto.id === product.id);

        if (itemExists) {
            //we update the amoun if the product already exist...
            for(let i = 0; i < cart.length; i++){
                if(cart[i].producto.id === itemExists.producto.id){
                    cart[i].cantidad += amount;
                    cart[i].total = cart[i].cantidad + ' X $' + (cart[i].producto.Precio * cart[i].cantidad)
                }
            }
        } else {
            // we add the product if it doesn't exist...
            console.log('no existe')
            cart.push({
                "id": cart.length + 1,
                "cantidad": amount,
                "total": 1 + ' X $' + product.Precio,
                "producto": product
            });
        }
        //here we print the elements in the shopping cart...
        funciones.ShoppingCartProduct();
    }, 
    printProducts: async (data) => {
        try {
            const products = await data;
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
    ticket: () => {
        //what's the total??...
        let total = 0; 
        cart.forEach(item => {
            total += item.cantidad * item.producto.Precio
        });

        return total;
    }, 
    payTicket: () => {}
}

tienda.printProducts(tienda.products());


/*here we listen if you click on the product btn to add
it to the shopping cart... */
mainCont.addEventListener('click',(event) => {
    if (event.target.classList.contains('productoBtn')) {
        const section = event.target.closest('section');
        const id = section.querySelector('input[type="text"]').value;

        console.log('id del boton: '+ id);

        tienda.addCart((id - 1), 1);
    }
}); 
//return to the begining...
inicio.addEventListener('click', (e) => {
    e.preventDefault();
    mainCont.innerHTML = '';
    setTimeout(() => {
        tienda.printProducts(tienda.products());
    }, 100);
})
/*this function is to delate all the products in the
shopping cart...*/
delateAll.addEventListener('click', (e) => {
    e.preventDefault();
    mainContPorducts.innerHTML = "";
    conterOfproducts.textContent = '0';
    headerConter.textContent = '0 carrito';
    cart = [];
});
/*if the shopping cart is empty, when you click on it 
the buy button will vibrate and it will turn red only, 
but if the shopping cart is full we will go to the payment section,
where we will see what we will buy, monts witout interest if we want and
a form for shipping and payment information online...*/
btnBuy.addEventListener('click', (e) => {
    e.preventDefault();
    if(cart.length > 0){
        //if it already had the id we removed the id...
        btnBuy.id = '';
        //we begin the transition...
        loadingSection.style.display = 'flex';
        //we close the shopping cart...
        shoppingCont.style.display = 'none';
        //we chance from close to cart icon...
        shoppingCartIcon.className = 'bx bxs-cart-alt';
        //the top Scroll must be 0...
        window.scrollTo(0,0);
        //we add the form...
        funciones.paymentZone(tienda.ticket());
        //we end the transition...
        setTimeout(() => {
            loadingSection.style.display = 'none';
        }, 3000);
    }else{
        btnBuy.id = 'warning_btn';
        setTimeout(() => {
            btnBuy.id = '';
        }, 2000);
    }
});
/*here let's enable the product search by typing in the search input
located in the header on the right side...*/
searchInput.addEventListener('keyup', async (event) => {
    let searchText = event.target.value.toLowerCase();
    try {
        let products = await tienda.products(); // Obtener los productos de forma asíncrona
        let filterData = products.filter((item) => {
            return item.Descriptcion.toLowerCase().includes(searchText);
        });

        mainCont.innerHTML = '';
        tienda.printProducts(filterData);
    } catch (error) {
        console.log(error);
    }
})
/*here we listen when you click on the X, icon that helps us
to delete everything from the search input...*/
document.addEventListener('input', (event) => {
    if(event.target && event.target.matches('input[type="search"]')){
        if(event.target.value === ''){
            //we reprint all the products...
            tienda.printProducts(tienda.products());
        }
    }
});