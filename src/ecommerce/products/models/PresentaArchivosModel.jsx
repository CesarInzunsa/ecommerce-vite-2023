import {getDetailRow} from "../helpers/Utils.jsx";

export function PresentaArchivosModel() {
    let Product = {
        IdArchivoOK: {type: String},
        IdArchivoBK: {type: String},
        DesArchivo: {type: String},
        RutaArchivo: {type: String},
        IdTipoArchivoOK: {type: String},
        Archivo: {type: String},
        IdSeccionOK: {type: String},
        Seccion: {type: String},
        Secuencia: {type: Number},
        Principal: {type: String},
        VerSiempre: {type: String},
        detail_row: getDetailRow(),
    };
    return Product
};