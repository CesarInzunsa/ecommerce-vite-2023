import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import {useFormik} from "formik";
import * as Yup from "yup";
//FIC: Services
import {AddOneProduct} from "../../services/remote/post/AddOneProduct.jsx";
//FIC: Helpers
import {ProductsValues} from "../../helpers/ProductsValues.jsx";
// importar el generador de ID
import {v4 as genID} from "uuid";

const AddProductModal = ({AddProductShowModal, setAddProductShowModal}) => {

    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [IdGen, setIdGen] = useState(genID().replace(/-/g, "").substring(0, 12));

    // Creamos un useEffect para que se ejecute cada vez que cambie el valor de IdInstitutoOK
    useEffect(() => {
        setIdGen(genID().replace(/-/g, "").substring(0, 12));
    }, []);

    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            /*IdProdServOK: "",*/
            IdProdServBK: "",
            CodigoBarras: "",
            DesProdServ: "",
            Indice: "",
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            /*IdProdServOK: Yup.string().required("Campo requerido"),*/
            IdProdServBK: Yup.string().required("Campo requerido"),
            CodigoBarras: Yup.string().required("Campo requerido"),
            DesProdServ: Yup.string().required("Campo requerido"),
            Indice: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            //FIC: mostramos el Loading.
            setLoading(true);
            //FIC: notificamos en consola que si se llamo y entro al evento.
            console.log("FIC: entro al onSubmit despues de hacer click en boton Guardar");
            //FIC: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            //Asignamos el IdInstitutoOK y el id generado de 12 caracteres a IdProdServOK
            values.IdProdServOK = `${formik.values.IdInstitutoOK}-${formik.values.IdProdServBK}-${IdGen}`;
            try {
                //FIC: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const Product = ProductsValues(values);
                //FIC: mandamos a consola los datos extraidos
                //console.log("<<Product>>", Product);
                //FIC: llamar el metodo que desencadena toda la logica
                //para ejecutar la API "AddOneInstitute" y que previamente
                //construye todo el JSON de la coleccion de Product para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneProduct(Product);
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
                        <strong>Agregar Nuevo Producto</strong>
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
                        value={formik.values.IdInstitutoOK}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
                    />
                    {/*
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={formik.values.IdProdServOK}
                        /* onChange={formik.handleChange} */
                        /*
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK)}
                        helperText={formik.touched.IdProdServOK && formik.errors.IdProdServOK}
                    />*/}
                    <TextField
                        id="IdProdServBK"
                        label="IdProdServBK*"
                        value={formik.values.IdProdServBK}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServBK && Boolean(formik.errors.IdProdServBK)}
                        helperText={formik.touched.IdProdServBK && formik.errors.IdProdServBK}
                    />
                    <TextField
                        id="CodigoBarras"
                        label="CodigoBarras*"
                        value={formik.values.CodigoBarras}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.CodigoBarras && Boolean(formik.errors.CodigoBarras)}
                        helperText={formik.touched.CodigoBarras && formik.errors.CodigoBarras}
                    />
                    <TextField
                        id="DesProdServ"
                        label="DesProdServ*"
                        value={formik.values.DesProdServ}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.DesProdServ && Boolean(formik.errors.DesProdServ)}
                        helperText={formik.touched.DesProdServ && formik.errors.DesProdServ}
                    />
                    <TextField
                        id="Indice"
                        label="Indice*"
                        value={formik.values.Indice}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.Indice && Boolean(formik.errors.Indice)}
                        helperText={formik.touched.Indice && formik.errors.Indice}
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
export default AddProductModal;