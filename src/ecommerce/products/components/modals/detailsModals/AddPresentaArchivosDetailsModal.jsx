import React, {useState, useEffect} from "react";
import {Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {LoadingButton} from "@mui/lab";
//FIC: Services
import {GetOneProduct} from "../../../services/remote/get/GetOneProduct.jsx";

const AddProductDetailsModal = ({
                                    AddProductDetailsShowModal,
                                    setAddProductDetailsShowModal,
                                    datosSubDocArchivos
                                }) => {

    const [ProductData, setProductData] = useState(datosSubDocArchivos);

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
            onClose={() => setAddProductShowModal(false)}
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
                        id="IdArchivoOK"
                        label="IdArchivoOK*"
                        value={ProductData.IdArchivoOK}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdArchivoBK"
                        label="IdArchivoBK*"
                        value={ProductData.IdArchivoBK}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="DesArchivo"
                        label="DesArchivo*"
                        value={ProductData.DesArchivo}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="RutaArchivo"
                        label="RutaArchivo*"
                        value={ProductData.RutaArchivo}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdTipoArchivoOK"
                        label="IdTipoArchivoOK*"
                        value={ProductData.IdTipoArchivoOK}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Archivo"
                        label="Archivo*"
                        value={ProductData.Archivo}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdSeccionOK"
                        label="IdSeccionOK*"
                        value={ProductData.IdSeccionOK}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Seccion"
                        label="Seccion*"
                        value={ProductData.Seccion}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Secuencia"
                        label="Secuencia*"
                        value={ProductData.Secuencia}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Principal"
                        label="Principal*"
                        value={ProductData.Principal}
                        InputProps={{
                            readOnly: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="VerSiempre"
                        label="VerSiempre*"
                        value={ProductData.VerSiempre}
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