const productosDOM = document.querySelector(".productos__center");
const carritoDOM = document.querySelector(".carrito");
const carritoCenter = document.querySelector(".carrito__center");
const openCarrito = document.querySelector(".carrito__icon");
const closeCarrito = document.querySelector(".close__carrito");
const overlay = document.querySelector(".carrito__overlay");
const carritoTotal = document.querySelector(".carrito__total");
const clearCarritoBtn = document.querySelector(".clear__carrito");
const itemTotales = document.querySelector(".item__total");
const detalles = document.getElementById("detalles");

let carrito = [];
let buttonDOM = [];

class UI {
  detallesProducto(id) {
    const filtroDato = productos.filter((item) => item.id == id);
    let result = "";
    filtroDato.forEach((producto) => {
      result += `      
        <article class="detalle-grid">
            <img
              src=${producto.image}
              class="img-fluid"
              height="200px"
              alt="..."
            />
            <div class="detalle-content">
              <h3>${producto.title}</h3>
              <div class="rating">
                <span>
                  <i class="bx bxs-star"></i>
                </span>
                <span>
                  <i class="bx bxs-star"></i>
                </span>
                <span>
                  <i class="bx bxs-star"></i>
                </span>
                <span>
                  <i class="bx bxs-star"></i>
                </span>
                <span>
                  <i class="bx bx-star"></i>
                </span>
              </div>
              <p class="price"><b>Precio: </b>$${producto.price}</p>
              <p class="description">
                <b>Descripcion: </b
                ><span
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, quia. Culpa iusto dolorem est ea tempora perspiciatis
                  nesciunt dicta labore aliquam adipisci libero alias, veniam eos
                  ipsum, quis, inventore hic</span
                >
              </p>
              <p class="description">
                <span
                  >Lorem ipsum dolor sit amet consectetur, adipisicing elit. In vel
                  omnis voluptate ipsam harum vero doloribus, eveniet quos, debitis
                  sit cupiditate quibusdam laborum ratione. Alias voluptatem at
                  delectus culpa fugiat?</span
                >
              </p>
              <div class="bottom">
                <div class="btn__group">
                  <button class="btn addToCart" data-id=${producto.id}>Anadir carrito</button>
                </div>
              </div>
            </div>
          </article>
          `;
    });
    detalles.innerHTML = result;
  }

  renderProductos(productos) {
    let result = "";
    productos.forEach((producto) => {
      result += `<div class="col-md-3 mt-3 producto">
      <div class="image__container">
        <img src="${producto.image}"/>
      </div>
        <div class="card-body producto__footer">
          <h5 class="card-title text-center">${producto.title}</h5>
          <p class="card-text">
            ${producto.descrip_1}
          </p>
          <div class="rating">
            <span>
              <i class="bx bxs-star"></i>
            </span>
            <span>
              <i class="bx bxs-star"></i>
            </span>
            <span>
              <i class="bx bxs-star"></i>
            </span>
            <span>
              <i class="bx bxs-star"></i>
            </span>
            <span>
              <i class="bx bx-star"></i>
            </span>
          </div>
          <div class="price">$${producto.price}</div>
          <div class="d-grid gap-2 bottom">
            <div class="btn__group">
              <button class="btn addToCart" data-id="${producto.id}">
                Añadir carrito
              </button>
              <a
                href="detalleProducto.html?id=${producto.id}"
                class="btn view"
                >Vista</a
              >
            </div>
          </div>
        </div>
    </div>
      `;
    });
    productosDOM.innerHTML = result;
  }

  getButtons() {
    const buttons = [...document.querySelectorAll(".addToCart")];
    buttonDOM = buttons;
    buttons.forEach((button) => {
      const id = button.dataset.id;
      const inCart = carrito.find((item) => item.id === parseInt(id, 10));

      if (inCart) {
        button.innerHTML = "En el carrito";
        button.disabled = true;
      }

      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.innerHTML = "En el carrito";
        e.target.disabled = true;

        // GET PRODUCTOS AL CARRITO
        const carritoItem = { ...Storage.getProductos(id), cantidad: 1 };

        // AGREGAMOS EL PRODUCTO AL CARRITO
        carrito = [...carrito, carritoItem];

        // GUARDAMOS EL CARRITO AL LOCALSTORAGE
        Storage.saveCart(carrito);

        // SET CART VALUES
        this.setItemValues(carrito);
        this.addCarritoItem(carritoItem);

        // SHOW AL CARRITO
      });
    });
  }

  setItemValues(carrito) {
    let tempTotal = 0;
    let itemTotal = 0;
    carrito.map((item) => {
      tempTotal += item.price * item.cantidad;
      itemTotal += item.cantidad;
    });
    carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
    itemTotales.innerText = itemTotal;
  }

  addCarritoItem({ image, price, title, id }) {
    const div = document.createElement("div");
    div.classList.add("carrito__item");

    div.innerHTML = `
        <img src=${image} alt="" />
        <div>
            <h3>${title}</h3>
            <p class="price">$${price}</p>
        </div>
        <div>
            <span class="increase" data-id=${id}>
                <i class="bx bxs-up-arrow"></i>
            </span>
            <p class="item__cantidad">1</p>
            <span class="decrease" data-id=${id}>
                <i class="bx bxs-down-arrow"></i>
            </span>
        </div>
        <div>
        <span class="remove__item" data-id=${id}>
                <i class="bx bx-trash"></i>
            </spam>
        </div>
        `;

    carritoCenter.appendChild(div);
  }

  show() {
    carritoDOM.classList.add("show");
    overlay.classList.add("show");
  }

  hide() {
    carritoDOM.classList.remove("show");
    overlay.classList.remove("show");
  }

  setAPP() {
    carrito = Storage.getCart();
    this.setItemValues(carrito);
    this.populate(carrito);
    openCarrito.addEventListener("click", this.show);
    closeCarrito.addEventListener("click", this.hide);
  }

  populate(carrito) {
    carrito.forEach((item) => this.addCarritoItem(item));
  }

  cartLogic() {
    clearCarritoBtn.addEventListener("click", () => {
      this.clearCarrito();
      this.hide();
    });

    carritoCenter.addEventListener("click", (e) => {
      const target = e.target.closest("span");
      const targetElement = target.classList.contains("remove__item");

      if (!target) return;
      if (targetElement) {
        const id = parseInt(target.dataset.id);
        this.removeItem(id);
        carritoCenter.removeChild(target.parentElement.parentElement);
      } else if (target.classList.contains("increase")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = carrito.find((item) => item.id === id);
        tempItem.cantidad++;
        Storage.saveCart(carrito);
        this.setItemValues(carrito);
        target.nextElementSibling.innerText = tempItem.cantidad;
      } else if (target.classList.contains("decrease")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = carrito.find((item) => item.id === id);
        tempItem.cantidad--;

        if (tempItem.cantidad > 0) {
          Storage.saveCart(carrito);
          this.setItemValues(carrito);
          target.previousElementSibling.innerText = tempItem.cantidad;
        } else {
          this.removeItem(id);
          carritoCenter.removeChild(target.parentElement.parentElement);
        }
      }
    });
  }

  clearCarrito() {
    const cartItems = carrito.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));

    while (carritoCenter.children.length > 0) {
      carritoCenter.removeChild(carritoCenter.children[0]);
    }
  }

  removeItem(id) {
    carrito = carrito.filter((item) => item.id !== id);
    this.setItemValues(carrito);
    Storage.saveCart(carrito);
    let button = this.singleButton(id);
    if (button) {
      button.disabled = false;
      button.innerText = "Anadir carrito";
    }
  }
  singleButton(id) {
    return buttonDOM.find((button) => parseInt(button.dataset.id) === id);
  }
}

class Storage {
  static saveProduct(obj) {
    localStorage.setItem("productos", JSON.stringify(obj));
  }

  static saveCart(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  static getProductos(id) {
    const producto = JSON.parse(localStorage.getItem("productos"));
    return producto.find((producto) => producto.id === parseFloat(id, 10));
  }

  static getCart() {
    return localStorage.getItem("carrito")
      ? JSON.parse(localStorage.getItem("carrito"))
      : [];
  }
}

class Productos {
  async getProductos() {
    try {
      const result = await fetch("productos.json");
      const data = await result.json();
      const productos = data.items;
      return productos;
    } catch (err) {
      console.log(err);
    }
  }
}

let category = "";
let productos = [];

function categoryValue() {
  const ui = new UI();

  category = document.getElementById("category").value;
  if (category.length > 0) {
    const producto = productos.filter((regx) => regx.category === category);
    ui.renderProductos(producto);
    ui.getButtons();
  } else {
    ui.renderProductos(productos);
    ui.getButtons();
  }
}

const query = new URLSearchParams(window.location.search);
let id = query.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  const productosLista = new Productos();
  const ui = new UI();

  ui.setAPP();

  productos = await productosLista.getProductos();
  if (id) {
    ui.detallesProducto(id);
    Storage.saveProduct(productos);
    ui.getButtons();
    ui.cartLogic();
  } else {
    ui.renderProductos(productos);
    Storage.saveProduct(productos);
    ui.getButtons();
    ui.cartLogic();
  }
});

// TODO: ALERTA AL MOMENTO DE COMPRAR
function confirmar() {
  alert("Gracias por su compra");
}
