import axios from "axios";

export function UpdateOneProduct(IdProdServOK, IdInstitutoOK, product) {
    const URL = import.meta.env.VITE_PUT_ONE_PRODUC + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK;
    console.log(URL);
    return new Promise((resolve, reject) => {
        axios.put(URL, product).then((response) => {

            const data = response.data;
            if (!data.success) {
                console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneProduct>> de forma correcta", data);
                reject(data);
            } else if (data.success) {
                resolve(data);
            }
        }).catch((error) => {
            console.error("<<ERROR>> en API <<UpdateOneProduct>>", error);
            reject(error);
        });
    });
}