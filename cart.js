//here we have all the code that makes the cart works...
//tsc shoping_cart.ts
var mainCont = document.getElementById('mainCont');
var cart = document.querySelector('.conter');
var conter = document.getElementById('n');
var cartCont = document.querySelector('.main_cart');
var btnBuy = document.getElementById('buy_btn');
var delateAllbtn = document.querySelector(".delate_all_btn");
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
    function caja(productos) {
        var dato = productos[productos.length - 1];
        cartCont === null || cartCont === void 0 ? void 0 : cartCont.insertAdjacentHTML('beforeend', "<div class=\"producto\">\n                                                    <div class=\"img_cont_pro\">\n                                                        <img src=\"".concat(dato.img, "\" alt=\"producto\">\n                                                    </div>\n                                                    <div class=\"info_pro\">\n                                                        <div class=\"descripcion\">\n                                                            <span>").concat(dato.Descriptcion, "</span>\n                                                        </div>\n                                                        <div class=\"precio_btn_cont\">\n                                                            <div class=\"precio\">\n                                                                <span>Precio: $").concat(dato.Precio, "</span>\n                                                            </div>\n                                                            <div class=\"btn_eliminar_cont\">\n                                                                <button id=\"eliminar\" class=\"btnDelateProduct\">Eliminar</button>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>"));
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
                if (cart !== null && conter !== null) {
                    cart.textContent = e + ' producto';
                    conter.textContent = e.toString();
                }
                //We delete the data at the corresponding index..
                if (btnIndex >= 0 && btnIndex < d.length) {
                    d.splice(btnIndex, 1);
                }
            }
        });
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
    /*function ticket(productos:Producto[]): Producto{
        var ob:Producto[] = [];

        return ob[];
    }*/
}
if (btnBuy) {
    btnBuy.addEventListener('click', function () {
        if (d.length > 0) {
            console.log('Los datos del carrito: ', d);
            //tenemos que borrar lo que hay en el main e 
            //insertar lo nuevo... como se trabajan los jsquerys...
        }
        else {
            console.log('no');
        }
    });
}
