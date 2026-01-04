import { getOrder, getOrderProduct, formattedDate} from "../data/orders.js";
import { getProduct} from "../data/products.js";
import { getCartQuantity } from '../data/cart.js';


const url=new URL(window.location.href);
const orderId=url.searchParams.get('orderId');
const productId=url.searchParams.get('productId');


let trackingHTML=''

    function loadPage(){
    renderTrackingPage();
}
loadPage();



function renderTrackingPage(){

    const product=getProduct(productId);
    const order=getOrder(orderId);
    const orderProduct=getOrderProduct(orderId, productId);

    function renderCartQuantity(){
    const cartQuantity=getCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
  }
    trackingHTML=`
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>
            <div class="delivery-date">
            Arriving on ${formattedDate(orderProduct.estimatedDeliveryTime)}
            </div>

            <div class="product-info">
            ${product.name}
            </div>

            <div class="product-info">
            Quantity: ${orderProduct.quantity}
            </div>

            <img class="product-image" src="${product.image}">
            <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `
    document.querySelector('.js-order-tracking').innerHTML=trackingHTML;
    renderCartQuantity();
}
