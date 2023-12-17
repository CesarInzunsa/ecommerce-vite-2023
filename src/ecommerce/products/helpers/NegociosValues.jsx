import {NegociosModel} from "../models/NegociosModel.jsx";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const NegociosValues = (values) => {
    let Product = NegociosModel()
        Product.IdNegocioOK = values.IdNegocioOK
    return Product
}