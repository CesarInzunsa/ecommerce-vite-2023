import axios from "axios";

export function AddManyProducts(product) {

    console.log("<<EJECUTA>> API <<AddManyProducts>> Requiere:", product)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_GET_ALL_PRODSERV_URL, product)
            .then((response) => {

                console.log("<<RESPONSE>> AddManyProducts", product)

                const data = response.data;
                if (!data.success) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddManyProducts>> de forma correcta", data);
                    reject(data);
                } else if (data.success) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddManyProducts>>", error);
                reject(error);
            });
    });
}