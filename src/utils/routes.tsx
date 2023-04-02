import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../components/Login";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    }
]);