import axios from "axios";

export function AddInfoAd(IdInstitutoOK, IdProdServOK, estatus) {

    console.log("<<EJECUTA>> API <<AddInfoAd>> Requiere:", estatus)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_ADD_ONE_INFOAD_PRODSERV_URL + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK, estatus)
            .then((response) => {

                console.log("<<RESPONSE>> AddInfoAd", estatus)

                const data = response.data;
                if (!data.success) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddInfoAd>> de forma correcta", data);
                    reject(data);
                } else if (data.success) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddInfoAd>>", error);
                reject(error);
            });
    });
}