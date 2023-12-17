import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    DialogActions,
    Box,
    Alert,
    Select, FormHelperText, FormControl, InputLabel
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import {useFormik} from "formik";
import * as Yup from "yup";
//FIC: Services
//FIC: Helpers
import {NegociosValues} from "../../helpers/NegociosValues.jsx";
import MenuItem from "@mui/material/MenuItem";
import { AddOneNegocios } from "../../services/remote/post/AddOneNegocios.jsx";

const AddNegociosModal = ({AddProductShowModal, setAddProductShowModal, datosSeleccionados}) => {

    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdNegocioOK: "",
        },
        validationSchema: Yup.object({
            IdNegocioOK: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            //FIC: mostramos el Loading.
            setLoading(true);
            setTimeout(async () => {
                //FIC: notificamos en consola que si se llamo y entro al evento.
                console.log("FIC: entro al onSubmit despues de hacer click en boton Guardar");
                //FIC: reiniciamos los estados de las alertas de exito y error.
                setMensajeErrorAlert(null);
                setMensajeExitoAlert(null);
                try {
                    //FIC: Extraer los datos de los campos de
                    //la ventana modal que ya tiene Formik.
                    const Product = NegociosValues(values);
                    //FIC: mandamos a consola los datos extraidos
                    //console.log("<<Product>>", Product);
                    //FIC: llamar el metodo que desencadena toda la logica
                    //para ejecutar la API "AddOneInstitute" y que previamente
                    //construye todo el JSON de la coleccion de Product para
                    //que pueda enviarse en el "body" de la API y determinar si
                    //la inserción fue o no exitosa.
                    await AddOneNegocios(datosSeleccionados.IdInstitutoOK, datosSeleccionados.IdProdServOK, Product);
                    //FIC: si no hubo error en el metodo anterior
                    //entonces lanzamos la alerta de exito.
                    setMensajeExitoAlert("Producto fue creado y guardado Correctamente");
                    //FIC: falta actualizar el estado actual (documentos/data) para que
                    //despues de insertar el nuevo instituto se visualice en la tabla,
                    //pero esto se hara en la siguiente nota.
                    //fetchDataInstitute();
                } catch (e) {
                    setMensajeExitoAlert(null);
                    setMensajeErrorAlert("No se pudo crear el Producto");
                }
                //FIC: ocultamos el Loading.
                setLoading(false);
            }, 3000);
        },
    });

    //FIC: props structure for TextField Control.
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
                        <strong>Agregar Nueva Informacion Adicional</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Productos */}
                <DialogContent
                    sx={{display: 'flex', flexDirection: 'column'}}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdNegocioOK"
                        label="IdNegocioOK*"
                        value={formik.values.IdNegocioOK}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
                        helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{display: 'flex', flexDirection: 'row'}}
                >
                    <Box m="auto">
                        {console.log("mensajeExitoAlert", mensajeExitoAlert)}
                        {console.log("mensajeErrorAlert", mensajeErrorAlert)}
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
export default AddNegociosModal;