import axios from "axios";

export function AddOnePresentaInfoAD(IdInstitutoOK, IdProdServOK, IdPresentaOK, IdPresentaBK, subDoc) {

    console.log("<<EJECUTA>> API <<AddOnePresentaInfoAD>> Requiere:", subDoc)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_ADD_ONE_PRESENTA_INFOAD_PRODSERV_URL + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK + '&IdPresentaOK=' + IdPresentaOK + '&IdPresentaBK=' + IdPresentaBK, subDoc)
            .then((response) => {

                console.log("<<RESPONSE>> AddOnePresentaInfoAD", subDoc)

                const data = response.data;
                if (!data.success) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOnePresentaInfoAD>> de forma correcta", data);
                    reject(data);
                } else if (data.success) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOnePresentaInfoAD>>", error);
                reject(error);
            });
    });
}