let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id');

// let myCartArr = [];
let myCart = localStorage.getItem('cart', []);
let myCartArr = JSON.parse(myCart);
// console.log(myCart);
// console.log(myCartArr);




fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    // updateProduct(data);
    getProduct(data);
})
  .catch((error) => console.log(error));

  // function updateProduct(val) {
  //   currentProduct.id = val._id;
  //   currentProduct.color = val.color;
  //   currentProduct.quantity = val.quantity;
  //   currentProduct.name = val.name;
  //   currentProduct.price = val.price;
  //   currentProduct.description = val.description;
  //   currentProduct.imageUrl = val.imageUrl;
  // }

  



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

    // let currentProduct = {
    //   id: productId,
    //   color: '',
    //   quantity: 0,
    //   name: '',
    //   price: '',
    //   description: '',
    //   imageUrl: ''
    // };
    // console.log(currentProduct);
    
    // function updateProduct(val) {
    //   currentProduct._id = val.id;
    //   currentProduct.color = val.color;
    //   currentProduct.quantity = val.quantity;
    //   currentProduct.name = val.name;
    //   currentProduct.description = val.description;
    //   currentProduct.imageUrl = val.imageUrl;
    // }

    // let updatedPro = updateProduct(currentProduct);

    // console.log(updatedPro);
    

    let currentProduct = {
      id: data._id,
      color: '',
      quantity: 0,
      name: data.name,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl
    };

    function checkProduct() {
      

      if (currentProduct.color === '' || currentProduct.quantity === 0) {
        alert('Please pick your color and quantity');
        return;
      }

      let letsPush;
      if (myCartArr.length ===0) {
        letsPush = true;
      }

      for (let index = 0; index < myCartArr.length; index++) {
        if(currentProduct.id === myCartArr[index].id && currentProduct.color === myCartArr[index].color) {
          // myCartArr.remove(currentProduct);
          myCartArr[index].quantity === ++currentProduct.quantity;
          // myCartArr.push(currentProduct);
          letsPush = false;
        } 
      }

      if(letsPush = true) {
        // localStorage.clear();
        myCartArr.push(currentProduct);
        addToCart()
      }  
    }
 
    function addToCart() {
      // let myCartArr = [];
      // myCartArr.push(currentProduct);
      myCart = JSON.stringify(myCartArr);
      localStorage.setItem('cart', myCart);
      
    }

    prodQuantity.addEventListener('change', () => 
    currentProduct.quantity = document.querySelector('#quantity').value,
    console.log(currentProduct)
    );
  
    prodColor.addEventListener('change', () => 
      currentProduct.color = document.querySelector('#colors').value,
      console.log(currentProduct)
    );

    const addToCartBtn = document.getElementById('addToCart');

    addToCartBtn.addEventListener('click', ($event) => {
      $event.preventDefault();
      // addToCart()
      checkProduct();
      console.log(currentProduct);
    })    
};








