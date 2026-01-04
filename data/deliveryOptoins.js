export const deliveryOptions = [{
    id:'1',
    deliveryDays:7,
    priceINR:0
},{
    id:'2',
    deliveryDays:3,
    priceINR:100
},{
    id:'3',
    deliveryDays:1,
    priceINR:200
}];

export function getDeliveryOption(deliveryOptionId){
let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id===deliveryOptionId){
        deliveryOption=option;
      }
    })
    return deliveryOption;
}