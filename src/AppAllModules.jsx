import {RouterProvider} from "react-router-dom";
import Footer from "./share/footer/componets/Footer.jsx";
import CommerceRouter from "./navigation/NaviRoutesCommerce.jsx";

export default function AppAllModules() {
    return (
        <>
            <div id='div-app'>
                <RouterProvider router={CommerceRouter}/>
                <div id='div-footer'>
                    <Footer/>
                </div>
            </div>
        </>
    );
}