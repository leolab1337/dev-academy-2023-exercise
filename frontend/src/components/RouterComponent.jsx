import React from 'react';
import Navbar from "./Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
import JourneysPage from "../pages/JourneysPage";
import StationsPage from "../pages/StationsPage";

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="stations" replace />}
                />
                <Route path="/journeys"  element={<JourneysPage/>}/>
                <Route path="stations"  element={<StationsPage/>}/>
                <Route path="404"  element={<Error/>}/>
                <Route
                    path="*"
                    element={<Navigate to="404" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
