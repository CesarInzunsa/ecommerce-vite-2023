import axios from "axios";

export function AddOneNegocios(IdInstitutoOK, IdProdServOK, negocio) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", negocio)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_ADD_ONE_NEGOCIO_PRODSERV_URL + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK, negocio)
            .then((response) => {

                console.log("<<RESPONSE>> AddOneProduct", negocio)

                const data = response.data;
                if (!data.success) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneProduct>> de forma correcta", data);
                    reject(data);
                } else if (data.success) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneProduct>>", error);
                reject(error);
            });
    });
}