import {cart, removeFromCart,updateDeliveryOption, getCartItem, saveToStorage, getCartQuantity} from '../../data/cart.js'
import {products,getProduct} from '../../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptoins.js'
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
  let cartQuantity=getCartQuantity();
let cartSummaryHTML='';

cart.forEach((cartItem)=>{
   //using productId to get product details
    const productId=cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId=cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString=deliveryDate.format('dddd, MMMM D');
   
   
    cartSummaryHTML+=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ₹${(matchingProduct.priceINR).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label
                    js-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary
                  js-update-link"
                  data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-link" data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
    
    
    `;

    
});

function deliveryOptionsHTML(matchingProduct, cartItem){
  let html='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString=deliveryDate.format('dddd, MMMM D');

    const priceString=deliveryOption.priceINR===0 ? 'Free' : `₹${(deliveryOption.priceINR)}`
    
    const isChecked=(deliveryOption.id===cartItem.deliveryOptionId);
    html+=`
          <div class="delivery-option js-delivery-option"
          data-product-id=${matchingProduct.id}
                    data-delivery-option-id=${deliveryOption.id}>
                  <input type="radio"
                  ${isChecked ?'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}- Shipping
                    </div>
                  </div>
                </div>
    
    `
  })
  return html;
}

const orderSummary=document.querySelector('.js-order-summary')
if(cartQuantity!=0){orderSummary.innerHTML=cartSummaryHTML;
}else{
  document.querySelector('.js-page-title').innerHTML='';
  orderSummary.innerHTML=`
<h1>Your Shopera Cart is empty</h1>
<p>Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
Continue shopping on the <a href="website.html">Shopera.in homepage</a>.
  `
}

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', () =>{
        const productId=link.dataset.productId;
        removeFromCart(productId);

        const container=document.querySelector(`.js-cart-item-container-${productId}`)

        container.remove();
        renderPaymentSummary();
        renderOrderSummary();

        
    })
})

document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId=link.dataset.productId;
    console.log(productId);
    let product = getCartItem(productId);
    console.log(product);
    const updateBtn=document.querySelector(`.js-quantity-${product.productId}`);
    updateBtn.innerHTML=` <input class="quantity-input" type="number" min="1" value="${product.quantity}">
      <button class="save-quantity-btn
      js-save-btn">Save</button>
    `
     const saveBtn = updateBtn.querySelector('.js-save-btn');
     const input = updateBtn.querySelector('.quantity-input');
     
    function saveQuantity(){
      const newQuantity=parseInt(updateBtn.querySelector('.quantity-input').value);
      if (newQuantity > 0) {
        product.quantity = newQuantity;
        saveToStorage();
        renderOrderSummary();
        renderPaymentSummary();
      }
    }
    saveBtn.addEventListener('click',saveQuantity);
    
    input.addEventListener('keydown',(event)=>{
      if(event.key==='Enter'){
        saveQuantity();
      }
    });

    
  })

})

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId, deliveryOptionId}=element.dataset;
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  })
})
}

