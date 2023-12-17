import {PresentaArchivosModel} from "../models/PresentaArchivosModel.jsx";

export const PresentaArchivosValues = (values) => {
    let Product = PresentaArchivosModel()
    Product.IdArchivoOK = values.IdArchivoOK,
        Product.IdArchivoBK = values.IdArchivoBK,
        Product.DesArchivo = values.DesArchivo,
        Product.RutaArchivo = values.RutaArchivo,
        Product.IdTipoArchivoOK = values.IdTipoArchivoOK,
        Product.Archivo = values.Archivo,
        Product.IdSeccionOK = values.IdSeccionOK,
        Product.Seccion = values.Seccion,
        Product.Secuencia = values.Secuencia,
        Product.Principal = values.Principal,
        Product.VerSiempre = values.VerSiempre
    return Product
}