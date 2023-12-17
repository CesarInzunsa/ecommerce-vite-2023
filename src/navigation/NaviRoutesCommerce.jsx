import {createBrowserRouter} from "react-router-dom";
import Home from "../ecommerce/home/pages/Home.jsx";
import Orders from "../ecommerce/orders/pages/Orders.jsx";
import Payments from "../ecommerce/payments/pages/Payments.jsx";
import Prices from "../ecommerce/prices/pages/Prices.jsx";
import Products from "../ecommerce/products/pages/Products.jsx";
import Shippings from "../ecommerce/shippings/pages/Shippings.jsx";
import Error from "../share/errors/pages/Error.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/products",
                element: <Products/>,
            },
            {
                path: "/prices",
                element: <Prices/>,
            },
            {
                path: "/orders",
                element: <Orders/>,
            },
            {
                path: "/payments",
                element: <Payments/>,
            },
            {
                path: "/shippings",
                element: <Shippings/>,
            },
        ],
    },
]);
export default router;