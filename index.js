const booksContainer = document.getElementById("booksContainer");
const cartList = document.getElementById("cartList");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("https://striveschool-api.herokuapp.com/books")
  .then((res) => {
    console.log("response: ", res);

    if (!res.ok) throw new Error("Errore nella fetch");
    return res.json();
  })
  .then((books) => {
    console.log("books: ", books);

    books.forEach((book) => {
      const col = document.createElement("div");
      col.classList.add("col-12", "col-md-6", "col-lg-3");

      col.innerHTML = `
        <div class="card h-100">
          <img src="${book.img}" class="card-img-top" alt="${book.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">💵 ${book.price} €</p>
            <div class="mt-auto">
              <button class="btn btn-danger btn-sm me-2 scartaBtn">Scarta</button>
              <button class="btn btn-success btn-sm compraBtn">Compra ora</button>
            </div>
          </div>
        </div>
      `;

      booksContainer.appendChild(col);

      col.querySelector(".scartaBtn").addEventListener("click", () => {
        col.remove();
      });

      col.querySelector(".compraBtn").addEventListener("click", () => {
        addToCart(book);
      });
    });
  })
  .catch((err) => console.error(err));

function addToCart(book) {
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((book, index) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    li.innerHTML = `
      <span>${book.title} - ${book.price}€</span>
      <button class="btn btn-sm btn-outline-danger">❌</button>
    `;
    li.querySelector("button").addEventListener("click", () =>
      removeFromCart(index)
    );
    cartList.appendChild(li);
  });
}

renderCart();
