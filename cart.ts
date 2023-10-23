//here we have all the code that makes the cart works...
//tsc shoping_cart.ts
const mainCont: HTMLElement | null = document.getElementById('mainCont');
const cart: HTMLButtonElement | null = document.querySelector('.conter');
const conter: HTMLElement | null = document.getElementById('n');
const cartCont: HTMLDivElement | null = document.querySelector('.main_cart');
const btnBuy: HTMLElement | null = document.getElementById('buy_btn');
const delateAllbtn: HTMLButtonElement | null = document.querySelector(".delate_all_btn");
let index:number = 0; 
var d: any[] = []; 
interface Producto {
    id: number;
    img: string;
    title: string;
    Descriptcion: string; 
    Precio: string;
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
                                                </div>`)
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
                if(cart !== null && conter !== null){
                    cart.textContent = e + ' producto';
                    conter.textContent = e.toString();
                }
                //We delete the data at the corresponding index..
                if (btnIndex >= 0 && btnIndex < d.length) {
                    d.splice(btnIndex, 1);
                }
            }
        })
    }
    function agregarCarrito(pro:number): void{
        var identificador = pro; 

        let url = 'tienda.json';
        fetch(url)
            .then(res => res.json())
            .then(data => showData(data.productos))
            .catch(error => console.log(error))

        const showData = (jsonD: any) => {
            d.push(jsonD[identificador - 1]);
            caja(d);
        }
    }
    
    /*function ticket(productos:Producto[]): Producto{
        var ob:Producto[] = [];

        return ob[];
    }*/
}
if(btnBuy){
    btnBuy.addEventListener('click', () => {
        if(d.length > 0){
            console.log('Los datos del carrito: ', d);
            //tenemos que borrar lo que hay en el main e 
            //insertar lo nuevo... como se trabajan los jsquerys...
        }else{
            console.log('no')
        }
    })
}