import axios from "axios";

export function AddOneProduct(product) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_POST_ONE_PRODUC, product)
            .then((response) => {

                console.log("<<RESPONSE>> AddOneProduct", product)

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