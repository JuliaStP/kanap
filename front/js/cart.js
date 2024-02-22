let myCart = localStorage.getItem("cart") || "[]";
let myCartArr = JSON.parse(myCart);
console.log(myCartArr);

function showCart(myCartArr) {
  const cartItems = document.getElementById("cart__items");

  for (let arr = 0; arr < myCartArr.length; arr++) {
    const blockOfCode = `
        <article class="cart__item" id="${myCartArr[arr]._id}" data-id="${myCartArr[arr]._id}" data-color="${myCartArr[arr].color}">
        <div class="cart__item__img">
          <img src="${myCartArr[arr].imageUrl}" alt="${myCartArr[arr].altText}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${myCartArr[arr].name}</h2>
            <p>${myCartArr[arr].color}</p>
            <p class='itemPrice'>$ ${myCartArr[arr].price}</p>
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

    function getTotals() {
      let itemQuantity = document.querySelectorAll(".itemQuantity");
      let total = document.querySelector("#totalQuantity");
      let totalQuantity = 0;

      for (let i = 0; i < itemQuantity.length; i++) {
        totalQuantity = totalQuantity + itemQuantity[i].valueAsNumber;
      }
      total.innerHTML = totalQuantity;

      let itemPrice = document.querySelectorAll(".itemPrice");
      let totalP = document.querySelector("#totalPrice");
      let totalPrice = 0;

      for (let i = 0; i < itemPrice.length; i++) {
        totalPrice =
          totalPrice + itemQuantity[i].valueAsNumber * myCartArr[i].price;
      }
      totalP.innerHTML = totalPrice;
    }
    getTotals();

    let btn = document.querySelectorAll(".deleteItem");

    btn.forEach(function (elem) {
      elem.addEventListener("click", function (e) {
        e.preventDefault();

        let prodCard = e.target.closest("article");
        prodCard.remove();

        let idDel = myCartArr[arr].id;
        console.log(idDel);
        let colorDel = myCartArr[arr].color;

        myCartArr = myCartArr.filter(
          (i) => i.id !== idDel || i.color !== colorDel
        );

        myCart = JSON.stringify(myCartArr);
        localStorage.setItem("cart", myCart);
      });
    });

    function modQuantity() {
      let prodQuantity = document.querySelectorAll(".itemQuantity");

      for (let arr = 0; arr < prodQuantity.length; arr++) {
        prodQuantity[arr].addEventListener("change", (e) => {
          e.preventDefault();

          prodQuantity.textContent = e.target.value;
          let updatedQuantity = e.target.value;
          console.log(updatedQuantity);

          let modQuantity = myCartArr[arr].quantity;
          console.log(modQuantity);

          const finalQuantity = myCartArr.find((i) => {
            const quantMatch = updatedQuantity !== modQuantity;
            console.log("quantMatch", quantMatch);
            return quantMatch;
          });

          if (finalQuantity) {
            myCartArr[arr].quantity = updatedQuantity;
            console.log(updatedQuantity);

            myCart = JSON.stringify(myCartArr);
            localStorage.setItem("cart", myCart);
          }
        });
      }
    }
  }
  modQuantity();
}
showCart(myCartArr);

let form = document.querySelector(".cart__order__form");
let orderBtn = document.querySelector("#order");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validForm();
  if(!firstNameErrorMsg.innerHTML && !lastNameErrorMsg.innerHTML && !cityErrorMsg.innerHTML && !emailErrorMsg.innerHTML && !addressErrorMsg.innerHTML) {
    postForm();
  }
});

function validForm() {
  let regExp = new RegExp("^[A-Za-zs]+$");
  let emailRegExp = new RegExp("^[^s@]+@[^s@]+.[^s@]+$");
  let addressRegExp = new RegExp("^[a-zA-Z0-9s,'-]*$");

  function isValidString(string) {
    return regExp.test(string);
  }

  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  if (isValidString(firstName.value)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML = "Please input correct first name.";
  }

  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  if (isValidString(lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML = "Please input correct last name.";
  }

  let cityErrorMsg = document.querySelector("#cityErrorMsg");
  if (isValidString(city.value)) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.innerHTML = "Please input correct city.";
  }

  let emailErrorMsg = document.querySelector("#emailErrorMsg");
  function isValidEmail(email) {
    return emailRegExp.test(email);
  }
  if (isValidEmail(email.value)) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "Please input correct email.";
  }

  let addressErrorMsg = document.querySelector("#addressErrorMsg");
  function isValidAddress(address) {
    return addressRegExp.test(address);
  }
  if (isValidAddress(address.value)) {
    addressErrorMsg.innerHTML = "";
  } else {
    addressErrorMsg.innerHTML = "Please input correct address.";
  }

  form.firstName.addEventListener("change", () => {
    isValidString();
  });

  form.lastName.addEventListener("change", () => {
    isValidString();
  });

  form.city.addEventListener("change", () => {
    isValidString();
  });

  form.email.addEventListener("change", () => {
    isValidEmail();
  });

  form.address.addEventListener("change", () => {
    isValidAddress();
  });
}

function postForm() {
  let firstName = document.querySelector("#firstName");
  let lastName = document.querySelector("#lastName");
  let address = document.querySelector("#address");
  let city = document.querySelector("#city");
  let email = document.querySelector("#email");

  let productIds = [];
  for (let i = 0; i < myCartArr.length; i++) {
    productIds.push(myCartArr[i].id);
  }
  console.log(productIds);

  let order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: productIds,
  };

  const orders = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      Accept: "applicaton/json",
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  fetch("http://localhost:3000/api/products/order", orders)
    .then((res) => res.json())
    .then((data) => {
      // LocalStorage version:
      // let parsedData = JSON.stringify(data);
      // localStorage.clear();
      // localStorage.setItem("orders", parsedData);
      // document.location.href = "confirmation.html";
      let gotOrderId = data.orderId;
      window.location.href = `/front/html/confirmation.html?orderId=${gotOrderId}`;
    })
    .catch((error) => console.log(error));
}
