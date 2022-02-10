const calcularTotal = () => {
  let total = 0;
  let subTotal;

  do {
    subTotal = prompt("Ingrese el valor de sus productos");

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

alert(`El precio total de su compra es $ ${precioFinal}`);
