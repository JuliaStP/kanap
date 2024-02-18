const products = document.querySelector("#items");
fetch("https://kanap-backend-zhk3.onrender.com/api/products")
  .then((res) => res.json())
  .then((data) => product(data))
  .catch((error) => console.log(error));

const product = function (data) {
  for (let i in data) {
    const blockOfCode = `
            <a href="front/html/product.html?id=${data[i]._id}"> 
              <article>
                <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
                <h3 class="productName">${data[i].name}"</h3>
                <p class="productDescription">${data[i].description}</p>
              </article>
            </a> `;
    products.insertAdjacentHTML("beforeend", blockOfCode);
  }
};
