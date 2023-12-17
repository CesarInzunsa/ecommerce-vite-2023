import axios from "axios";

export function GetOneProduct(IdProdServOK, IdInstitutoOK) {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_GET_ONE_PRODUC + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK)
            .then((response) => {
                const data = response.data;

                if (!data.success) {
                    console.error("No se pudo realizar correctamente la petición <<getOneProducts - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else if (data.data.length === 0) {
                    console.info("🛈 No se encontraron documentos en <<cat_prod_serv>>");
                    resolve([]);
                } else if (data.success) {
                    const ProductsData = data.data[0].dataRes;
                    //console.log("Colección: <<cat_prod_serv>>", ProductsData);
                    resolve(JSON.parse(JSON.stringify(ProductsData))); // Resuelve la promesa y hace una copia profunda
                }
            })
            .catch((error) => {
                console.error("Error en <<getOneProducts - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });

}