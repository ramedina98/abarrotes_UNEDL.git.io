/*here we will generate the PDF with the invoice and send 
the email to the buyer...
import { where } from "sequelize";
import {
    registepurchaseModel, 
    buyerModel, 
    addressModel
} from "../models/models.js";

we have to create a function that will get the data from the 
following 3 tables: 
1. buyer, 
2. address, 
3. purchase_register

that information is necessary to create the purchase ticket...*/
/*const generatePDF = async (datos) => {
    const buyer = datos.buyer; 
    const address = datos.address; 
    const products = datos.products;
    
    const documentDefinition = {
        content: [
            { text: 'Detalles del comprador', style: 'header' },
            { text: `Nombre: ${buyer.name_buyer}` },
            { text: `Apellidos: ${buyer.last_name_buyer}` },
            { text: `Email: ${buyer.email}` },
            { text: `Teléfono: ${buyer.phone}` },
            { text: 'Dirección', style: 'header' },
            { text: `Estado: ${address.state}` },
            { text: `Ciudad: ${address.city}` },
            { text: `Colonia: ${address.neighborhood}` },
            { text: `Calle: ${address.streed}` },
            { text: `Número: ${address.house_number}` },
            { text: `Código Postal: ${address.zip_code}` },
            { text: 'Productos Comprados', style: 'header' },
            // Aquí puedes agregar información sobre los productos
            // Por ejemplo, iterar sobre el arreglo de productos y añadir sus detalles al PDF
            ...products.map(product => [
                { text: `ID del producto: ${product.id_p}` },
                { text: `Cantidad: ${product.amount}` },
                { text: `Método de pago: ${product.method}` },
                { text: `Total: ${product.total}` },
                { text: '-------------------------------------------' }, // Separador entre productos
            ]),
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 15, 0, 5]
            }
        }
    }; 

    const printer = new pdfMake();

    const pdfDoc = printer.createPdfKitDocument(documentDefinition);

    return pdfDoc;
};*/


/*const createEmail = async (pdf, data) => {

}*/
/*export const sendEmail = async (data) => {
    const pdf = await generatePDF(data);
    const email = await createEmail(pdf, data);

    if(email === 200){
        return {
            status: 200, 
            message: 'Mail sent Successfully'
        }
    } else if(email === 500){
        return {
            status: 500, 
            message: 'There was an error sending the email'
        }
    } else{
        
    }
}*/