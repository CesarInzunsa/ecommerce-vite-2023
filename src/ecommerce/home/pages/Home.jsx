import {Outlet} from "react-router-dom";
import AppBar from "../../../share/bars/components/CommerceAppBar.jsx";

export default function Home() {
    return (
        <div id='div-home'>
            <div id='div-appbar'>
                <AppBar/>
            </div>
            <div id="detail">
                <Outlet/>
            </div>
        </div>
    );
}