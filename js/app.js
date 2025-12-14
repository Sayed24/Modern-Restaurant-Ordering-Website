const menuGrid = document.getElementById("menuGrid");
const filters = document.querySelectorAll(".filter");

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

const checkoutSection = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkoutForm");
const orderSuccess = document.getElementById("orderSuccess");

/* =====================
   MENU RENDER
===================== */
function renderMenu(items) {
  menuGrid.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-card-body">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
      </div>
      <div class="menu-card-footer">
        <strong>$${item.price}</strong>
        <button class="btn-primary" onclick="addToCart(${item.id})">
          Add
        </button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

renderMenu(menuData);

/* =====================
   FILTERS
===================== */
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    const filtered =
      category === "all"
        ? menuData
        : menuData.filter(item => item.category === category);

    renderMenu(filtered);
  });
});

/* =====================
   CART PANEL
===================== */
cartBtn.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

/* =====================
   CHECKOUT
===================== */
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) return alert("Your cart is empty");
  checkoutSection.classList.remove("hidden");
  cartPanel.classList.remove("open");
  window.scrollTo(0, checkoutSection.offsetTop);
});

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();

  checkoutForm.classList.add("hidden");
  orderSuccess.classList.remove("hidden");

  cart = [];
  localStorage.removeItem("cart");
  updateCartUI();
});
