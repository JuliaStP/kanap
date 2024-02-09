// LocalStorage version:
// let myOrder = localStorage.getItem("orders");
// let myOrderArr = JSON.parse(myOrder);
// console.log(myOrderArr.orderId);

// let id = document.querySelector('#orderId');
// id.textContent = myOrderArr.orderId;
// localStorage.clear();

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let orderId = urlParams.get("orderId");

let id = document.querySelector("#orderId");
id.textContent = orderId;
localStorage.clear();