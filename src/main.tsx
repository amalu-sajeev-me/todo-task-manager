import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App'
import './index.css'
import { routes } from './utils/routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <RouterProvider router={routes} />
    {/* </BrowserRouter> */}
  </React.StrictMode>,
)
