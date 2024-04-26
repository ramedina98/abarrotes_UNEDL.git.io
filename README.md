# unedl grocery store (abarrotes unedl)
:information_source: :information_source: 

This proyect was created with the purpose of testing new skills 
in web development. This is the frontend of the project only, 
but the whole project (backend and frontend) was developed by me.

link to the backend repository --> https://github.com/ramedina98/backend_grocery_store

This is the link to the page, I used render web service to put it 
online --> https://backendgrocerystore-production.up.railway.app/

:information_source: :information_source: 

## What dependencies does the project use?

1. axios ^1.6.2
2. express ^4.18.2

## Project objective. 

The requirement for the development of the project was: 

1. The project had to be developed as a SPA without the use 
of React.js, only JavaScript vanila.

## use. 

On my own I added the following views: 

1. _Products (/)_: Here you can see all the prodcuts that the store offers, 
and also if you want you can go to the search bar that is in the header
and search for a specific product.

2. _Product detail (/articulo/:name/:id)_: In this view we can access more details about a product: nutritional information, ratings, product reviews from other buyers, recommendations of similar products and more. In this section the search bar in the header is disabled. 

3. _Opinion view (/opinion/:name/:id)_: The way to access here is to click on the "write your opinion" button, which is located in the "opinions" part of the Product datail view.

When you enter there, the form what you will have to write is: your name, give a title to the opinion, the score and your complete opinion. You have to click on send (enviar) to send it or click on return **(regresar)** to go to the previous page.

4. _Pay view (/pagar/delivery)_: In this section what will be done is the payment of the products to be purchased, which were in the shopping cart. The only way to access here is if when you click on the buy button **(comprar)**, which is in the shopping cart, the cart is full, if not the button will change color to red, it will stutter and leave us on the main page.

In the form prior to purchase, we will have to put our full name, shipping address, email and cell phone, type of card (credit or debit) and card details. All fields must be filled in correctly, otherwise you will not be able to proceed and make the purchase when you click on the button "pay" **(pagar)**. 

When everything is correctly filled out and click on the button, we will be shown a message that warns us that we will receive a confirmation email and we will be returned to the main page, clearing the shopping cart. 

:memo: The email is sent from the backend obviusly. :memo:

The cancel button **(cancelar)**, dark blue in color, will only return us to the main page, without deleting the products in the shopping cart.

## Credits.

This project was developed by: [Ricardo-Medina](https://porfoliowebpage-production.up.railway.app/)

## Contacto

- **Email:** rmedinamartindelcampo@gmail.com