let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id');

// let myCartArr = [];
let myCart = localStorage.getItem('cart', []);
let myCartArr = JSON.parse(myCart);

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    getProduct(data);
})
  .catch((error) => console.log(error));

function getProduct (data) {
  const productsItem = document.getElementsByClassName("item")[0];
  
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
    
    const prodQuantity = document.querySelector('#quantity');
    const prodColor = document.querySelector('#colors');
    let updatedColor = prodColor.value;
    let quant = prodQuantity.value;

    let currentProduct = {
      id: data._id,
      color: '',
      quantity: Number(quant),
      name: data.name,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl
    };

    prodQuantity.addEventListener('change', () => 
    currentProduct.quantity = document.querySelector('#quantity').value
    );
  
    prodColor.addEventListener('change', () => 
      currentProduct.color = document.querySelector('#colors').value
    );

    function checkProduct() {
      myCart = localStorage.getItem('cart', []);
      myCartArr = JSON.parse(myCart);
      
      if (currentProduct.color === '' || currentProduct.quantity === 0) {
        alert('Please pick your color and quantity');
        return;
      }

      if(myCartArr) {
        const checkItem = myCartArr.find( (i) => {
          const idMatch = i.id === productId
          const colorMatch = i.color === currentProduct.color
          console.log('idMatch', idMatch);
          console.log('colorMatch', colorMatch)
           return idMatch && colorMatch});
        console.log(checkItem); 
        if(checkItem) {
          let updatedQuantity = parseInt(currentProduct.quantity) + parseInt(checkItem.quantity);
          console.log(updatedQuantity);
          checkItem.quantity = updatedQuantity;
          myCart = JSON.stringify(myCartArr);
          localStorage.setItem('cart', myCart);
        } else {
          myCartArr.push(currentProduct);
          addToCart()
        }
      } else {
        myCartArr = [];
        myCartArr.push(currentProduct);
        addToCart()
      }
    }
 
    function addToCart() {
      // let myCartArr = [];
      myCart = JSON.stringify(myCartArr);
      localStorage.setItem('cart', myCart);
      // localStorage.clear();
      
    }

    const addToCartBtn = document.getElementById('addToCart');

    addToCartBtn.addEventListener('click', ($event) => {
      $event.preventDefault();
      // addToCart()
      checkProduct();
      console.log(currentProduct);
    })    
};








