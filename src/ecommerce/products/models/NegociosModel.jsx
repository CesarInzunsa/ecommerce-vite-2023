import {getDetailRow} from "../helpers/Utils.jsx";

export function NegociosModel() {
    let Product = {
        IdNegocioOK: {type: String},
        detail_row: getDetailRow(),
    };
    return Product
};