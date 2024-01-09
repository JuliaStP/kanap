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

        let currentProduct = {
            _id: myCartArr[arr]._id,
            color: myCartArr[arr].color,
            quantity: myCartArr[arr].quantity,
            name: myCartArr[arr].name,
            price: myCartArr[arr].price,
            description: myCartArr[arr].description,
            imageUrl: myCartArr[arr].imageUrl
          };

        btn.forEach(function(elem) {
            elem.addEventListener("click", function(e) {
                e.preventDefault();

                let prodCard = e.target.closest('article');
                prodCard.remove()
        
                let idDel = myCartArr[arr].id;
                let colorDel = myCartArr[arr].color

                myCartArr = myCartArr.filter( i => i.id !== idDel || i.color !== colorDel);

                myCart = JSON.stringify(myCartArr);
                localStorage.setItem('cart', myCart);
            });
        });



          let prodQuantity = document.querySelectorAll(".itemQuantity");

          prodQuantity.forEach(function(elem) {
            elem.addEventListener("change", function(e) {
                e.preventDefault();

                
                prodQuantity.textContent = e.target.value;
                let updatedQuantity = e.target.value;

                let modQuantity = myCartArr[arr].quantity;
                let selectedItem = myCartArr[arr];
                console.log(selectedItem);

                //updates all products in cart
                //how to get correct id??

                const finalQuantity = myCartArr.find((i) => i.updatedQuantity !== modQuantity);
                console.log(finalQuantity.id);

                finalQuantity.quantity = updatedQuantity;
                myCartArr[arr].quantity = updatedQuantity;
                console.log(updatedQuantity);

                myCart = JSON.stringify(myCartArr);
                localStorage.setItem('cart', myCart);
            });
        });
    }
}

showCart(myCartArr);
