import axios from "axios";

export function AddOnePresentaInfoVTA(IdInstitutoOK, IdProdServOK, IdPresentaOK, IdPresentaBK, subDoc) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", subDoc)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_ADD_ONE_PRESENTA_INFOVTA_PRODSERV_URL + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK + '&IdPresentaOK=' + IdPresentaOK + '&IdPresentaBK=' + IdPresentaBK, subDoc)
            .then((response) => {

                console.log("<<RESPONSE>> AddOnePresentaInfoVTA", subDoc)

                const data = response.data;
                if (!data.success) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOnePresentaInfoVTA>> de forma correcta", data);
                    reject(data);
                } else if (data.success) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOnePresentaInfoVTA>>", error);
                reject(error);
            });
    });
}