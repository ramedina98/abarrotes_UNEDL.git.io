import mainCont from "../view/mainCont.js";
import productDetails from "../view/productDetails.js";
import paymentView from "../view/paymentView.js";
import opinionView from "../view/opinionView.js";
import { funciones } from "../javaScript/abarrotes.js";
//import axios from 'axios';

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }))
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path: "/", view: mainCont, num: 1}, 
        {path: "/articulo/:nombre/:id", view: productDetails, num:2}, 
        {path: "/pagar/delivery", view: paymentView, num:3},
        {path: "/opinion/:nombre/:id", view: opinionView, num:4}
    ];

    //test each routes for potential match... 
    const potentialMatches = routes.map(route => {
        return{
            route: route, 
            result: location.pathname.match(pathToRegex(route.path))
        }
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if(!match){
        match = {
            route: routes[0], 
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match));
    document.querySelector('#mainCont').innerHTML = await view.getHTML();

    const params = getParams(match);
    
    switch(match.route.num){
        case 1:
            document.getElementById('searchInput').disabled = false;
            window.scrollTo({
                top: 0, 
                behavior: 'instant'
            });
        break;

        case 2: 
            const id = params.id;
            //we send the id...
            funciones.moreDetailsView(id);
            funciones.productsRating(id);
            funciones.opinionPorductRating(id);
        break;

        case 3:
            document.getElementById('searchInput').disabled = true;
            funciones.paymentZone(); 
        break;

        case 4: 
            document.getElementById('searchInput').disabled = true;
            funciones.formFunctions();
        break;
    }
};

window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', () => {

    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })

    router();
});