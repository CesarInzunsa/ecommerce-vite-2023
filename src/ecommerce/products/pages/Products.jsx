import {Box} from "@mui/material";
import {useState} from "react";
import ProductsNavTab from "../components/tabs/ProductsNavTab.jsx";
import ProductsTable from "../components/tables/ProductsTable.jsx";
import PresentaTab from "../components/tabs/PresentaTab.jsx";
import EstatusTable from "../components/tables/EstatusTable.jsx";
import InfoAdTable from "../components/tables/InfoAdTable.jsx";
import NegociosTable from "../components/tables/NegociosTable.jsx";

const Products = () => {

    //FIC: indicamos que al iniciar no hay ningun Producto seleccionado.
    const [currentRowInProductsTab, setCurrentRowInProductsTab] = useState(0);

    //FIC: indicamos que el estado inicial del tab page principal por default será PRODUCTS.
    const [currentNameTabInPrincipalTab, setCurrentNameTabInPrincipalTab] = useState("PRODUCTS");

    // useState para guardar los ids seleccionados en ProductsTable
    // y luego compartirlos con el componente EstatusTable.
    const [datosSeleccionados, setDatosSeleccionados] = useState({IdInstitutoOK: "0", IdProdServOK: "0"});

    return (
        <Box>

            {/* FIC: llamada intrinsica (props) */}

            <ProductsNavTab
                setCurrentRowInProductsTab={setCurrentRowInProductsTab}
                setCurrentNameTabInPrincipalTab={setCurrentNameTabInPrincipalTab}
                //setBusinessTabInPrincipalTabIsSelected={setBusinessTabInPrincipalTabIsSelected}
            />

            {/* FIC: si en el tap principal esta seleccionado es el tab de PRODUCTS
            manda llamar la pagina que va dentro del tab de Productos. */}
            {currentNameTabInPrincipalTab === "PRODUCTS" &&
                <ProductsTable setDatosSeleccionados={setDatosSeleccionados} datosSeleccionados={datosSeleccionados}/>}

            {/* FIC: si en el tap principal esta seleccionado el tab de NEGOCIOS
            manda llamar la pagina que va dentro del tab de Business. */}
            {currentNameTabInPrincipalTab === "ESTATUS" && <EstatusTable datosSeleccionados={datosSeleccionados}/>}

            {/*Página de Información adicional*/}
            {currentNameTabInPrincipalTab === "INFORMACIÓN ADICIONAL" &&
                <InfoAdTable datosSeleccionados={datosSeleccionados}/>}

            {/*Pagina de presenta*/}
            {currentNameTabInPrincipalTab === "PRESENTA" && <PresentaTab datosSeleccionados={datosSeleccionados}/>}

            {/*Pagina de Negocios*/}
            {currentNameTabInPrincipalTab === "NEGOCIOS" && <NegociosTable datosSeleccionados={datosSeleccionados}/>}

        </Box>
    );
};

export default Products;