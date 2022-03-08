// Funcionalidad del Boton COMPRAR

const clickButton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = [];

clickButton.forEach((btn) => {
  btn.addEventListener("click", addToCarritoItem);
});

// .closest ==> Obtener la clase mas cercana al valor que le paso
function addToCarritoItem(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
  // Time que dura el alert de anadido
  const alert = document.querySelector(".alert");
  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  const inputElement = tbody.getElementsByClassName("input_element");

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = inputElement[i];
      inputValue.value++;
      carritoTotal();
      return null;
    }
  }
  carrito.push(newItem);
  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("itemCarrito");
    const content = `
    <th scope="row">1</th>
            <td class="tableProductos">
              <img src="${item.img}" alt="" />
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="tablePrecio"><p>${item.precio}</p></td>
            <td class="tableCantidad">
              <input type="number" min="1" value=${item.cantidad} class='input_element' />
              <button class="delete btn btn-danger">X</button>
            </td>
    `;
    tr.innerHTML = content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
    tr.querySelector(".input_element").addEventListener("change", sumCantidad);
  });
  carritoTotal();
}

const carritoTotal = () => {
  let total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    total = total + precio * item.cantidad;
  });

  itemCartTotal.innerHTML = `Total $ ${total}`;
  addLocalStorage();
};

const removeItemCarrito = (e) => {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".itemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  // Time que dura el alert de eliminado
  const alert = document.querySelector(".remove");
  setTimeout(function () {
    alert.classList.add("remove");
  }, 2000);
  alert.classList.remove("remove");

  tr.remove();
  carritoTotal();
};

const sumCantidad = (e) => {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".itemCarrito");
  const title = tr.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      carritoTotal();
    }
  });
  console.log(carrito);
};

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};
