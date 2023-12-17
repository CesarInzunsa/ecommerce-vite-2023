import {getDetailRow} from "../helpers/Utils.jsx";

export function PresentaInfoAdModel() {
    let Product = {
        IdEtiquetaOK: {type: String},
        Valor: {type: String},
        detail_row: getDetailRow(),
    };
    return Product
};