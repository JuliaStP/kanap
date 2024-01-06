let myCart = localStorage.getItem('cart') || '[]';
let myCartArr = JSON.parse(myCart);
console.log(myCartArr)


function showCart(myCartArr) {
    const cartItems = document.getElementById('cart__items');

    for (let arr=0; arr < myCartArr.length; arr++) {

        const blockOfCode = `
        <article class="cart__item" id="${myCartArr[arr]._id}" data-id="${myCartArr[arr]._id}" data-color="${myCartArr[arr].color}">
        <div class="cart__item__img">
          <img src="${myCartArr[arr].imageUrl}" alt="${myCartArr[arr].altText}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${myCartArr[arr].name}</h2>
            <p>${myCartArr[arr].color}</p>
            <p>$ ${myCartArr[arr].price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p id="quantityText"> Quantity : </p>
              <input type="number" id="quantity" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${myCartArr[arr].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Delete</p>
            </div>
          </div>
        </div>
      </article>
        `;

        cartItems.insertAdjacentHTML("beforeend", blockOfCode);

        let btn = document.querySelectorAll(".deleteItem");

        btn.forEach(function(elem) {
            elem.addEventListener("click", function(e) {
                let prodCard = e.target.closest('article');
                prodCard.remove()
        
                let i = myCartArr.indexOf(1);
                item = myCartArr.splice(i, 1);
                localStorage.removeItem(item);

                myCartArr.splice(i, 0);
                myCart = JSON.stringify(myCartArr);
                localStorage.setItem('cart', myCart);

                myCart = localStorage.getItem('cart') || '[]';
                myCartArr = JSON.parse(myCart);

            });
        });
    }
}

showCart(myCartArr);





const cartItems = document.getElementById('cart__items');
const prodCards = document.getElementsByClassName('cart__item');

// cartItems.addEventListener('click', (e) => {
//     let prodCard = e.target.closest('div')
//     //get id of the product
//     //delete from dom
//     //delete from localStorage
//     console.log(prodCard);

// })



// for (let i = 0; i < deleteBtn.length; i++) {
//     deleteBtn[i].addEventListener('click', (e) => {
//         e.preventDefault();
//         const cartItems = document.getElementById('cart__items');
//         const prodCards = document.getElementsByClassName('cart__item');
//         console.log(prodCards);
//         for (let i = 0; i < myCartArr.length; i++) {
//             // let index = myCartArr.indexOf(this);
//             myCartArr.shift(myCartArr[i]);
        
//             // myCartArr.splice(i,1)
//             // myCartArr[i].remove();
//         }
//             // let index = myCartArr.indexOf(this);
            
        
//             // myCartArr.splice(index,1)
//             // newArr = cartItems.remove(prodCards[0]);

//             // console.log(prodCards);

//             // console.log(myCartArr);
//             // myCartArr.push(newArr);
//             // myCart = JSON.stringify(newArr);
//             // localStorage.setItem('cart', myCart);
//             // myCart = localStorage.getItem('cart');
//             // myCartArr = JSON.parse(myCart);
//     })  
// }









const prodQuantity = document.getElementById('quantity');
const quantityText = document.getElementById('quantityText');


prodQuantity.addEventListener('change', (e) => {  
    // for (let i = 0; i < myCartArr.length; i++) {
    myCartArr.shift(myCartArr[0]);
    prodQuantity.textContent = e.target.value;
    myCartArr[0].quantity = e.target.value
    myCartArr.push(myCartArr[0]);
    myCart = JSON.stringify(myCartArr);
    localStorage.setItem('cart', myCart);
    // }
})
