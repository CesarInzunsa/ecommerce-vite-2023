import {useState, useEffect} from "react";
import {Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {LoadingButton} from "@mui/lab";
//FIC: Services
import {GetOneProduct} from "../../../services/remote/get/GetOneProduct.jsx";

const AddProductDetailsModal = ({
                                    AddProductDetailsShowModal,
                                    setAddProductDetailsShowModal,
                                    IdProdServOK,
                                    IdInstitutoOK
                                }) => {

    const [ProductData, setProductData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const productData = await GetOneProduct(IdProdServOK, IdInstitutoOK);
                setProductData(productData);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        }

        fetchData();
    }, []);

    //FIC: props structure for TextField Control.
    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
    };

    return (
        <Dialog
            open={AddProductDetailsShowModal}
            onClose={() => setAddProductDetailsShowModal(false)}
            fullWidth
        >
            <form>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Ver Detalles</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Productos */}
                <DialogContent
                    sx={{display: 'flex', flexDirection: 'column'}}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK*"
                        value={ProductData.IdInstitutoOK}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={ProductData.IdProdServOK}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdProdServBK"
                        label="IdProdServBK*"
                        value={ProductData.IdProdServBK}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="CodigoBarras"
                        label="CodigoBarras*"
                        value={ProductData.CodigoBarras}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="DesProdServ"
                        label="DesProdServ*"
                        value={ProductData.DesProdServ}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Indice"
                        label="Indice*"
                        value={ProductData.Indice}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{display: 'flex', flexDirection: 'row'}}
                >
                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon/>}
                        variant="outlined"
                        onClick={() => setAddProductDetailsShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddProductDetailsModal;