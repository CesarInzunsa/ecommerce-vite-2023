import React, {useState} from "react";
import {Alert, Box, Dialog, DialogActions, DialogContent, DialogTitle, Input, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import swal from "sweetalert";
//import { read, utils } from "xlsx";
import * as XLSX from "xlsx";
// Formik - Yup
import {useFormik} from "formik";
// Services
import {UpdateOrCreateProducts} from "../../services/remote/import/updateOrCreateProducts.jsx";
// Helpers
import {FormText} from "reactstrap";
// GenID
import {v4 as genID} from "uuid";


const ImportExcelProdcutsModal = ({ImportExcelProdcutsShowModal, setImportExcelProdcutsShowModal, actualizarTabla}) => {

    const [Loading, setLoading] = useState(false);
    const [excelRows, setExcelRows] = useState([]);
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [archivoValido, setArchivoValido] = useState(false);
    const [inputValue, setInputValue] = useState('');

    function getID(n) {
        return genID().replace(/-/g, "").substring(0, n);
    }

    actualizarTabla();

    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdProdServOK: "",
            IdProdServBK: "",
            CodigoBarras: "",
            DesProdServ: "",
            Indice: "",
        },
        onSubmit: async () => {
            //FIC: mostramos el Loading.
            setLoading(true);
            //FIC: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                setLoading(true);

                const confirmResult = await swal({
                    title: "Confirmación",
                    text: "¿Estás seguro de importar los productos?",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"],
                    dangerMode: true,
                });

                if (!confirmResult) {
                    // User clicked "Cancelar"
                    setLoading(false);
                    return;
                }

                // **********************

                await UpdateOrCreateProducts(excelRows);

                // **********************

                setInputValue('');
                setMensajeExitoAlert("Los producto fueron creados/actualizados y guardados Correctamente");
                setLoading(false);
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudieron crear los Productos");
                setLoading(false);
            }
            //FIC: ocultamos el Loading.
            setLoading(false);
        },
    });

    const readUploadFile = (e) => {
        e.preventDefault();

        const inputFile = e.target;
        const file = inputFile.files[0];

        if (!file) {
            swal({
                title: "Selecciona un archivo",
                text: "Ningún archivo fue seleccionado",
                icon: "warning",
                button: "aceptar"
            });
            return;
        }

        const allowedExtensions = ['.csv', '.xlsx', '.xls'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (allowedExtensions.indexOf(fileExtension) === -1) {
            swal({
                title: "Archivo inválido",
                text: "Solo se permiten archivos con extensiones" + allowedExtensions.join(', '),
                icon: "error",
                button: "aceptar"
            });
            //
            return;
        }

        setArchivoValido(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target.result;
                //const workbook = read(data, { type: 'array' });
                const workbook = XLSX.readFile(data);

                // Obtener los datos de todas las hojas del Excel 
                // Nombres de las hojas de excel
                const sheetNameProdServ = 'cat_prod_serv';

                // Nombres de las hojas de estatus
                const sheetNameProdServEstatus = 'cat_prod_serv_estatus';

                // Nombres de las hojas de informacion adicional
                const sheetNameProdServInfoAd = 'cat_prod_serv_info_ad';

                // Nombres de las hojas de presentaciones
                const sheetNameProdServPresenta = 'cat_prod_serv_presenta';

                const sheetNameProdServPresentaInfoVta = 'cat_prod_serv_info_vta';
                const sheetNameProdServPresentaInfoAd = 'cat_prod_serv_info_add';
                const sheetNameProdServPresentaPaquete = 'cat_prod_serv_paquete';
                const sheetNameProdServPresentaArchivos = 'cat_prod_serv_archivos';

                // Nombres de las hojas de archivos
                const sheetNameProdServNegocios = 'cat_prod_serv_negocios';

                // Obtencion de hojas de excel
                const worksheetProdServ = workbook.Sheets[sheetNameProdServ];
                const worksheetProdServEstatus = workbook.Sheets[sheetNameProdServEstatus];
                const worksheetProdServInfoAd = workbook.Sheets[sheetNameProdServInfoAd];
                const worksheetProdServPresenta = workbook.Sheets[sheetNameProdServPresenta];
                const worksheetProdServPresentaInfoAd = workbook.Sheets[sheetNameProdServPresentaInfoAd];
                const worksheetProdServPresentaInfoVta = workbook.Sheets[sheetNameProdServPresentaInfoVta];
                const worksheetProdServPresentaPaquete = workbook.Sheets[sheetNameProdServPresentaPaquete];
                const worksheetProdServPresentaArchivos = workbook.Sheets[sheetNameProdServPresentaArchivos];
                const worksheetProdServNegocios = workbook.Sheets[sheetNameProdServNegocios];

                // Convertir hoja de excel a json
                const dataProdServ = XLSX.utils.sheet_to_json(worksheetProdServ);
                const dataProdServEstatus = XLSX.utils.sheet_to_json(worksheetProdServEstatus);
                const dataProdServInfoAd = XLSX.utils.sheet_to_json(worksheetProdServInfoAd);
                const dataProdServPresenta = XLSX.utils.sheet_to_json(worksheetProdServPresenta);
                const dataProdServPresentaInfoAd = XLSX.utils.sheet_to_json(worksheetProdServPresentaInfoAd);
                const dataProdServPresentaInfoVta = XLSX.utils.sheet_to_json(worksheetProdServPresentaInfoVta);
                const dataProdServPresentaPaquete = XLSX.utils.sheet_to_json(worksheetProdServPresentaPaquete);
                const dataProdServPresentaArchivos = XLSX.utils.sheet_to_json(worksheetProdServPresentaArchivos);
                const dataProdServNegocios = XLSX.utils.sheet_to_json(worksheetProdServNegocios);

                // Generar JSON a insertar
                const JSON_cat_prod_serv_importar = dataProdServ.map(row => {
                    const ID_COMPARAR = row.IdProdServOK
                    const matchingEstatus = dataProdServEstatus.filter(estatus => estatus.IdProdServOK === ID_COMPARAR);
                    const matchingInfoAd = dataProdServInfoAd.filter(info => info.IdProdServOK === ID_COMPARAR);
                    const matchingPresenta = dataProdServPresenta.filter(presenta => presenta.IdProdServOK === ID_COMPARAR);
                    const matchingPresentaInfoAd = dataProdServPresentaInfoAd.filter(presentaInfoAd => presentaInfoAd.IdProdServOK === ID_COMPARAR);
                    const matchingPresentaInfoVta = dataProdServPresentaInfoVta.filter(presentaInfoVta => presentaInfoVta.IdProdServOK === ID_COMPARAR);
                    const matchingPresentaPaquete = dataProdServPresentaPaquete.filter(presentaPaquete => presentaPaquete.IdProdServOK === ID_COMPARAR);
                    const matchingPresentaArchivo = dataProdServPresentaArchivos.filter(presentaArchivo => presentaArchivo.IdProdServOK === ID_COMPARAR);
                    const matchingNegocios = dataProdServNegocios.filter(negocios => negocios.IdProdServOK === ID_COMPARAR);
                    // Agrega más hojas de Excel según sea necesario

                    // Generar modelo de cat_prod_serv_estatus
                    const estatusFields = matchingEstatus.map(estatus => ({
                        IdTipoEstatusOK: estatus.IdTipoEstatusOK,
                        Actual: estatus.Actual,
                        Observacion: estatus.Observacion,
                        detail_row: {
                            Activo: estatus.Activo,
                            Borrado: estatus.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(estatus.FechaReg),
                                UsuarioReg: estatus.UsuarioReg
                            },]
                        }
                    }));

                    // Generar modelo de cat_prod_serv_info_ad
                    const infoAdFields = matchingInfoAd.map(info => ({
                        IdEtiquetaOK: info.IdEtiquetaOK,
                        IdEtiqueta: info.IdEtiqueta,
                        Valor: info.Valor,
                        IdTipoSeccionOK: info.IdTipoSeccionOK,
                        Secuencia: info.Secuencia,
                        detail_row: {
                            Activo: info.Activo,
                            Borrado: info.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(info.FechaReg),
                                UsuarioReg: info.UsuarioReg
                            },]
                        }
                    }));

                    // Generar modelo del subdocumento de presenta info_vta
                    const presentaInfoVtaFields = matchingPresentaInfoVta.map(presentaInfoVta => ({
                        IdEtiquetaOK: presentaInfoVta.IdEtiquetaOK,
                        IdEtiqueta: presentaInfoVta.IdEtiqueta,
                        Valor: presentaInfoVta.Valor,
                        IdTipoSeccionOK: presentaInfoVta.IdTipoSeccionOK,
                        Secuencia: presentaInfoVta.Secuencia,
                        detail_row: {
                            Activo: presentaInfoVta.Activo,
                            Borrado: presentaInfoVta.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(presentaInfoVta.FechaReg),
                                UsuarioReg: presentaInfoVta.UsuarioReg
                            },]
                        }
                    }));

                    // Generar modelo del subdocumento de presenta info_ad
                    const presentaInfoAdFields = matchingPresentaInfoAd.map(presentaInfoAd => ({
                        IdEtiquetaOK: presentaInfoAd.IdEtiquetaOK,
                        IdEtiqueta: presentaInfoAd.IdEtiqueta,
                        Valor: presentaInfoAd.Valor,
                        IdTipoSeccionOK: presentaInfoAd.IdTipoSeccionOK,
                        Secuencia: presentaInfoAd.Secuencia,
                        detail_row: {
                            Activo: presentaInfoAd.Activo,
                            Borrado: presentaInfoAd.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(presentaInfoAd.FechaReg),
                                UsuarioReg: presentaInfoAd.UsuarioReg
                            },]
                        }
                    }));

                    // Generar modelo del subdocumento de presenta paquete
                    const presentaPaqueteFields = matchingPresentaPaquete.map(presentaPaquete => ({
                        IdPresentaOK: presentaPaquete.IdPresentaOK,
                        DesPresenta: presentaPaquete.DesPresenta,
                        Cantidad: presentaPaquete.Cantidad,
                        detail_row: {
                            Activo: presentaPaquete.Activo,
                            Borrado: presentaPaquete.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(presentaPaquete.FechaReg),
                                UsuarioReg: presentaPaquete.UsuarioReg
                            },]
                        }
                    }));

                    // Generar modelo del subdocumento de presenta archivo
                    const presentaArchivoFields = matchingPresentaArchivo.map(presentaArchivo => ({
                        IdArchivoOK: presentaArchivo.IdArchivoOK,
                        IdArchivoBK: presentaArchivo.IdArchivoBK,
                        DesArchivo: presentaArchivo.DesArchivo,
                        RutaArchivo: presentaArchivo.RutaArchivo,
                        IdTipoArchivoOK: presentaArchivo.IdTipoArchivoOK,
                        Archivo: presentaArchivo.Archivo,
                        IdTipoSeccionOK: presentaArchivo.IdTipoSeccionOK,
                        Secuencia: presentaArchivo.Secuencia,
                        Principal: presentaArchivo.Principal,
                        detail_row: {
                            Activo: presentaArchivo.Activo,
                            Borrado: presentaArchivo.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(presentaArchivo.FechaReg),
                                UsuarioReg: presentaArchivo.UsuarioReg
                            },]
                        }
                    }));

                    // Generar modelo de cat_prod_serv_presenta
                    const presentaFields = matchingPresenta.map(presenta => ({
                        IdPresentaOK: presenta.IdPresentaOK,
                        IdPresentaBK: presenta.IdPresentaBK,
                        CodigoBarras: presenta.CodigoBarras,
                        DesPresenta: presenta.DesPresenta,
                        Indice: presenta.Indice,
                        cat_prod_serv_info_vta: presentaInfoVtaFields,
                        cat_prod_serv_info_add: presentaInfoAdFields,
                        cat_prod_serv_paquete: presentaPaqueteFields,
                        cat_prod_serv_archivos: presentaArchivoFields,
                        detail_row: {
                            Activo: presenta.Activo,
                            Borrado: presenta.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(presenta.FechaReg),
                                UsuarioReg: presenta.UsuarioReg
                            },]
                        }
                    }));

                    // Generar modelo de cat_prod_serv_negocios
                    const negociosFields = matchingNegocios.map(negocios => ({
                        IdNegocioOK: negocios.IdNegocioOK,
                        detail_row: {
                            Activo: negocios.Activo,
                            Borrado: negocios.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(negocios.FechaReg),
                                UsuarioReg: negocios.UsuarioReg
                            },]
                        }
                    }));

                    // /////////////////////////////////////////////////////////////////////////////

                    // Si el IdInstitutoOK no tiene una longitud igual a 17,
                    // generar un ID de 12 caracteres y concatenarlo al final.
                    if (row.IdInstitutoOK.length !== 17) {
                        // Generar ID y concatenarlo al final del IDInstitutoOK
                        row.IdInstitutoOK = `${row.IdInstitutoOK}-${getID(12)}`;

                        // Concatenar el ID generado para el sub documento de cat_prod_serv_estatus
                        estatusFields.forEach(value => {
                            value.IdTipoEstatusOK = `${value.IdTipoEstatusOK}-${row.IdInstitutoOK}-${getID(8)}`
                        });

                        // Concatenar el ID generado para el sub documento de cat_prod_serv_info_ad
                        infoAdFields.forEach(value => {
                            value.IdEtiquetaOK = `${value.IdEtiquetaOK}-${row.IdInstitutoOK}-${getID(8)}`
                        });

                        // Concatenar el ID generado para el sub documento de cat_prod_serv_presenta
                        presentaFields.forEach(value => {
                            value.IdPresentaOK = `${value.IdPresentaOK}-${row.IdInstitutoOK}-${getID(8)}`

                            value.cat_prod_serv_info_vta.forEach(subValue => {
                                subValue.IdEtiquetaOK = `${subValue.IdEtiquetaOK}-${value.IdPresentaOK}-${getID(4)}`
                            });

                            value.cat_prod_serv_info_add.forEach(subValue => {
                                subValue.IdEtiquetaOK = `${subValue.IdEtiquetaOK}-${value.IdPresentaOK}-${getID(4)}`
                            });

                            value.cat_prod_serv_paquete.forEach(subValue => {
                                subValue.IdPresentaOK = `${subValue.IdPresentaOK}-${value.IdPresentaOK}-${getID(4)}`
                            });

                            value.cat_prod_serv_archivos.forEach(subValue => {
                                subValue.IdArchivoOK = `${subValue.IdArchivoOK}-${value.IdPresentaOK}-${getID(4)}`
                            });
                        });

                        // Concatenar el ID generado para el sub documento de cat_prod_serv_negocios
                        negociosFields.forEach(value => {
                            value.IdNegocioOK = `${value.IdNegocioOK}-${row.IdInstitutoOK}-${getID(8)}`
                        });
                    }

                    // /////////////////////////////////////////////////////////////////////////////

                    // Crear modelo de cat_prod_serv
                    return {
                        IdInstitutoOK: row.IdInstitutoOK,
                        IdProdServOK: row.IdProdServOK,
                        IdProdServBK: row.IdProdServBK,
                        CodigoBarras: row.CodigoBarras,
                        DesProdServ: row.DesProdServ,
                        Indice: row.Indice,
                        cat_prod_serv_estatus: estatusFields,
                        cat_prod_serv_info_ad: infoAdFields,
                        cat_prod_serv_presenta: presentaFields,
                        cat_prod_serv_negocios: negociosFields,
                        detail_row: {
                            Activo: row.Activo,
                            Borrado: row.Borrado,
                            detail_row_reg: [{
                                FechaReg: new Date(row.FechaReg),
                                UsuarioReg: row.UsuarioReg
                            },]
                        }
                    };
                });

                console.log(JSON_cat_prod_serv_importar);
                setExcelRows(JSON_cat_prod_serv_importar);
            } catch (error) {
                console.error('Error al procesar el archivo:', error.message);
                swal({
                    title: "Error al procesar el archivo",
                    text: "Por favor, verifica el formato",
                    icon: "error",
                    button: "aceptar"
                });
                //
            }
        };

        reader.readAsArrayBuffer(file);
    };


    return (

        <Dialog
            open={ImportExcelProdcutsShowModal}
            onClose={() => setImportExcelProdcutsShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Importar documento de Excel</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{display: 'flex', flexDirection: 'column'}}
                    dividers
                >
                    <Input
                        id="inputEmpGroupFile"
                        name="file"
                        type="file"
                        onChange={readUploadFile}
                        accept=".xlsx .xls .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        //value={inputValue}
                    />
                    <FormText>
                        {


                        }
                    </FormText>
                </DialogContent>
                <DialogActions
                    sx={{display: 'flex', flexDirection: 'row'}}
                >
                    <Box m="auto">
                        {/*{console.log("mensajeExitoAlert", mensajeExitoAlert)}
                        {console.log("mensajeErrorAlert", mensajeErrorAlert)}*/}
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
                        onClick={() => setImportExcelProdcutsShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="contained"
                        type="submit"
                        disabled={!archivoValido || !!mensajeExitoAlert}

                        loading={Loading}
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default ImportExcelProdcutsModal;