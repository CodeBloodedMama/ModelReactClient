import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/*" element={<App/>}>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={appRouter}></RouterProvider>
    </React.StrictMode>
);

