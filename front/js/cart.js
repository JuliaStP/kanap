let myCart = localStorage.getItem('cart') || '[]';
let myCartArr = JSON.parse(myCart);
console.log(myCartArr)