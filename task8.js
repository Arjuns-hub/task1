let allProducts = [];
let filteredProducts = [];

const container = document.getElementById("products");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("error");

// FETCH DATA
async function fetchProducts() {
  try {
    loader.style.display = "block";

    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();

    allProducts = data;
    filteredProducts = data;

    displayProducts(data);
    loader.style.display = "none";
  } catch (error) {
    loader.style.display = "none";
    errorMsg.innerText = "Error loading data";
  }
}

// DISPLAY
function displayProducts(products) {
  container.innerHTML = "";

  products.forEach(p => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}">
      <h3>${p.title.slice(0,20)}</h3>
      <p>${p.description.slice(0,60)}</p>
      <button>₹ ${p.price}</button>
      <button onclick="viewDetails(${p.id})">View More</button>
    `;

    container.appendChild(card);
  });
}

// SEARCH
document.getElementById("search").addEventListener("input", e => {
  let value = e.target.value.toLowerCase();

  filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );

  displayProducts(filteredProducts);
});

// SORT
function sortLow() {
  let sorted = [...filteredProducts].sort((a,b) => a.price - b.price);
  displayProducts(sorted);
}

function sortHigh() {
  let sorted = [...filteredProducts].sort((a,b) => b.price - a.price);
  displayProducts(sorted);
}

// CATEGORY FILTER
document.getElementById("category").addEventListener("change", e => {
  let value = e.target.value;

  if (value === "all") {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(p => p.category === value);
  }

  displayProducts(filteredProducts);
});

// MODAL
function viewDetails(id) {
  let product = allProducts.find(p => p.id === id);

  document.getElementById("modal-body").innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" width="100%">
    <p>${product.description}</p>
    <h3>₹ ${product.price}</h3>
  `;

  document.getElementById("modal").style.display = "block";
}

document.getElementById("close").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

// INIT
fetchProducts();