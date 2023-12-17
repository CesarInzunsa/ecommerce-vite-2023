import axios from "axios";

export function AddOnePresentaArchivos(IdInstitutoOK, IdProdServOK, IdPresentaOK, IdPresentaBK, subDoc) {

    console.log("<<EJECUTA>> API <<AddOnePresentaArchivos>> Requiere:", subDoc)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_ADD_ONE_PRESENTA_ARCHIVOS_PRODSERV_URL + 'IdProdServOK=' + IdProdServOK + '&IdInstitutoOK=' + IdInstitutoOK + '&IdPresentaOK=' + IdPresentaOK + '&IdPresentaBK=' + IdPresentaBK, subDoc)
            .then((response) => {

                console.log("<<RESPONSE>> AddOnePresentaArchivos", subDoc)

                const data = response.data;
                if (!data.success) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOnePresentaArchivos>> de forma correcta", data);
                    reject(data);
                } else if (data.success) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOnePresentaArchivos>>", error);
                reject(error);
            });
    });
}