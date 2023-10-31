//here we have all the code that makes the cart works...
//tsc shoping_cart.ts...
var mainCont = document.getElementById('mainCont');
var cart = document.querySelector('.conter');
var conter = document.getElementById('n');
var cartCont = document.querySelector('.main_cart');
var btnBuy = document.getElementById('buy_btn');
var delateAllbtn = document.querySelector(".delate_all_btn");
var shoppingPre = document.querySelector('.shopping_cart_cont');
var loading = document.querySelector('.loading_cont_all');
var iconCart = document.querySelector('.icon i');
var index = 0;
var d = [];
if (mainCont) {
    //we add a message to know if we make click... 
    var e = 0;
    mainCont.addEventListener('click', function (event) {
        var target = event.target;
        //check if the element that we clicked on is a button...
        if (target.classList.contains('productoBtn')) {
            //index... 
            var SectionIndex = 0;
            var sections = mainCont.querySelectorAll('section');
            var input = mainCont.querySelectorAll('input');
            for (var i = 0; i < sections.length; i++) {
                if (sections[i].contains(target.parentElement)) {
                    SectionIndex = i;
                    break;
                }
            }
            e++;
            if (cart !== null && conter !== null) {
                cart.textContent = e + ' producto';
                conter.textContent = e.toString();
            }
            var id = parseInt(input[SectionIndex].value);
            agregarCarrito(id);
            delateAllbtn === null || delateAllbtn === void 0 ? void 0 : delateAllbtn.addEventListener('click', function () {
                e = 0;
                d = [];
            });
        }
    });
    function informationProcessing(products) {
        var total = [];
        products.sort(function (a, b) { return a.id - b.id; });
        var currentId = -1;
        var totalQuantity = 0;
        var totalCost = 0;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === currentId) {
                totalQuantity++; // Incrementa la cantidad
                totalCost += parseFloat(products[i].Precio); // Acumula el costo
            }
            else {
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
    function theTotalAccount(array) {
        var total = 0;
        for (var i = 0; i < array.length; i++) {
            total += parseFloat(array[i].Precio);
        }
        return total;
    }
    function plazos(total) {
        var plazos = [];
        var e = 3;
        for (var i = 0; i < 4; i++) {
            if (i === 0) {
                plazos[i] = 0;
            }
            else {
                plazos[i] = parseFloat((total / e).toFixed(2));
                e = e * 2;
            }
        }
        return plazos;
    }
    function ticket(productos) {
        //the total bill to be paid must first be drawn up and sorted...
        var total = informationProcessing(productos);
        var amount = theTotalAccount(total);
        var meses = plazos(amount);
        setTimeout(function () {
            var amountCont = document.querySelector('.products_conteiner');
            var totalPedido = document.querySelector('.total span');
            var plazos = document.getElementById('terms');
            if (amountCont !== null) {
                total.forEach(function (item, index) {
                    // Create a new product element
                    var productElement = document.createElement('div');
                    productElement.classList.add('info_compras'); // Add the class "info_compras"
                    // Customize the inner HTML structure using the data from the item in total
                    productElement.innerHTML = "\n                        <div class=\"img_producto\">\n                            <img src=\"".concat(item.img, "\" alt=\"").concat(item.title, "\">\n                        </div>\n                        <div class=\"informacion_cantidad\">\n                            <div class=\"info\">\n                                <span>").concat(item.Descriptcion, "</span>\n                            </div>\n                            <div class=\"cantidad\">\n                                <span>").concat(item.Cantidad, " x $").concat(item.Precio, "</span>\n                            </div>\n                        </div>\n                    ");
                    //Append the productElement to the amountCont...
                    amountCont.appendChild(productElement);
                });
            }
            if (totalPedido !== null) {
                totalPedido.textContent = 'Total del Pedido: $' + amount;
            }
            if (plazos !== null) {
                var e_1 = 0;
                var value_1 = '';
                meses.forEach(function (item, index) {
                    var option = document.createElement('option');
                    value_1 = e_1.toString();
                    option.value = value_1;
                    if (index === 0) {
                        option.textContent = 'Sin meses';
                        e_1 = 3;
                    }
                    else {
                        option.textContent = value_1 + ' meses de: $' + item.toString();
                        e_1 *= 2;
                    }
                    plazos.appendChild(option);
                });
            }
        }, 200);
    }
    function caja(productos) {
        var dato = productos[productos.length - 1];
        cartCont === null || cartCont === void 0 ? void 0 : cartCont.insertAdjacentHTML('beforeend', "<div class=\"producto\">\n                                                    <div class=\"img_cont_pro\">\n                                                        <img src=\"".concat(dato.img, "\" alt=\"producto\">\n                                                    </div>\n                                                    <div class=\"info_pro\">\n                                                        <div class=\"descripcion\">\n                                                            <span>").concat(dato.Descriptcion, "</span>\n                                                        </div>\n                                                        <div class=\"precio_btn_cont\">\n                                                            <div class=\"precio\">\n                                                                <span>Precio: $").concat(dato.Precio, "</span>\n                                                            </div>\n                                                            <div class=\"btn_eliminar_cont\">\n                                                                <button id=\"eliminar\" class=\"btnDelateProduct\">Eliminar</button>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>"));
    }
    function agregarCarrito(pro) {
        var identificador = pro;
        var url = 'https://ramedina98.github.io/api_nat/tienda.json';
        fetch(url)
            .then(function (res) { return res.json(); })
            .then(function (data) { return showData(data.productos); })
            .catch(function (error) { return console.log(error); });
        var showData = function (jsonD) {
            d.push(jsonD[identificador - 1]);
            caja(d);
        };
    }
    //functions of the btn = eliminar...
    if (cartCont) {
        cartCont.addEventListener('click', function (event) {
            var target = event.target;
            if (target.classList.contains('btnDelateProduct')) {
                var btnIndex = 0;
                var productos = cartCont.querySelectorAll('.producto');
                for (var i = 0; i < productos.length; i++) {
                    if (productos[i].contains(target.parentElement)) {
                        btnIndex = i;
                        break;
                    }
                }
                var producto = productos[btnIndex];
                producto.remove();
                e--;
                if (e > 0) {
                    if (cart !== null && conter !== null) {
                        cart.textContent = e + ' producto';
                        conter.textContent = e.toString();
                    }
                }
                else {
                    if (cart !== null && conter !== null) {
                        cart.textContent = e + ' carrito';
                        conter.textContent = e.toString();
                    }
                }
                //We delete the data at the corresponding index..
                if (btnIndex >= 0 && btnIndex < d.length) {
                    d.splice(btnIndex, 1);
                }
            }
        });
    }
    if (btnBuy) {
        btnBuy.addEventListener('click', function () {
            if (d.length > 0) {
                //empty...
                mainCont.innerHTML = '';
                //close the shopping pre cart...
                if (shoppingPre) {
                    shoppingPre.style.display = 'none';
                }
                //new component...
                var paymentZone = "<article class=\"form_payment\" id=\"paymentZone\">\n                                        <div class=\"informacion_compra\">\n                                            <!--products...-->\n                                            <div class=\"products_conteiner\">\n                                                <!--This is the component...-->\n                                                \n                                                <!--<div class=\"info_compras\">\n                                                    <div class=\"img_producto\">\n                                                        <img src=\"https://res.cloudinary.com/riqra/image/upload/v1678811199/sellers/3/ca6jtcmc2skfvxrzqmsh.jpg\" alt=\"\">\n                                                    </div>\n                                                    <div class=\"informacion_cantidad\">\n                                                        <div class=\"info\">\n                                                            <span>Sabritas habanero 245 grs</span>\n                                                        </div>\n                                                        <div class=\"cantidad\">\n                                                            <span>2 x $40</span>\n                                                        </div>\n                                                    </div>\n                                                </div>-->\n                                            </div>\n                                            <!--Total...-->\n                                            <div class=\"total_payment_terms\">\n                                                <div class=\"total\">\n                                                    <span>Total del pedido: $0</span>\n                                                </div>\n                                                <div class=\"terms\">\n                                                    <select name=\"terms\" id=\"terms\">\n                                                    </select>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <form action=\"php/sendEmail.php\" method=\"post\" id=\"formulario\">\n                                            <fieldset class=\"two_elements\">\n                                                <legend>Datos personales</legend>\n                                                <div class=\"elements\">\n                                                    <div>\n                                                        <label for=\"name\">Nombre(s)</label>\n                                                        <input type=\"text\" name=\"nombre\" placeholder=\"Ingrese su nombre completo\">\n                                                    </div>\n                                                    <div>\n                                                        <label for=\"name\">Apellidos</label>\n                                                        <input type=\"text\" name=\"apellidos\" placeholder=\"Ingrese sus apellidos\">\n                                                    </div>\n                                                </div>\n                                            </fieldset>\n                                            <fieldset class=\"direccion\">\n                                                <legend for=\"direccion\">Direccion de envio</legend>\n                                                <input type=\"text\" name=\"stado\" placeholder=\"Ingrese estado\">\n                                                <input type=\"text\" name=\"ciudad\" placeholder=\"Ingrese ciudad\">\n                                                <input type=\"text\" name=\"colonia\" placeholder=\"Ingrese colonia\">\n                                                <input type=\"text\" name=\"calle\" placeholder=\"Ingrese calle\">\n                                                <input type=\"text\" name=\"numero\" maxlength=\"6\" placeholder=\"Ingrese numero exterior\">\n                                                <input type=\"text\" name=\"CP\" maxlength=\"5\" placeholder=\"Ingrese C.P.\">\n                                            </fieldset>\n                                            <fieldset class=\"two_elements\">\n                                                <legend>Correo y numero de contacto</legend>\n                                                <div class=\"elements\">\n                                                    <div>\n                                                        <label for=\"correo\">Correo</label>\n                                                        <input type=\"text\" name=\"correo\" placeholder=\"Ingrese su correo (eje: m_12@email.com)\">\n                                                    </div>\n                                                    <div>\n                                                        <label for=\"telefono\">Telefono</label>\n                                                        <input type=\"text\" name=\"phone\" maxlength=\"14\" placeholder=\"Ingrese su numero (eje: 3354789620)\">\n                                                    </div>\n                                                </div>\n                                            </fieldset>\n                                            <fieldset class=\"metodo_pago\">\n                                                <legend>M\u00E9todos de pago</legend>\n                                                <select name=\"metodo\" id=\"metodo\">\n                                                    <option value=\"credito\">Tarjeta de credito (visa / mastercart)</option>\n                                                    <option value=\"debito\">Tarjeta de debito (visa / mastercart)</option>\n                                                </select>\n                                                <div class=\"tarjeta\">\n                                                    <div class=\"name_numeros\">\n                                                        <label for=\"numeros\">Numeros de la tarjeta (16)</label>\n                                                        <input type=\"text\" name=\"numeros\" maxlength=\"19\" placeholder=\"Ingrese los 16 digitos de su tarjeta\">\n                                                        <label for=\"due\u00F1o\">Nombre de la tarjetas</label>\n                                                        <input type=\"text\" name=\"due\u00F1o\" placeholder=\"Nombre del due\u00F1o de la tarjeta\">\n                                                    </div>\n                                                    <div class=\"vence\">\n                                                        <label for=\"vence\">Fecha de vencimiento</label>\n                                                        <input type=\"text\" maxlength=\"5\" name=\"vence\" placeholder=\"Ingrese la fecha de vencimiento\">\n                                                    </div>\n                                                    <div class=\"cvv\">\n                                                        <label for=\"vence\">CVC</label>\n                                                        <input type=\"text\" name=\"cvc\" maxlength=\"3\" placeholder=\"Ingrese la fecha de vencimiento\">\n                                                    </div>\n                                                </div>\n                                            </fieldset>\n                                            <div class=\"btns\">\n                                                <button class=\"comprar\" type=\"submit\">Pagar</button>\n                                                <button class=\"cancelar\" id=\"cancelar\">Cancelar</button>\n                                            </div>\n                                        </form>\n                                    </article>";
                //loading element...
                loading.style.display = 'flex';
                document.body.style.overflowY = 'hidden';
                //we insert this new component in the main...
                mainCont.insertAdjacentHTML('beforeend', paymentZone);
                //we catch the form...
                var form = document.getElementById('formulario');
                //we catch the inputs...
                var inputs_1 = form.querySelectorAll('input');
                var labels_1 = form.querySelectorAll('label');
                //we catch the compra btn (buy)... 
                var btnComprar_1 = form.querySelector('.comprar');
                //we look for the input in which we write...
                inputs_1.forEach(function (item) {
                    item.addEventListener('keyup', function (e) {
                        //the full function is in the 430 line...
                        validetor(e.target, labels_1, e, btnComprar_1);
                    });
                });
                /*in this listener we do the validation to see if they
                are empty or not...*/
                btnComprar_1.addEventListener('click', function (e) {
                    var empty = false; /*This variable is for
                    hunting if any of the inputs is empty...*/
                    inputs_1.forEach(function (item) {
                        //we check if any input is empty...
                        if (item.value === "") {
                            item.id = 'warning_inputs';
                            item.placeholder = 'No puede estar vacio';
                            empty = true;
                        }
                    });
                    /*if the eamil input is not empty, we have to check
                    that its content is correct...*/
                    emailValidator(inputs_1[8], labels_1[2], e);
                    //if any of the inputs it's empty we omitted the action
                    //by defaul of the button and we don't sent anything...
                    if (empty) {
                        e.preventDefault();
                        btnComprar_1.id = 'warning_btn';
                    }
                    else { // if everything ok, we send the information...
                        btnComprar_1.id = '';
                    }
                });
                //btn cancelar (cancel)...
                var btnCancel = form.querySelector('.cancelar');
                btnCancel.addEventListener('click', function (e) {
                    e.preventDefault();
                    location.reload();
                });
                //we call ticket function...
                ticket(d);
                //
                setTimeout(function () {
                    loading.style.opacity = '1';
                    loading.style.display = 'none';
                    iconCart.className = 'bx bxs-cart-alt';
                    document.body.style.overflowY = 'scroll';
                    window.scrollTo(0, 0);
                }, 1500);
            }
            else {
                btnBuy.style.backgroundColor = 'red';
                btnBuy.style.width = '35%';
                btnBuy.style.transition = '200ms';
                setTimeout(function () {
                    btnBuy.style.backgroundColor = '';
                    btnBuy.style.width = '';
                    btnBuy.style.transition = '200ms';
                }, 1500);
            }
        });
        /*This is the part of the code that helps us to validate the
        inputs...
        it is necessary to make sure that the information entered is valid,
        depending on the input in which we are write, this to ensure a better
        management of that information in the database (if we have one) and
        avoid junk information...*/
        var regularExp_1 = {
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
        };
        function cardNumberFormat(input) {
            var str = input.value;
            var groups = str.match(/\d{1,4}/g);
            if (groups && groups.length > 1) {
                var lastGroup = groups.pop();
                if (lastGroup && lastGroup.length === 1) {
                    groups.push(lastGroup);
                }
                else {
                    if (lastGroup) {
                        groups.push(lastGroup);
                    }
                    input.value = groups.join('-');
                    return; // Agregar return para detener la ejecución y evitar la siguiente línea
                }
            }
            input.value = str; // La última actualización del valor del input
        }
        function expirationmDate(input, key) {
            var str = input.value;
            if (key.key !== 'Backspace') {
                if (/^\d{2}$/.test(str)) {
                    var firstHalf = str.slice(0, 2);
                    var secondHalf = str.slice(2);
                    input.value = firstHalf + '/' + secondHalf;
                }
            }
        }
        function phone(input, key) {
            var str = input.value; // Store the value of the input field in a variable 'str'
            if (key.key !== 'Backspace') { // Check if the key pressed is not 'Backspace'
                var phoneNumber = str.replace(/\D/g, ''); // Remove non-digits from the input string
                var formattedNumber = ''; // Initialize a variable to store the formatted phone number
                var chunkSizes = [2, 2, 2, 2, 2]; // Define an array containing chunk sizes for the phone number
                var index_1 = 0; // Initialize the index for extracting chunks from the phone number
                for (var _i = 0, chunkSizes_1 = chunkSizes; _i < chunkSizes_1.length; _i++) { // Iterate through each chunk size
                    var size = chunkSizes_1[_i];
                    var chunk = phoneNumber.substr(index_1, size); // Extract a chunk of the specified size from the phone number
                    if (chunk) { // Check if the chunk is not empty
                        formattedNumber += chunk + '-'; // Append the chunk followed by a hyphen to the formatted number
                    }
                    index_1 += size; // Move the index to the start of the next chunk
                }
                formattedNumber = formattedNumber.slice(0, -1); // Remove the last hyphen from the formatted number
                input.value = formattedNumber; // Set the input value to the formatted phone number
            }
        }
        function emailValidator(input, labels, btn) {
            if (regularExp_1.email.test(input.value)) {
                input.style.backgroundColor = '';
                input.style.transition = 'all 250ms';
                input.style.width = '';
                labels.textContent = 'Correo';
                btn.target.id = '';
            }
            else {
                input.style.backgroundColor = 'red';
                input.style.transition = 'all 250ms';
                input.style.width = '90%';
                labels.textContent = 'Ingrese un formato valido';
                btn.preventDefault();
                btn.target.id = 'warning_btn';
                setTimeout(function () {
                    input.value = '';
                }, 2000);
            }
        }
        function validetor(input, labels, event, btn) {
            switch (input.name) {
                //this is the datos personales (personal information) zone
                case 'nombre':
                    if (regularExp_1.onlyLetters.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.width = '';
                        input.style.transition = 'all 250ms';
                        labels[0].textContent = 'Nombre(s)';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.width = '90%';
                        input.style.transition = 'all 250ms';
                        labels[0].textContent = 'Ingrese solo letras"';
                        btn.style.display = 'none';
                    }
                    break;
                case 'apellidos':
                    if (regularExp_1.onlyLetters.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.width = '';
                        input.style.transition = 'all 250ms';
                        labels[1].textContent = 'Apellidos';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.width = '90%';
                        input.style.transition = 'all 250ms';
                        labels[1].textContent = 'Ingrese solo letras"';
                        btn.style.display = 'none';
                    }
                    break;
                //here we are in the direccion de envio (shipping address) zone...
                case 'stado':
                    if (regularExp_1.onlyLetters.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.placeholder = 'Ingrese estado';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        btn.style.display = 'none';
                        setTimeout(function () {
                            input.value = '';
                            input.placeholder = 'Ingrese solo letras';
                        }, 1000);
                    }
                    break;
                case 'ciudad':
                    if (regularExp_1.onlyLetters.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.placeholder = 'Ingrese ciudad';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        btn.style.display = 'none';
                        setTimeout(function () {
                            input.value = '';
                            input.placeholder = 'Ingrese solo letras';
                        }, 1000);
                    }
                    break;
                case 'colonia':
                    if (regularExp_1.onlyLetters.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.placeholder = 'Ingrese colonia';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        btn.style.display = 'none';
                        setTimeout(function () {
                            input.value = '';
                            input.placeholder = 'Ingrese solo letras';
                        }, 1000);
                    }
                    break;
                case 'calle':
                    if (regularExp_1.onlyLetters.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.placeholder = 'Ingrese calle';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        btn.style.display = 'none';
                        setTimeout(function () {
                            input.value = '';
                            input.placeholder = 'Ingrese solo letras';
                        }, 1000);
                    }
                    break;
                case 'numero':
                    if (regularExp_1.houseNumber.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.placeholder = 'Ingrese calle';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        btn.style.display = 'none';
                        setTimeout(function () {
                            input.value = '';
                            input.placeholder = 'Ingrese un formato valido (eje: 256 or 256A)';
                        }, 1000);
                    }
                    break;
                case 'CP':
                    if (regularExp_1.onlyNumbers.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.placeholder = 'Ingrese C.P.';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        btn.style.display = 'none';
                        setTimeout(function () {
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
                    if (regularExp_1.phone.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.style.width = '';
                        labels[3].textContent = 'Telefono';
                        btn.style.display = '';
                        phone(input, event);
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        input.style.width = '90%';
                        labels[3].textContent = 'Ingrese un numero valido';
                        btn.style.display = 'none';
                    }
                    break;
                //we are in the payment method section...
                case 'numeros':
                    if (regularExp_1.cardNumber.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.style.width = '';
                        labels[4].textContent = 'Numeros de la tarjeta (16)';
                        btn.style.display = '';
                        cardNumberFormat(input);
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        input.style.width = '90%';
                        labels[4].textContent = 'Ingrese solo numeros';
                        btn.style.display = 'none';
                    }
                    break;
                case 'dueño':
                    if (regularExp_1.onlyLetters.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.style.width = '';
                        labels[5].textContent = 'Nombre de la tarjeta';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        input.style.width = '90%';
                        labels[5].textContent = 'Ingrese solo letras';
                        btn.style.display = 'none';
                    }
                    break;
                case 'vence':
                    if (regularExp_1.expirationmDate.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.style.width = '';
                        labels[6].textContent = 'Fecha de vencimiento';
                        btn.style.display = '';
                        expirationmDate(input, event);
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        input.style.width = '90%';
                        labels[6].textContent = 'Ingrese solo numeros';
                        btn.style.display = 'none';
                    }
                    break;
                case 'cvc':
                    if (regularExp_1.onlyNumbers.test(input.value)) {
                        input.style.backgroundColor = '';
                        input.style.transition = 'all 250ms';
                        input.style.width = '';
                        labels[7].textContent = 'CVC';
                        btn.style.display = '';
                    }
                    else {
                        input.style.backgroundColor = 'red';
                        input.style.transition = 'all 250ms';
                        input.style.width = '90%';
                        labels[7].textContent = 'Ingrese solo numeros';
                        btn.style.display = 'none';
                    }
                    break;
            }
        }
    }
}
