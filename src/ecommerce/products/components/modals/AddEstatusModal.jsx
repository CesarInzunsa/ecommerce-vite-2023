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
import {AddOneEstatus} from "../../services/remote/post/AddOneEstatus.jsx";
//FIC: Helpers
import {EstatusValues} from "../../helpers/EstatusValues.jsx";
import MenuItem from "@mui/material/MenuItem";

const AddEstatusModal = ({AddProductShowModal, setAddProductShowModal, datosSeleccionados}) => {

    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdEstatusOK: "",
            Estatus: "",
            Actual: "",
            Observacion: "",
        },
        validationSchema: Yup.object({
            IdEstatusOK: Yup.string().required("Campo requerido"),
            Estatus: Yup.string().required("Campo requerido"),
            Actual: Yup.string().required("Campo requerido"),
            Observacion: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            //FIC: mostramos el Loading.
            setLoading(true);
            //FIC: notificamos en consola que si se llamo y entro al evento.
            console.log("FIC: entro al onSubmit despues de hacer click en boton Guardar");
            //FIC: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //FIC: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const Product = EstatusValues(values);
                //FIC: mandamos a consola los datos extraidos
                //console.log("<<Product>>", Product);
                //FIC: llamar el metodo que desencadena toda la logica
                //para ejecutar la API "AddOneInstitute" y que previamente
                //construye todo el JSON de la coleccion de Product para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneEstatus(datosSeleccionados.IdInstitutoOK, datosSeleccionados.IdProdServOK, Product);
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
                        <strong>Agregar Nuevo Estado</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Productos */}
                <DialogContent
                    sx={{display: 'flex', flexDirection: 'column'}}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdEstatusOK"
                        label="IdEstatusOK*"
                        value={formik.values.IdEstatusOK}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.IdEstatusOK && Boolean(formik.errors.IdEstatusOK)}
                        helperText={formik.touched.IdEstatusOK && formik.errors.IdEstatusOK}
                    />
                    <FormControl fullWidth margin="dense" disabled={!!mensajeExitoAlert}
                                 error={formik.touched.Estatus && Boolean(formik.errors.Estatus)}>
                        <InputLabel htmlFor="Estatus">Estatus*</InputLabel>
                        <Select
                            id="Estatus"
                            name="Estatus"
                            value={formik.values.Estatus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <MenuItem value="Activo">Activo</MenuItem>
                            <MenuItem value="Baja">Baja</MenuItem>
                        </Select>
                        {formik.touched.Estatus && formik.errors.Estatus && (
                            <FormHelperText>{formik.errors.Estatus}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth margin="dense" disabled={!!mensajeExitoAlert}
                                 error={formik.touched.Actual && Boolean(formik.errors.Actual)}>
                        <InputLabel htmlFor="Actual">Actual*</InputLabel>
                        <Select
                            id="Actual"
                            name="Actual"
                            value={formik.values.Actual}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <MenuItem value="S">S</MenuItem>
                            <MenuItem value="N">N</MenuItem>
                        </Select>
                        {formik.touched.Actual && formik.errors.Actual && (
                            <FormHelperText>{formik.errors.Actual}</FormHelperText>
                        )}
                    </FormControl>
                    <TextField
                        id="Observacion"
                        label="Observacion*"
                        value={formik.values.Observacion}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.Observacion && Boolean(formik.errors.Observacion)}
                        helperText={formik.touched.Observacion && formik.errors.Observacion}
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
export default AddEstatusModal;