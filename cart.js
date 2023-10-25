//here we have all the code that makes the cart works...
//tsc shoping_cart.ts
var mainCont = document.getElementById('mainCont');
var cart = document.querySelector('.conter');
var conter = document.getElementById('n');
var cartCont = document.querySelector('.main_cart');
var btnBuy = document.getElementById('buy_btn');
var delateAllbtn = document.querySelector(".delate_all_btn");
var shoppingPre = document.querySelector('.shopping_cart_cont');
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
        var url = 'tienda.json';
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
                var paymentZone = "<article class=\"form_payment\" id=\"paymentZone\">\n                                        <div class=\"informacion_compra\">\n                                            <!--products...-->\n                                            <div class=\"products_conteiner\">\n                                                <!--This is the component...-->\n                                                \n                                                <!--<div class=\"info_compras\">\n                                                    <div class=\"img_producto\">\n                                                        <img src=\"https://res.cloudinary.com/riqra/image/upload/v1678811199/sellers/3/ca6jtcmc2skfvxrzqmsh.jpg\" alt=\"\">\n                                                    </div>\n                                                    <div class=\"informacion_cantidad\">\n                                                        <div class=\"info\">\n                                                            <span>Sabritas habanero 245 grs</span>\n                                                        </div>\n                                                        <div class=\"cantidad\">\n                                                            <span>2 x $40</span>\n                                                        </div>\n                                                    </div>\n                                                </div>-->\n                                            </div>\n                                            <!--Total...-->\n                                            <div class=\"total_payment_terms\">\n                                                <div class=\"total\">\n                                                    <span>Total del pedido: $0</span>\n                                                </div>\n                                                <div class=\"terms\">\n                                                    <select name=\"terms\" id=\"terms\">\n                                                    </select>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <form action=\"\">\n                                            <fieldset class=\"two_elements\">\n                                                <legend>Datos personales</legend>\n                                                <div class=\"elements\">\n                                                    <div>\n                                                        <label for=\"name\">Nombre(s)</label>\n                                                        <input type=\"text\" placeholder=\"Ingrese su nombre completo\">\n                                                    </div>\n                                                    <div>\n                                                        <label for=\"name\">Apellidos</label>\n                                                        <input type=\"text\" placeholder=\"Ingrese sus apellidos\">\n                                                    </div>\n                                                </div>\n                                            </fieldset>\n                                            <fieldset class=\"direccion\">\n                                                <legend for=\"direccion\">Direccion de envio</legend>\n                                                <input type=\"text\" placeholder=\"Ingrese estado\">\n                                                <input type=\"text\" placeholder=\"Ingrese ciudad\">\n                                                <input type=\"text\" placeholder=\"Ingrese colonia\">\n                                                <input type=\"text\" placeholder=\"Ingrese calle\">\n                                                <input type=\"text\" placeholder=\"Ingrese numero exterior\">\n                                                <input type=\"text\" placeholder=\"Ingrese C.P.\">\n                                            </fieldset>\n                                            <fieldset class=\"two_elements\">\n                                                <legend>Correo y numero de contacto</legend>\n                                                <div class=\"elements\">\n                                                    <div>\n                                                        <label for=\"correo\">Correo</label>\n                                                        <input type=\"text\" placeholder=\"Ingrese su correo (eje: m_12@email.com)\">\n                                                    </div>\n                                                    <div>\n                                                        <label for=\"telefono\">Telefono</label>\n                                                        <input type=\"text\" placeholder=\"Ingrese su numero (eje: 3354789620)\">\n                                                    </div>\n                                                </div>\n                                            </fieldset>\n                                            <fieldset class=\"metodo_pago\">\n                                                <legend>M\u00E9todos de pago</legend>\n                                                <select name=\"metodo\" id=\"metodo\">\n                                                    <option value=\"credito\">Tarjeta de credito (visa / mastercart)</option>\n                                                    <option value=\"debito\">Tarjeta de debito (visa / mastercart)</option>\n                                                </select>\n                                                <div class=\"tarjeta\">\n                                                    <div class=\"name_numeros\">\n                                                        <label for=\"numeros\">Numeros de la tarjeta (16)</label>\n                                                        <input type=\"text\" name=\"numeros\" placeholder=\"Ingrese los 16 digitos de su tarjeta\">\n                                                        <label for=\"due\u00F1o\">Nombre de la tarjetas</label>\n                                                        <input type=\"text\" name=\"due\u00F1o\" placeholder=\"Nombre del due\u00F1o de la tarjeta\">\n                                                    </div>\n                                                    <div class=\"vence\">\n                                                        <label for=\"vence\">Fecha de vencimiento</label>\n                                                        <input type=\"text\" name=\"vence\" placeholder=\"Ingrese la fecha de vencimiento\">\n                                                    </div>\n                                                    <div class=\"cvv\">\n                                                        <label for=\"vence\">Fecha de vencimiento</label>\n                                                        <input type=\"text\" name=\"vence\" placeholder=\"Ingrese la fecha de vencimiento\">\n                                                    </div>\n                                                </div>\n                                            </fieldset>\n                                            <div class=\"btns\">\n                                                <button class=\"comprar\" type=\"submit\">Comprar</button>\n                                                <button class=\"cancelar\" id=\"cancelar\">Cancelar</button>\n                                            </div>\n                                        </form>\n                                    </article>";
                //we insert this new component in the main...
                mainCont.insertAdjacentHTML('beforeend', paymentZone);
                //we call ticket function...
                ticket(d);
            }
            else {
                //a messages that let know the cart is empty...
            }
        });
    }
}
