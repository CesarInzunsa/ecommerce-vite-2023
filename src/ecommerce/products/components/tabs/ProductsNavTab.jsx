import {Box, Tabs, Tab} from "@mui/material";
import React, {useState} from "react";

const ProductsTabs = ["Products", "Estatus", "Información adicional", "Presenta", "Negocios"]

const ProductsNavTab = ({setCurrentRowInProductsTab, setCurrentNameTabInPrincipalTab}) => {
    //FIC: para saber cuál es el número de Tab seleccionado.
    const [currenTabIndex, setCurrentTabIndex] = useState(0);
    const handleChange = (e) => {

        //console.log("entro al handleChange", e.target.innerText.toUpperCase());

        //FIC: actualizar el nombre de la pestaña seleccionada.
        setCurrentNameTabInPrincipalTab(e.target.innerText.toUpperCase());

        //FIC: cada que realice un click en algun tap page
        //reiniciamos el valor del tap pase de business a false.
        //setBusinessTabInPrincipalTabIsSelected(false);

        //FIC: opciones (subdocumentos de la coleccion principal de Products).
        switch (e.target.innerText.toUpperCase()) {
            case "PRODUCTS":
                setCurrentTabIndex(0);
                break;
            case "ESTATUS":
                setCurrentTabIndex(1);
                break;
            case "INFORMACIÓN ADICIONAL":
                setCurrentTabIndex(2);
                break;
            case "PRESENTA":
                setCurrentTabIndex(3);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(4);
                break;
        }
    };

    return (
        <Box sx={{border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5}}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {ProductsTabs.map((tab) => {
                    return <Tab key={tab} label={tab} disabled={setCurrentRowInProductsTab === null}/>;
                })}
            </Tabs>
        </Box>
    );
};

export default ProductsNavTab;