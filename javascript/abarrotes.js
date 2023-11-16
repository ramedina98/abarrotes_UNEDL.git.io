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
var btnArray = []; //we save the id's of the products to return...

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
    moreDetailsView: async (product) => {
        mainCont.innerHTML = ''; 

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
                            <div class="cart_reco_img_cont">
                                <img class="product_photo" src="${item.img}">
                            </div>
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

        //full html code...
        mainCont.innerHTML = `
            <secition class="details_zone">
                <div class="main_info">
                    <div class="goBackCont">
                        <button class="goBack"><i class='bx bx-arrow-back'></i> Regresar</button>
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
                </div>
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
                                <div class="stars" data-rating="4"></div>
                                <span class="rating-value">4</span>
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
            tienda.addCart((product[0].id_p - 1), 1);
        });
        //btn back...
        const btnBack = document.querySelector('.goBack');
        btnBack.addEventListener('click', () => {
            //if the arrya has just one id we return to the main content...
            if(btnArray.length === 1){
                mainCont.innerHTML = '';

                setTimeout(() => {
                    tienda.printProducts(tienda.products());
                }, 100);

            } //if the arrya has more than 1 id we return
            //to the previous content...
            else if(btnArray.length > 1){
                mainCont.innerHTML = '';
                //we get the last id...
                let id_back = btnArray[btnArray.length - 1];
                //we delate the last id...
                btnArray.pop();
                //then we returnt to the previous content...
                setTimeout(() => {
                    tienda.productDetails(id_back);
                }, 100);
            }
        });
        /*(add product) button that is in the recommendation
        cart, is to add the product to the shoppingcart...*/
        const recoSection = document.querySelector('.recommendations');
        recoSection.addEventListener('click', (event) => {
            console.log(event)
            if (event.target.classList.contains('addReco')){

                const cart = event.target.closest('section');
                const id = cart.querySelector('input[type="text"]').value;

                tienda.addCart((id - 1), 1);//we add to the shopping cart...
            } else if(event.target.classList.contains('product_photo')){
                /*if we click on the photo of the products that are in the
                recommendation section we have to go to the details of that
                product...*/ 
                const section = event.target.closest('section');
                const id = section.querySelector('input[type="text"]').value;

                //here we collect the id's...
                btnArray.push(id);
                console.log(btnArray.length)

                setTimeout(() => {
                    tienda.productDetails(id);
                }, 150)
            }
        });
        /*function to position the mause on the small images
        and display them in the main position...*/
        const sidePhotos = document.querySelector('.side_photos');
        const mainPositionPhoto = document.querySelector('.main_photo img');
        sidePhotos.addEventListener('click', (event) => {
            mainPositionPhoto.src = event.target.src;
            setTimeout(() => {
                mainPositionPhoto.src = product[0].img;
            }, 7000);
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
                                                    <span>${item.producto.description}</span>
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
        //btn pay...
        const btnPagar = form.querySelector('.comprar') ;
        //btnCancell...
        const btnCancell = form.querySelector('.cancelar');
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
        btnPagar.addEventListener('click', (e) => {
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
                btnPagar.id = '';
                form.action = 'php/sendEmail.php';
            }
        });
        //here is the code of the cancel btn...
        btnCancell.addEventListener('click', (e) => {
            mainCont.innerHTML = '';
            setTimeout(() => {
                tienda.printProducts(tienda.products());
            }, 100)
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
        }
    }
}

let tienda = {
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
                        <div class="img_cont">
                            <img class="photo" src="${item.img}" alt="">
                        </div>
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

            funciones.moreDetailsView(product);
        } catch (error) {
            alert(error);
            return [];
        }
    }
}

tienda.printProducts(tienda.products());
//tienda.productDetails(20);

/*here we listen if you click on the product btn to add
it to the shopping cart... */
mainCont.addEventListener('click',(event) => {
    if (event.target.classList.contains('productoBtn') || 
        event.target.classList.contains('bx-cart-add')) {

        const section = event.target.closest('section');
        const id = section.querySelector('input[type="text"]').value;

        tienda.addCart((id - 1), 1);
    } /*the following conditional will display the products
    details function, wich will give us more information about 
    the product we clicked on its img...*/
    else if(event.target.classList.contains('photo')){

        const section = event.target.closest('section');
        const id = section.querySelector('input[type="text"]').value;
        
        //here we collect the id's...
        btnArray.push(id);

        setTimeout(() => {
            tienda.productDetails(id);
        }, 150);
    }
}); 
//return to the begining...
inicio.addEventListener('click', (e) => {
    e.preventDefault();
    mainCont.innerHTML = '';
    //we remove all the elements in this array...
    btnArray = [];
    //we wait a little bit and then we print all the
    //products again...
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