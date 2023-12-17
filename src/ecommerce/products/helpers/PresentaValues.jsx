import {PresentaModel} from "../models/PresentaModel";
export const PresentaValues = (values) => {
    let Product = PresentaModel()
        Product.IdPresentaOK = values.IdPresentaOK,
        Product.IdPresentaBK = values.IdPresentaBK,
        Product.DesPresenta = values.DesPresenta
    return Product
}