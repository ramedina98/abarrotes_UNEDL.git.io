//here we have all the code that makes the cart works...
//tsc shoping_cart.ts...
const mainCont: HTMLElement | null = document.getElementById('mainCont');
const cart: HTMLButtonElement | null = document.querySelector('.conter');
const conter: HTMLElement | null = document.getElementById('n');
const cartCont: HTMLDivElement | null = document.querySelector('.main_cart');
const btnBuy: HTMLElement | null = document.getElementById('buy_btn');
const delateAllbtn: HTMLButtonElement | null = document.querySelector(".delate_all_btn");
const shoppingPre: HTMLElement | null = document.querySelector('.shopping_cart_cont'); 
const loading = document.querySelector('.loading_cont_all') as HTMLElement;
const iconCart = document.querySelector('.icon i') as HTMLElement;
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
                                        <form action="php/sendEmail.php" method="post" id="formulario">
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
                //loading element...
                loading.style.display = 'flex';
                document.body.style.overflowY = 'hidden';
                //we insert this new component in the main...
                mainCont.insertAdjacentHTML('beforeend', paymentZone);
                //we catch the form...
                const form = document.getElementById('formulario') as HTMLFormElement;
                //we catch the inputs...
                const inputs = form.querySelectorAll('input');
                const labels = form.querySelectorAll('label');
                //we catch the compra btn (buy)... 
                const btnComprar = form.querySelector('.comprar') as HTMLButtonElement;
                //we look for the input in which we write...
                inputs.forEach((item:HTMLInputElement) => {
                    item.addEventListener('keyup', (e:any) => {
                        //the full function is in the 430 line...
                        validetor(e.target, labels, e, btnComprar);
                    });
                });
                /*in this listener we do the validation to see if they 
                are empty or not...*/
                btnComprar.addEventListener('click', (e) => {
                    let empty: boolean = false; /*This variable is for
                    hunting if any of the inputs is empty...*/
                    inputs.forEach(item => {
                        //we check if any input is empty...
                        if(item.value === ""){
                            item.id = 'warning_inputs';
                            item.placeholder = 'No puede estar vacio';
                            empty = true; 
                        }
                    });
                    /*if the eamil input is not empty, we have to check
                    that its content is correct...*/
                    emailValidator(inputs[8], labels[2], e);
                    //if any of the inputs it's empty we omitted the action
                    //by defaul of the button and we don't sent anything...
                    if(empty){
                        e.preventDefault(); 
                        btnComprar.id = 'warning_btn';
                    }else{// if everything ok, we send the information...
                        btnComprar.id = '';
                    }
                });
                //btn cancelar (cancel)...
                const btnCancel = form.querySelector('.cancelar') as HTMLButtonElement;
                btnCancel.addEventListener('click', (e) => {
                    e.preventDefault();
                    location.reload();
                })
                //we call ticket function...
                ticket(d);
                //
                setTimeout(function(){
                    loading.style.opacity = '1';
                    loading.style.display = 'none';
                    iconCart.className = 'bx bxs-cart-alt';
                    document.body.style.overflowY = 'scroll';
                    window.scrollTo(0, 0);
                }, 1500);
            }else{
                btnBuy.style.backgroundColor = 'red';
                btnBuy.style.width = '35%';
                btnBuy.style.transition = '200ms';
                setTimeout(function(){
                    btnBuy.style.backgroundColor = '';
                    btnBuy.style.width = '';
                    btnBuy.style.transition = '200ms';
                }, 1500)
            }
        }); 

        /*This is the part of the code that helps us to validate the
        inputs... 
        it is necessary to make sure that the information entered is valid, 
        depending on the input in which we are write, this to ensure a better
        management of that information in the database (if we have one) and 
        avoid junk information...*/
        const regularExp = {
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
        }
        function cardNumberFormat(input: HTMLInputElement): void {
            let str = input.value; 

            const groups = str.match(/\d{1,4}/g);
        
            if(groups && groups.length > 1){
                const lastGroup = groups.pop();
        
                if(lastGroup && lastGroup.length === 1){
                    groups.push(lastGroup);
                }else{
                    if(lastGroup){
                        groups.push(lastGroup);
                    }
                    input.value = groups.join('-');
                    return; // Agregar return para detener la ejecución y evitar la siguiente línea
                }
            }
        
            input.value = str; // La última actualización del valor del input
        }
        function expirationmDate(input:HTMLInputElement, key:any):void{
            const str = input.value;

            if(key.key !== 'Backspace'){
                if (/^\d{2}$/.test(str)) {
                    const firstHalf = str.slice(0, 2);
                    const secondHalf = str.slice(2);
                    input.value = firstHalf + '/' + secondHalf;
                }
            }
        }
        function phone(input: HTMLInputElement, key: any): void {
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
        }
        function emailValidator(input:HTMLInputElement, labels:any, btn:any):void{

            if(regularExp.email.test(input.value)){
                input.style.backgroundColor = '';
                input.style.transition = 'all 250ms';
                input.style.width = '';
                labels.textContent = 'Correo';
                btn.target.id = '';
            }else{
                input.style.backgroundColor = 'red';
                input.style.transition = 'all 250ms'
                input.style.width = '90%';
                labels.textContent = 'Ingrese un formato valido';
                btn.preventDefault();
                btn.target.id = 'warning_btn';
                setTimeout(()=> {
                    input.value = '';
                }, 2000);
            }
        }
        function validetor(input:any, labels:any, event:any, btn:any):any{
            
            switch(input.name){
                //this is the datos personales (personal information) zone
                case 'nombre':
                    if(regularExp.onlyLetters.test(input.value)){
                        input.style.backgroundColor = '';
                        input.style.width = ''
                        input.style.transition = 'all 250ms'
                        labels[0].textContent = 'Nombre(s)';
                        btn.style.display = '';
                    }else{
                        input.style.backgroundColor = 'red';
                        input.style.width = '90%'
                        input.style.transition = 'all 250ms'
                        labels[0].textContent = 'Ingrese solo letras"';
                        btn.style.display = 'none';
                    }
                break;
                case 'apellidos':
                    if(regularExp.onlyLetters.test(input.value)){
                        input.style.backgroundColor = '';
                        input.style.width = ''
                        input.style.transition = 'all 250ms'
                        labels[1].textContent = 'Apellidos';
                        btn.style.display = '';
                    }else{
                        input.style.backgroundColor = 'red';
                        input.style.width = '90%'
                        input.style.transition = 'all 250ms'
                        labels[1].textContent = 'Ingrese solo letras"';
                        btn.style.display = 'none';
                    }
                break;
                //here we are in the direccion de envio (shipping address) zone...
                case 'stado':
                    if(regularExp.onlyLetters.test(input.value)){
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
                    if(regularExp.onlyLetters.test(input.value)){
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
                    if(regularExp.onlyLetters.test(input.value)){
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
                    if(regularExp.onlyLetters.test(input.value)){
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
                    if(regularExp.houseNumber.test(input.value)){
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
                    if(regularExp.onlyNumbers.test(input.value)){
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
                    if(regularExp.phone.test(input.value)){
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
                    if(regularExp.cardNumber.test(input.value)){
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
                    if(regularExp.onlyLetters.test(input.value)){
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
                    if(regularExp.expirationmDate.test(input.value)){
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
                    if(regularExp.onlyNumbers.test(input.value)){
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
}