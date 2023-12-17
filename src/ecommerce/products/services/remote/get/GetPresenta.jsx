import axios from "axios";

export function GetPresenta(IdProdServOK, IdInstitutoOK) {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_GET_ONE_PRODUC + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK)
            .then((response) => {
                const data = response.data;

                if (!data.success) {
                    console.error("No se pudo realizar correctamente la petición <<GetPresenta - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else if (data.data.length === 0) {
                    console.info("🛈 No se encontraron documentos en <<cat_prod_serv>>");
                    resolve([]);
                } else if (data.success) {
                    const ProductData = data.data[0].dataRes.cat_prod_serv_presenta;
                    //console.log("Colección: <<console.log(data)>>", ProductData);
                    resolve(JSON.parse(JSON.stringify(ProductData))); // Resuelve la promesa y hace una copia profunda
                }
            })
            .catch((error) => {
                console.error("Error en <<GetPresenta - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}