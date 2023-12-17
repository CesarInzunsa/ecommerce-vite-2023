import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    DialogActions,
    Box,
    Alert
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import {useFormik} from "formik";
import * as Yup from "yup";
//FIC: Services
import {AddOnePresentaArchivos} from "../../services/remote/post/AddOnePresentaArchivos.jsx";
//FIC: Helpers
import {PresentaArchivosValues} from "../../helpers/PresentaArchivosValues.jsx";

const AddPresentaArchivos = ({
                                 AddProductShowModal,
                                 setAddProductShowModal,
                                 datosSeleccionados,
                                 datosSecSubdocumentoPresenta
                             }) => {

    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdArchivoOK: "",
            IdArchivoBK: "",
            DesArchivo: "",
            RutaArchivo: "",
            IdTipoArchivoOK: "",
            Archivo: "",
            IdSeccionOK: "",
            Seccion: "",
            Secuencia: "",
            Principal: "",
            VerSiempre: "",
        },
        validationSchema: Yup.object({
            IdArchivoOK: Yup.string().required("Campo requerido"),
            IdArchivoBK: Yup.string().required("Campo requerido"),
            DesArchivo: Yup.string().required("Campo requerido"),
            RutaArchivo: Yup.string().required("Campo requerido"),
            IdTipoArchivoOK: Yup.string().required("Campo requerido"),
            Archivo: Yup.string().required("Campo requerido"),
            IdSeccionOK: Yup.string().required("Campo requerido"),
            Seccion: Yup.string().required("Campo requerido"),
            Secuencia: Yup.number().required("Campo requerido"),
            Principal: Yup.string().required("Campo requerido"),
            VerSiempre: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            //Mostramos el Loading.
            setLoading(true);
            //FIC: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //Extraer los datos de los campos de la ventana modal que ya tiene Formik.
                const Product = PresentaArchivosValues(values);
                //Llamar al servicio remoto para crear un insertar un nuevo documento / subdocumento.
                await AddOnePresentaArchivos(datosSeleccionados.IdInstitutoOK, datosSeleccionados.IdProdServOK, datosSecSubdocumentoPresenta.IdPresentaOK, datosSecSubdocumentoPresenta.IdPresentaBK, Product);
                //Si no hubo error en el metodo anterior entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("Producto fue creado y guardado Correctamente");
                //Actualizar la tabla de datos.
                //fetchDataInstitute();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Producto");
            }
            //Ocultamos el Loading.
            setLoading(false);
        },
    });

    //props structure for TextField Control.
    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog
            open={AddProductShowModal}
            onClose={() => setAddProductShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar un Nuevo Archivo</strong>
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
                        value={formik.values.IdArchivoOK}
                        error={formik.touched.IdArchivoOK && Boolean(formik.errors.IdArchivoOK)}
                        helperText={formik.touched.IdArchivoOK && formik.errors.IdArchivoOK}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdArchivoBK"
                        label="IdArchivoBK*"
                        value={formik.values.IdArchivoBK}
                        error={formik.touched.IdArchivoBK && Boolean(formik.errors.IdArchivoBK)}
                        helperText={formik.touched.IdArchivoBK && formik.errors.IdArchivoBK}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="DesArchivo"
                        label="DesArchivo*"
                        value={formik.values.DesArchivo}
                        error={formik.touched.DesArchivo && Boolean(formik.errors.DesArchivo)}
                        helperText={formik.touched.DesArchivo && formik.errors.DesArchivo}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="RutaArchivo"
                        label="RutaArchivo*"
                        value={formik.values.RutaArchivo}
                        error={formik.touched.RutaArchivo && Boolean(formik.errors.RutaArchivo)}
                        helperText={formik.touched.RutaArchivo && formik.errors.RutaArchivo}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdTipoArchivoOK"
                        label="IdTipoArchivoOK*"
                        value={formik.values.IdTipoArchivoOK}
                        error={formik.touched.IdTipoArchivoOK && Boolean(formik.errors.IdTipoArchivoOK)}
                        helperText={formik.touched.IdTipoArchivoOK && formik.errors.IdTipoArchivoOK}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Archivo"
                        label="Archivo*"
                        value={formik.values.Archivo}
                        error={formik.touched.Archivo && Boolean(formik.errors.Archivo)}
                        helperText={formik.touched.Archivo && formik.errors.Archivo}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdSeccionOK"
                        label="IdSeccionOK*"
                        value={formik.values.IdSeccionOK}
                        error={formik.touched.IdSeccionOK && Boolean(formik.errors.IdSeccionOK)}
                        helperText={formik.touched.IdSeccionOK && formik.errors.IdSeccionOK}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Seccion"
                        label="Seccion*"
                        value={formik.values.Seccion}
                        error={formik.touched.Seccion && Boolean(formik.errors.Seccion)}
                        helperText={formik.touched.Seccion && formik.errors.Seccion}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Secuencia"
                        label="Secuencia*"
                        value={formik.values.Secuencia}
                        error={formik.touched.Secuencia && Boolean(formik.errors.Secuencia)}
                        helperText={formik.touched.Secuencia && formik.errors.Secuencia}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Principal"
                        label="Principal*"
                        value={formik.values.Principal}
                        error={formik.touched.Principal && Boolean(formik.errors.Principal)}
                        helperText={formik.touched.Principal && formik.errors.Principal}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="VerSiempre"
                        label="VerSiempre*"
                        value={formik.values.VerSiempre}
                        error={formik.touched.VerSiempre && Boolean(formik.errors.VerSiempre)}
                        helperText={formik.touched.VerSiempre && formik.errors.VerSiempre}
                        {...commonTextFieldProps}
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{display: 'flex', flexDirection: 'row'}}
                >
                    <Box m="auto">
                        {mensajeErrorAlert && (
                            <Alert severity="error">
                                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                            </Alert>
                        )}
                        {mensajeExitoAlert && (
                            <Alert severity="success">
                                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                            </Alert>
                        )}
                    </Box>
                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon/>}
                        variant="outlined"
                        onClick={() => setAddProductShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="contained"
                        //onClick={() => setAddInstituteShowModal(false)}
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddPresentaArchivos;