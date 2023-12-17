import {getDetailRow} from "../helpers/Utils.jsx";

export function ProductModel() {
    let Product = {
        IdInstitutoOK: {type: String},
        IdProdServOK: {type: String},
        IdProdServBK: {type: String},
        CodigoBarras: {type: String},
        DesProdServ: {type: String},
        Indice: {type: String},
        cat_prod_serv_estatus: [],
        cat_prod_serv_info_ad: [],
        cat_prod_serv_presenta: [],
        cat_prod_serv_negocios: [],
        detail_row: getDetailRow(),
    };
    return Product
};