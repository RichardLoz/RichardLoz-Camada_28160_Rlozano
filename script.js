/* const calcularTotal = () => {
  let total = 0;
  let subTotal;

  do {
    subTotal = prompt(
      `Ingrese el valor de sus productos, y "Total" para saber el precio final `
    );

    const parsedSubTotal = +subTotal;

    if (parsedSubTotal) {
      total += parsedSubTotal;
    } else {
      //TODO: Con este else hago una comprobacion de que los valores ingresados sean correctos
      if (subTotal.toLowerCase() !== "total") alert("Ingrese un valor valido"); //TODO: Con toLowerCase, convierto todo a minuscula para validar.
    }
    //TODO: Itero hasta que el valor sea distinto de total.
  } while (subTotal.toLowerCase() !== "total");

  return total;
};

const precioFinal = calcularTotal();

alert(`El precio total de su compra es $ ${precioFinal}`); */

// TODO: Entrega complementaria - ARRAY -

// Se solicita al usuario que ingrese la cantidad de productos que desea agregar al Stock y ese numero sera la cantidad de iteraciones que hara el ciclo.

const agregarProducto = () => {
  let cantProductos = parseInt(
    prompt("Ingrese la cantidad de productos que desee agregar al inventario")
  );
  let stockGeneral = [];
  let producto;

  for (i = 0; i < cantProductos; i++) {
    producto = prompt("Ingrese su producto");
    stockGeneral.push(producto);
  }

  return stockGeneral;
};
const inventario = agregarProducto();
console.table(inventario);
