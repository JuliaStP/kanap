let myOrder = localStorage.getItem("orders");
let myOrderArr = JSON.parse(myOrder);
console.log(myOrderArr.orderId);

let id = document.querySelector('#orderId');
id.textContent = myOrderArr.orderId;
// localStorage.clear();