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
//icon cart...
const shoppingCartIcon = document.getElementById('carrito');
/*this constant contais the div where we will print a message indicating
to the buyer that a confirmation email will be sent, being the transition 
to return to the main page... */
const messageEmailSent = document.querySelector('.text_message_cont'); 
const backToMainPageTransition = document.querySelector('.back_to_the_main_cont');

//variables globales
var cart = [];
export {cart};


//functios...
const funciones = {
    ShoppingCartProduct: () => {
        shoppingPre.innerHTML = ''; 
        cart.forEach(dato => {
            const htmlProduct = `<div class="producto">
                <div class="img_cont_pro">
                    <img src="${dato.producto.img}" alt="producto">
                </div>
                <div class="info_pro">
                    <div class="descripcion">
                        <span>${dato.producto.description}</span>
                    </div>
                    <div class="precio_btn_cont">
                        <div class="precio">
                            <span>Precio por unidad: $${dato.producto.price}</span>
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
    moreDetailsView: (product) => {

        document.getElementById('searchInput').value = '';
        document.getElementById('searchInput').disabled = true;
        window.scrollTo({
            top: 0, 
            behavior:'instant'
        })
        /*Section of funtions necessary for the correct 
        operation of all the elements of the section more details... */

        //this function is to give the slider its correct movement...
        const slider = document.querySelector('.info_cart_sider');
        window.addEventListener('scroll', () => {
            //this is to know what is the scroll value...
            let currentScroll =  window.pageYOffset || document.documentElement.scrollTop;
            
            if(currentScroll > 67.4 && currentScroll < 1217){
                slider.style.position = 'fixed';
                slider.style.top = '60px';
                slider.style.display = '';
            }else{
                if(currentScroll > 1217){
                    slider.style.display = 'none';
                }else{
                    slider.style.position = 'relative';
                    slider.style.top = '';
                }
            }
        });
        //btn agregar (add)...
        const addBtn = document.querySelector('.addBtn_slider');
        addBtn.addEventListener('click', () => {
            tienda.addCart((product - 1), 1);
        });
        /*(add product) button that is in the recommendation
        cart, is to add the product to the shoppingcart...*/
        const recoSection = document.querySelector('.recommendations');
        recoSection.addEventListener('click', (event) => {
            if (event.target.classList.contains('addReco')){

                const cart = event.target.closest('section');
                const id = cart.querySelector('input[type="text"]').value;

                tienda.addCart((id - 1), 1);//we add to the shopping cart...
            }
        });
        /*function to position the mause on the small images
        and display them in the main position...*/
        const sidePhotos = document.querySelector('.side_photos');
        const mainPositionPhoto = document.querySelector('.main_photo img');
        sidePhotos.addEventListener('click', async (event) => {
            try {
                const products = await tienda.products();
                const item = products[product - 1];

                mainPositionPhoto.src = event.target.src;
                setTimeout(() => {
                    mainPositionPhoto.src = item.img; //checar el error que hay aqui...
                }, 7000);
            } catch (error) {
                console.log(error);
            }
        })
    },
    paymentZone: async () => {
        /*we need to work with the inputs, labels and the btn comprar (buy) of the form to make its 
        validation...*/
        const form = document.getElementById('formulario');
        const inputs = form.querySelectorAll('input');
        const labels = form.querySelectorAll('label');
        //btn pay...
        const btnPagar = form.querySelector('.comprar') ;
        //select html element...
        const selectPaymentMethod = document.getElementById('metodo');
        //we send the required information to the validator function...
        inputs.forEach(input => {
            input.addEventListener('keyup', (e) => {
                funciones.validator(e.target, labels, e, btnPagar);
            })
        }); 
        //here we make the validation of the email input...
        inputs[8].addEventListener('blur', (e) => {
            funciones.emailValidator(e.target, labels[2], btnPagar);
        });
        //here is the code of the pay btn...
        btnPagar.addEventListener('click', async (e) => {
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

            // If any of the inputs is empty, we prevent the default action of the button and don't send anything
            if (empty) {
                e.preventDefault();
                btnPagar.id = 'warning_btn';
                /*with this were remove the id to everything, it was
                only for a moment to warn...*/
                setTimeout(() => {
                    //btn pay
                    btnPagar.id = '';
                    //inputs...
                    inputs.forEach(input => {
                        input.style.transition = '200ms';
                        input.id = '';
                    })
                }, 3000);
            } else { // If everything is okay, we send the information
                e.preventDefault();
                let formDataBuyer = [];
                let formDataAddress = [];
                const buyerData = ['nombre', 'apellidos', 'correo', 'phone'];
                const addressData = ['stado', 'ciudad', 'colonia', 'calle', 'numero', 'CP'];
                //we take the data from the form and separate them...
                inputs.forEach(item => {
                    if(buyerData.includes(item.name)){
                        /*here we only require data closely related to 
                        the buyer...*/
                        if(item.name === 'phone'){
                            const phone = funciones.removeHyphens(item.value);

                            formDataBuyer.push({
                                name: item.name, 
                                value: parseInt(phone)
                            });
                        } else{
                            formDataBuyer.push({
                                name: item.name, 
                                value: item.value
                            });
                        }
                    } else if(addressData.includes(item.name)){
                        /*and here only the buyer's address information
                        is required...*/
                        if(item.name === 'CP'){
                            formDataAddress.push({
                                name:item.name, 
                                value: parseInt(item.value)
                            })
                        } else{
                            formDataAddress.push({
                                name:item.name, 
                                value: item.value
                            })
                        }
                    }
                })
                //we take the data from the shopping cart...
                console.log(cart)
                const purchaseProduct = cart.map(item => {
                    return {
                        id_p: parseInt(item.producto.id_p), 
                        amount: parseInt(item.cantidad), 
                        method: selectPaymentMethod.value, 
                        total: parseFloat(item.producto.price * item.cantidad), 
                        name: item.producto.description, 
                        price: item.producto.price
                    }
                });
                //we made the request post...
                try {
                    await axios.post('http://localhost:3000/abarrotes_unedl/purchaseRegistration', {
                        formDataBuyer: formDataBuyer, 
                        formDataAddress: formDataAddress, 
                        purchaseProduct: purchaseProduct
                    });

                    backToMainPageTransition.style.display = 'flex';
                    messageEmailSent. insertAdjacentHTML('beforeend', `
                        <h3>Compra exitosa</h3>
                        <p>
                            ¡Estamos encantados de informarte que tu compra se ha 
                            realizado con éxito! En breve, recibirás un correo 
                            electrónico de confirmación con todos los detalles 
                            de tu compra. Revisa tu bandeja de entrada (y también 
                            tu carpeta de correo no deseado) para asegurarte de 
                            recibir nuestra confirmación.
                        </p>
                    `); 
                    setTimeout(() => {
                        backToMainPageTransition.style.display = 'none';
                        window.location.href = '/';
                    }, 5000); 

                } catch (error) {
                    backToMainPageTransition.style.display = 'flex';
                    messageEmailSent. insertAdjacentHTML('beforeend', `
                        <h3>Error en la compra</h3>
                        <p>
                            Lo sentimos, ha ocurrido un problema al procesar tu petición de compra. 
                            Por favor, intenta realizar la compra nuevamente más tarde o ponte en 
                            contacto con nuestro servicio de atención al cliente para obtener ayuda.
                        </p>
                    `); 
                    setTimeout(() => {
                        backToMainPageTransition.style.display = 'none';
                    }, 5000);

                    console.log('Hubo un problema: ', error);
                }
            }
        });
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
            btn.style.display = ''; // Reset the id of the target button
        } else {
            input.style.backgroundColor = 'red'; // Set the background color of the input field to red
            input.style.transition = 'all 250ms'; // Apply transition to the input field
            input.style.width = '90%'; // Set the width of the input field
            labels.textContent = 'Ingrese un formato valido'; // Change the label text to 'Ingrese un formato valido'
            btn.style.display = 'none'; // Set the id of the target button to 'warning_btn'
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
                    funciones.phoneFormat(input, event);
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
                    funciones.cardNumberFormat(input);
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
                    funciones.expirationDate(input, event);
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
            /*here we are validating the form of opinions...*/
            case 'name_user':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[0].textContent = 'Nombre';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[0].textContent = 'Ingrese solo letras';
                    btn.style.display = 'none';
                }
            break;
            case 'title':
                if(funciones.regularExp.onlyLetters.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[1].textContent = 'Title';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[1].textContent = 'Ingrese solo letras';
                    btn.style.display = 'none';
                }
            break;
            case 'score':
                if(funciones.regularExp.onlyNumbers.test(input.value)){
                    input.style.backgroundColor = '';
                    input.style.transition = 'all 250ms';
                    input.style.width = '';
                    labels[2].textContent = 'Puntuación';
                    btn.style.display = '';
                }else{
                    input.style.backgroundColor = 'red';
                    input.style.transition = 'all 250ms'
                    input.style.width = '90%';
                    labels[2].textContent = 'Ingrese solo numeros';
                    btn.style.display = 'none';
                }
            break;
        }
    }, 
    formFunctions: () => {
        window.scroll({
            top: 1100,
            behavior: 'smooth'
        });
        
        const form = document.getElementById('opinionForm');
        const inputs = form.querySelectorAll('input');
        const labels = form.querySelectorAll('label');
        const btnEnviar = document.querySelector('.opinion_btn');

        inputs.forEach(item => {
            item.addEventListener('keyup', (e) => {
                funciones.validator(item, labels, e, btnEnviar);
            })
        });

        btnEnviar.addEventListener('click', (e) => {
            var empty = false; 
            var ids = [];

            inputs.forEach(item => {
                if(item.id !== 'id_product'){
                    if(item.value === ""){
                        ids.push(item.id);
                        item.id = 'warning_inputs';
                        item.placeholder = 'No puede estar vacio';
                        empty = true; 
                    }
                } else{
                    ids.push(item.id)
                }
            })

            if (empty) {
                e.preventDefault();
                btnEnviar.id = 'warning_btn';
                /*with this were remove the id to everything, it was
                only for a moment to warn...*/
                setTimeout(() => {
                    //btn pay
                    btnEnviar.id = '';
                    //inputs...
                    inputs.forEach((input, index) => {
                        input.style.transition = '200ms';
                        input.id = ids[index];
                    })
                }, 3000);
            } else { // If everything is okay, we send the information
                btnEnviar.id = '';
                const form = document.getElementById('opinionForm');
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    // Obtener los valores de los campos del formulario
                    const name_user = document.getElementById('name').value;
                    const title = document.getElementById('title').value;
                    const score = document.getElementById('score').value;
                    const opinion = document.getElementById('message').value;
                    const id_product = document.getElementById('id_product').value;

                    // Obtener la fecha actual
                    const today = new Date();

                    // Obtener el año, mes y día
                    const year = today.getFullYear();
                    // Los meses se enumeran desde 0 (enero) hasta 11 (diciembre), por lo que se suma 1 al mes actual.
                    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Se agrega un cero inicial si el mes es menor a 10
                    const day = today.getDate().toString().padStart(2, '0'); // Se agrega un cero inicial si el día es menor a 10

                    // Formatear la fecha al formato 'YYYY-MM-DD'
                    const formattedDate = `${year}-${month}-${day}`;

                    const fecha = formattedDate
                    
                    try {
                        await axios.post('http://localhost:3000/abarrotes_unedl/nuevaOpinion', {
                            name_user: name_user,
                            title: title,
                            score: score,
                            opinion: opinion,
                            id_product: id_product,
                            fecha: fecha
                        });
                        // Obtener el enlace oculto y su atributo data-link
                        const hiddenLink = document.querySelector('.hidden-link');
                        hiddenLink.click();
                    } catch (error) {
                        console.log('Hubo un problema: ', error);
                    }
                });
            }
        })
    }, 
    productsRating: async (id) => {
        try {
            const product = await tienda.productDetails(id);
            let opinions = product[0].opinions;
            let total = 0; 
            let promedio = 0;
    
            if(opinions[0] === undefined){
                funciones.showRating(promedio);
            } else{
                opinions.forEach(item => {
                    total += parseFloat(item.score);
                }); 
        
                promedio = total / opinions.length;
        
                funciones.showRating(promedio);
            }
        } catch(error) {
            console.error('Ocurrió un error al obtener el puntaje:', error);
        }
    }, 
    showRating: (pro) => {
        const starsElement = document.querySelector('.stars_slider');
        const ratingValueElement = document.querySelector('.rating_slider');
        // Actualizar el atributo data-rating de las estrellas
        starsElement.setAttribute('data-rating', parseInt(pro));
        // Mostrar el puntaje
        ratingValueElement.textContent = pro.toFixed(1);
    }, 
    opinionPorductRating: async (id) => {
        try {
            const product = await tienda.productDetails(id);
            const opinion = product[0].opinions;
            const sectionOfOpinios = document.querySelector('.opinios_of_product');
            const score = sectionOfOpinios.querySelectorAll('.score');
            const starts = sectionOfOpinios.querySelectorAll('.stars');
            const number = sectionOfOpinios.querySelectorAll('.rating-value')

            if(product[0].opinions !== undefined){
                opinion.forEach((item, index) => {
                    starts[index].setAttribute('data-rating', parseInt(item.score));
                    // Mostrar el puntaje
                    number[index].textContent = item.score;
                })
            }
        } catch (error) {
            console.log('Ocurrio un error', error);
        }
    }, 
    removeHyphens: (str) => {
        return str.replace(/-/g, '');
    }
}
export {funciones};
//grocery store logic...
const tienda = {
    products: async () => {
        try {
            const url = 'http://localhost:3000/abarrotes_unedl/products';
            //const url = '../tienda.json';
            const response = await fetch(url);
            const data = await response.json();

            return data;
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
        var itemExists = cart.find(item => item.producto.id_p === product.id_p);

        if (itemExists) {
            //we update the amoun if the product already exist...
            for(let i = 0; i < cart.length; i++){
                if(cart[i].producto.id_p === itemExists.producto.id_p){
                    cart[i].cantidad += amount;
                    cart[i].total = cart[i].cantidad + ' X $' + (cart[i].producto.price * cart[i].cantidad)
                }
            }
        } else {
            // we add the product if it doesn't exist...
            console.log('no existe')
            cart.push({
                "id": cart.length + 1,
                "cantidad": amount,
                "total": 1 + ' X $' + product.price,
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
                        <a href="/articulo/${item.id_p}" class="img_cont" data-link>
                            <img class="photo" src="${item.img}" alt="">
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
            total += item.cantidad * item.producto.price
        });

        return total;
    }, 
    productDetails: async (id) => {
        try {
            const url = `http://localhost:3000/abarrotes_unedl/details/${id}`; 
    
            const res = await fetch(url); 
            const product = await res.json();

            return product; 

        } catch (error) {
            alert(error);
            return [];
        }
    }
}
export {tienda};

//another functions...
/*here we listen if you click on the product btn to add
it to the shopping cart... */
mainCont.addEventListener('click',(event) => {
    if (event.target.classList.contains('productoBtn') || 
        event.target.classList.contains('bx-cart-add')) {

        const section = event.target.closest('section');
        const id = section.querySelector('input[type="text"]').value;

        tienda.addCart((id - 1), 1);
    } 
});
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
        //se inyecta...
        btnBuy.href= '/pagar/delivery';
        //we add the form...
        //funciones.paymentZone(tienda.ticket());
        //we end the transition...
        setTimeout(() => {
            loadingSection.style.display = 'none';
        }, 3000);
    }else{
        btnBuy.id = 'warning_btn';
        setTimeout(() => {
            btnBuy.id = '';
        }, 1000);
    }
});
/*here let's enable the product search by typing in the search input
located in the header on the right side...*/
searchInput.addEventListener('keyup', async (event) => {
    let searchText = event.target.value.toLowerCase();
    try {
        let products = await tienda.products();
        let filterData = products.filter((item) => {
            return item.description.toLowerCase().includes(searchText);
        });

        if(filterData.length === 0){
            /*if not found by comparing with the description we serach
            by comparing with the title...*/
            let filterData2 = products.filter((item) => {
                return item.title.toLowerCase().includes(searchText);
            });
            mainCont.innerHTML = '';
            tienda.printProducts(filterData2);
        }else{
            mainCont.innerHTML = '';
            tienda.printProducts(filterData);
        }
    } catch (error) {
        console.log(error);
    }
})
/*here we listen when you click on the X, icon that helps us
to delete everything from the search input...*/
document.addEventListener('input', (event) => {
    if(event.target && event.target.matches('input[type="search"]')){
        if(event.target.value === ''){
            mainCont.innerHTML = '';
            //we reprint all the products...
            setTimeout(() => {
                tienda.printProducts(tienda.products());
            }, 100)
        }
    }
});
