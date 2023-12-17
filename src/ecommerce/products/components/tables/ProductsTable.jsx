//FIC: React
import React, {useEffect, useState} from "react";
//FIC: Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, Button, IconButton, Dialog, Radio, darken} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//import ReadMoreIcon from '@mui/icons-material/ReadMore';
import PublishIcon from '@mui/icons-material/Publish';
import RefreshIcon from '@mui/icons-material/Refresh';

//FIC: DB
import {getAllProducts} from '../../services/remote/get/GetAllProducts.jsx';
//FIC: Modals
import AddProductModal from "../modals/AddProductModal.jsx";
import ImportExcelProductsModal from "../modals/ImportExcelProductsModal.jsx";
import AddProductDetailsModal from "../modals/detailsModals/AddProductDetailsModal.jsx"


//FIC: Table - FrontEnd.
const ProductsTable = ({setDatosSeleccionados, datosSeleccionados}) => {
    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Productos.
    const [ProductsData, setProductsData] = useState([]);

    //FIC: controlar el estado que muestra u oculta la modal de nuevo Producto.
    const [AddProductShowModal, setAddProductShowModal] = useState(false);

    // Controlar el esto de muestra u oculta la modal para importar un archivo de excel
    const [ImportExcelProdcutsShowModal, setImportExcelProdcutsShowModal] = useState(false);

    // Controlar el esto de muestra u oculta la modal para ver los detalles de un producto
    const [AddProductDetailsShowModal, setAddProductDetailsShowModal] = useState(false);

    async function fetchData() {
        try {
            const AllProductsData = await getAllProducts();
            setProductsData(AllProductsData);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener los productos en useEffect de ProductsTable:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        // Accede a los datos necesarios del registro (rowData) y llama a tu método
        const {IdInstitutoOK, IdProdServOK} = rowData.original;
        // Mostrar en consola los datos del registro
        console.log("IdInstitutoOK: ", IdInstitutoOK);
        console.log("IdProdServOK: ", IdProdServOK);
        // Actualizar el estado de los datos seleccionados
        setDatosSeleccionados({IdInstitutoOK, IdProdServOK});
    };

    //FIC: Columns Table Definition.
    const ProductsColumns = [
        {
            accessorKey: "IdInstitutoOK",
            header: "ID OK",
            size: 30, //small column
        },
        {
            accessorKey: "IdProdServOK",
            header: "ID ProdServ OK",
            size: 30, //small column
        },
        {
            accessorKey: "IdProdServBK",
            header: "ID BK",
            size: 30, //small column
        },
        {
            accessorKey: "CodigoBarras",
            header: "Codigo de barras",
            size: 50, //small column
        },
        {
            accessorKey: "DesProdServ",
            header: "Descripción",
            size: 150, //small column
        },
    ];

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={ProductsColumns}
                    data={ProductsData}
                    state={{isLoading: loadingTable}}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    muiTableBodyRowProps={({row}) => ({
                        onClick: row.getToggleSelectedHandler(),
                        onClickCapture: () => sendDataRow(row),
                        sx: {cursor: 'pointer'},
                    })}
                    renderTopToolbarCustomActions={() => (
                        <>
                            {/* ------- ACTIONS TOOLBAR INIT ------ */}
                            <Stack direction="row" sx={{m: 1}}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddProductShowModal(true)}
                                            disabled>
                                            <AddCircleIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton disabled>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton disabled>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Detalles">
                                        <IconButton
                                            onClick={() => setAddProductDetailsShowModal(true)}>
                                            <InfoIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Importar excel">
                                        <IconButton
                                            onClick={() => setImportExcelProdcutsShowModal(true)}>
                                            <PublishIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refrescar">
                                        <IconButton
                                            onClick={fetchData}>
                                            <RefreshIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- ACTIONS TOOLBAR END ------ */}
                        </>
                    )}
                />
            </Box>
            {/* M O D A L E S */}
            <Dialog open={AddProductShowModal}>
                <AddProductModal
                    AddProductShowModal={AddProductShowModal}
                    setAddProductShowModal={setAddProductShowModal}
                    onClose={() => setAddProductShowModal(false)}
                />
            </Dialog>
            <Dialog open={ImportExcelProdcutsShowModal}>
                <ImportExcelProductsModal
                    ImportExcelProdcutsShowModal={ImportExcelProdcutsShowModal}
                    setImportExcelProdcutsShowModal={setImportExcelProdcutsShowModal}
                    actualizarTabla={fetchData}
                    onClose={() => setImportExcelProdcutsShowModal(false)}
                />
            </Dialog>
            <Dialog open={AddProductDetailsShowModal}>
                <AddProductDetailsModal
                    AddProductDetailsShowModal={AddProductDetailsShowModal}
                    setAddProductDetailsShowModal={setAddProductDetailsShowModal}
                    IdProdServOK={datosSeleccionados.IdProdServOK}
                    IdInstitutoOK={datosSeleccionados.IdInstitutoOK}
                    onClose={() => setAddProductDetailsShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};

export default ProductsTable;