import {cart,removeFromCart} from './cart.js'
export const orders=JSON.parse(localStorage.getItem('orders'))||[];




export function formattedDate(dateStr){
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString('en-US',{
    month: 'long',
    day: 'numeric'
  });
  return formatted
}

export function addOrder(order){
    orders.unshift(order);
    saveToStorage()
    orders.forEach((order)=>{
        order.products.forEach((product)=>{
        removeFromCart(product.productId);
    })
})



}


function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
export function getOrder(orderId){
  let matchingOrder;
  orders.forEach((order)=>{
    if(order.id===orderId){
      matchingOrder=order;
    }
  })
  return matchingOrder;
}
export function getOrderProduct(orderId, productId){
  let matchingOrder;
  let matchingProduct
  orders.forEach((order)=>{
    if(order.id===orderId){
      matchingOrder=order;
      matchingOrder.products.forEach((product)=>{
        if(product.productId===productId){
            matchingProduct=product;
        }
      })
    }

  })
  return matchingProduct
}