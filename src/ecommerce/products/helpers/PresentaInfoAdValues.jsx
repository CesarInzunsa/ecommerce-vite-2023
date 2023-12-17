import { PresentaInfoAdModel} from "../models/PresentaInfoAdModel";

export const PresentaInfoAdValues = (values) => {
    let Product = PresentaInfoAdModel()
        Product.IdEtiquetaOK = values.IdEtiquetaOK,
        Product.Valor = values.Valor
    return Product
}