import {cart,getCartQuantity} from '../../data/cart.js'
import {products, getProduct} from '../../data/products.js'
import{deliveryOptions,getDeliveryOption} from '../../data/deliveryOptoins.js'
import {orders, addOrder} from '../../data/orders.js'


export function renderPaymentSummary(){
let productpriceINR=0;
let shippingpriceINR=0;
let paymentSummaryHTML='';
let cartQuantity=getCartQuantity();


cart.forEach((cartItem)=>{
    
    const productId=cartItem.productId;
     const product=getProduct(productId);
    productpriceINR+=product.priceINR*cartItem.quantity;
    
    const deliveryOptionId=cartItem.deliveryOptionId;
    const deliveryOption=getDeliveryOption(deliveryOptionId);
    shippingpriceINR+=deliveryOption.priceINR;
    

});


    const totalBeforeTax=productpriceINR+shippingpriceINR;

    const taxCents=totalBeforeTax*.1;

    const total = totalBeforeTax + taxCents;


// so here we can keep the html out just because we don't have to ad it or load it everytime (+=) is not there. We have to make only one copy and update not make another copy of it evertime we order.
    paymentSummaryHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">₹${(productpriceINR).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${(shippingpriceINR).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${(totalBeforeTax).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${(taxCents).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${(total).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order" 
            ${cartQuantity === 0 ? 'disabled' : ''}>
            Place your order
          </button>

          `

        document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

        document.querySelector('.js-return-to-home-link').innerHTML=`${cartQuantity} Items`;

        const orderBtn=document.querySelector('.js-place-order');
        if(cartQuantity >0){orderBtn.addEventListener(('click'),async ()=>{
          const userEmail = localStorage.getItem('userEmail');
          if (!userEmail) {
            alert('You need to log in before placing an order.');
            window.location.href = 'login.html';  // Redirect to login page
            return;
          }
          try{
            console.log('Cart before sending to backend:', cart);
            const response = await fetch('https://supersimplebackend.dev/orders',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              cart:cart
            })
          })
          const orders = await response.json();
          orders.totalCostCents=total;
          addOrder(orders);
          console.log(orders);
          }catch(error){
            console.log('Unexpected Error.Try again later')
          }
          window.location.href = 'orders.html';


        })
      }
}

