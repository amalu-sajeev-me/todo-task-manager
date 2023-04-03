import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../features/login/Login";

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