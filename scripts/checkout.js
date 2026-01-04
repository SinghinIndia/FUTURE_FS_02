import { renderOrderSummary } from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js"


import { loadCart } from "../data/cart.js";




function loadPage(){ // it is short form of promise  
        loadCart(()=>{
        
   
    renderPaymentSummary();
    renderOrderSummary();

});
}

loadPage();




/*
//Using promises
// so this wait for all things to load then do final step instead of waiting 1 by 1 adn reduces our code

    loadProductsFetch().then(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    })
*/

    /*
    Promise.all([
        new Promise((resolve)=>{
    
        loadProducts(()=>{
            resolve('value1');
        })
    }),
        new Promise((resolve)=>{
                loadCart(()=>{
                    resolve('value2');
                })
            })
    ]).then((values)=>{
            console.log(values);
            renderPaymentSummary();
            renderOrderSummary();
        })
    */


    /*
    new Promise((resolve)=>{
        // So bascically first we load products then resolve is called after that only we can go to next step so till loadProducts() doesn't get executed then nothing will happen then resolve will be done so that next step can take place (So resolve is there to stop the execution or make it timewise)
        loadProducts(()=>{
            resolve('value1');// whatever value we give to this will get saved in parameter
        })

        }).then((value)=>{//value='value1'
            console.log(value);
            return new Promise((resolve)=>{
                loadCart(()=>{
                    resolve();
                })
            }).then(()=>{
            renderPaymentSummary();
            renderOrderSummary();
            })
        })
    */



    /*
    loadProducts(()=>{
    renderPaymentSummary();
    renderOrderSummary();
    })
    */