/*here we have all the code required for
the operation of the entire purchase process
on this site... */

//constantes globales...
const mainCont = document.getElementById('mainCont');
//
var cart = [];
var bill = [];
var total = 0;

let tienda = {
    products: async ():Promise<any> => {
        const url = 'https://ramedina98.github.io/api_nat/tienda.json';
        
        const data = async (): Promise<any> => {
            const response = await fetch(url);

            return await response.json();
        }

        const products = await data();

        return products.productos; 
    }, 
    printProductos: async ():Promise<any> => {
        const products =  await tienda.products();

        products.forEach((item:any) => {
            console.log(item);
        });
    }
}

tienda.printProductos();