import {InfoAdModel} from "../models/InfoAdModel.jsx";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const InfoAdValues = (values) => {
    let Product = InfoAdModel()
    Product.IdEtiquetaOK = values.IdEtiquetaOK,
        Product.Valor = values.Valor
    return Product
}