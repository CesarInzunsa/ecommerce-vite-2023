import {GetOneProduct} from "../get/GetOneProduct.jsx";
import {AddOneProduct} from "../post/AddOneProduct.jsx";
import {UpdateOneProduct} from "../put/UpdateOneProduct.jsx";

export async function UpdateOrCreateProducts(productos) {

    // Recorremos los productos
    productos.map(async (producto) => {
        try {
            // Realizamos una solicitud GET ONE para comprobar si existe
            const productoQueSiExiste = await GetOneProduct(producto.IdProdServOK, producto.IdInstitutoOK);
            //console.log("productoQueSiExiste: " + productoQueSiExiste)

            // Si existe lo actualizamos
            if (productoQueSiExiste) {
                await UpdateOneProduct(producto.IdProdServOK, producto.IdInstitutoOK, producto);
            }
        } catch (error) {
            // Si hay un error al realizar la consulta es porque el producto no exiten
            // Realizamos una solicitud POST para crear el producto
            await AddOneProduct(producto);
            //console.log("error en el segundo try" + error);
        }
    });
}
