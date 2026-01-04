import {orders} from '../data/orders.js'
import{getProduct} from '../data/products.js'
import { addToCart, getCartQuantity } from '../data/cart.js';
import { formattedDate } from '../data/orders.js';

 
  

function loadPage(){
  renderOrderPage();
}

loadPage();



function renderOrderPage(){
  function renderCartQuantity(){
  const cartQuantity=getCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
  }
  let orderHTML='';
orders.forEach((order)=>{

let productHTML='';
  

  order.products.forEach((product)=>{
    let item=getProduct(product.productId)
    productHTML+=
    `

    <div class="product-image-container">
      <img src="${item.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${item.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${formattedDate(product.estimatedDeliveryTime)}
      </div>
      <div class="product-quantity">
        Quantity: ${product.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again" data-product-id=${item.id} 
      data-product-quantity=${product.quantity}
      data-order-id=${order.id}>
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
      <div class="added-to-cart-message-container js-message-container-${order.id}-${item.id}"></div>
    </div>

  <div class="product-actions">
    <a href="tracking.html?orderId=${order.id}&productId=${item.id}">
      <button class="track-package-button button-secondary">
        Track package
      </button>
    </a>
  </div>

    `
  })
          
orderHTML+=`
  <div class="order-container js-order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>₹${(order.totalCostCents).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
            <div class="order-details-grid">
    ${productHTML}
          </div>
    </div>
`
})



  




const orderGrid=document.querySelector('.js-order-grid');
const main=document.querySelector('.js-main');
  if(orders.length===0){
    main.innerHTML=`
    <div class="empty-orders">
    <h1>You Order Cart is empty.</h1>
    <p>
    Start your shopping journey and make your first purchase today! 
    Browse products and add them to your cart to place your order.
    <br><br>
    Continue shopping on the <a href="website.html">Shopera.in homepage</a>.
  </p>
  </div>`
  }else{
  orderGrid.innerHTML=orderHTML;
  }



document.querySelectorAll('.js-buy-again').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId=link.dataset.productId;
    const orderId=link.dataset.orderId;
    
    const productQuantity=parseInt(link.dataset.productQuantity);

    const messageContainer = document.querySelector(`.js-message-container-${orderId}-${productId}`);

     addToCart(productId, productQuantity);
     renderCartQuantity();

    messageContainer.innerHTML='';

          const message = document.createElement('p');
          message.classList.add('added-to-cart-message');
          message.textContent = 'Added to cart';
          messageContainer.appendChild(message);
          
          setTimeout(() => {
            message.classList.add('fade-out');
          }, 1000);

          // Remove message from DOM after fade (container space stays)
          message.addEventListener('transitionend', () => {
          message.remove();
          });


       
        

  })

})
renderCartQuantity();

}

