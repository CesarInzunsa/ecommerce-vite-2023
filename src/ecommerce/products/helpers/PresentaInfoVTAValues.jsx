import {PresentaInfoVTAModel} from "../models/PresentaInfoVTAModel"

export const PresentaInfoVTAValues = (values) => {
    let Product = PresentaInfoVTAModel()
        Product.IdEtiquetaOK = values.IdEtiquetaOK,
        Product.Valor = values.Valor
    return Product
}