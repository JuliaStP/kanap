let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id');
console.log(productId);


let myCart = localStorage.getItem('cart') || '[]';
let myCartArr = JSON.parse(myCart);




fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    getProduct(data);
})
  .catch((error) => console.log(error));



  




function getProduct (data) {
  const productsItem = document.getElementsByClassName("item")[0];

  // let colors = document.querySelector("#colors")[0];
  // for (let color of colors) {
  //   let code = 
  //   `<option value="${color}">  </option>`;
  //   colors.insertAdjacentHTML("beforeend", code);
  // };

  //var options 
  //inject options below. 


  
  const blockOfCode = `
    <article>
    <div class="item__img">
       <img src='${data.imageUrl}'>
    </div>
    <div class="item__content">

      <div class="item__content__titlePrice">
        <h1 id="title">${data.name}</h1>
        <p>Price : <span id="price">${data.price}</span>€</p>
      </div>

      <div class="item__content__description">
        <p class="item__content__description__title">Description:</p>
        <p id="description"> ${data.description} </p>
      </div>

      <div class="item__content__settings">
        <div class="item__content__settings__color">
          <label for="color-select">Chose your color:</label>
          <select name="color-select" id="colors">
          <option value="">--Please, select a color --</option>
          ${data.colors.map((color) => "<option value=" + color + ">" + color + "</option>")}
          </select>
        </div>

        <div class="item__content__settings__quantity">
          <label for="itemQuantity">Number of articles (1-100):</label>
          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
        </div>
      </div>

      <div class="item__content__addButton">
        <button id="addToCart">Add to cart</button>
      </div>

    </div>
            `;



    productsItem.insertAdjacentHTML("beforeend", blockOfCode);  
    
    const prodQuantity = document.getElementById('quantity');
    const prodColor = document.getElementById('colors');

    const currentProduct = {
      id: productId,
      color: '',
      quantity: 0
    };
    
    function addToCart() {
      myCartArr.push(currentProduct);
      myCart = JSON.stringify(myCartArr);
      localStorage.setItem('cart', myCart);
    }

    const addToCartBtn = document.getElementById('addToCart');

    addToCartBtn.addEventListener('click', ($event) => {
      $event.preventDefault();
      addToCart(currentProduct);
      console.log(currentProduct);
    })    
    
    prodQuantity.addEventListener('change', () => 
    currentProduct.quantity = document.querySelector('#quantity').value
    )
  
    prodColor.addEventListener('change', () => 
      currentProduct.color = document.querySelector('#colors').value
    )
};









// function updateProduct(data) {
//   currentProduct.id = data.id;
//   currentProduct.color = data.color;
//   currentProduct.quantity = data.quantity;
// }




// updateCurrentProduct(currentProduct);
// console.log(currentProduct);






