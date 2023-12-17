import axios from "axios";

export function AddOnePresenta(IdInstitutoOK, IdProdServOK, presenta) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", presenta)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_ADD_ONE_PRESENTA_PRODSERV_URL + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK, presenta)
            .then((response) => {

                console.log("<<RESPONSE>> AddOneProduct", presenta)

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