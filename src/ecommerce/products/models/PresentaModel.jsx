import {getDetailRow} from "../helpers/Utils.jsx";

export function PresentaModel() {
    let Product = {
        IdPresentaOK: {type: String},
        IdPresentaBK: {type: String},
        DesPresenta: {type: String},
        detail_row: getDetailRow(),
    };
    return Product
};