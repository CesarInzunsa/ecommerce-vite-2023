import {getDetailRow} from "../helpers/Utils.jsx";

export function EstatusModel() {
    let Product = {
        IdEstatusOK: {type: String},
        Estatus: {type: String},
        Actual: {type: String},
        Observacion: {type: String},
        detail_row: getDetailRow(),
    };
    return Product
};