import {EstatusModel} from "../models/EstatusModel.jsx";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const EstatusValues = (values) => {
    let Product = EstatusModel()
        Product.IdEstatusOK = values.IdEstatusOK,
        Product.Estatus = values.Estatus,
        Product.Actual = values.Actual,
        Product.Observacion = values.Observacion
    return Product
}