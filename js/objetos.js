// Creo mi clase Producto

class Product {
  constructor(nameProduct, id, desc, price, stock, img) {
    this.nameProduct = nameProduct;
    this.id = id;
    this.desc = desc;
    this.price = price;
    this.stock = stock;
    this.img = img;
  }

  listProduct() {}
}

// Creo mis objetos

const drone = new Product("Drone II", 1, "lorem ipsum", 100, 10, "drone.jpg");
const cell = new Product("Iphone 13", 2, "lorem", 1000, 20, "celu.jpg");
const tablet = new Product(
  "Tablet Asus",
  3,
  "Asus 2022",
  2000,
  4,
  "tablet.jpg"
);
const consola = new Product(
  "PlayStation 5",
  4,
  "SSD 500 GB",
  80000,
  10,
  "play.jpg"
);

// Muestro el menu de compras
let compraCliente;
let total;
let compraTotal = [];

const comprar = () => {
  compraCliente = parseInt(
    prompt(`Listado de Productos

  Elija la opcion que desea
  1- ${drone.nameProduct}
  2- ${cell.nameProduct}
  3- ${tablet.nameProduct}
  4- ${consola.nameProduct}`)
  );

  total =
    compraCliente == 1
      ? `Usted realizo la compra de ${drone.nameProduct} por un total de $ ${drone.price}`
      : compraCliente == 2
      ? `Usted realizo la compra de ${cell.nameProduct} por un total de $ ${cell.price}`
      : compraCliente == 3
      ? `Usted realizo la compra de ${tablet.nameProduct} por un total de $ ${tablet.price}`
      : compraCliente == 4
      ? `Usted realizo la compra de ${consola.nameProduct} por un total de $ ${consola.price}`
      : "Ingrese una opcion valida";

  return total;
};

const compraParcial = comprar();
alert(compraParcial);

document.write(compraParcial);
