import React from 'react';
import Navbar from "./Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
import JourneysPage from "../pages/JourneysPage";
import StationsPage from "../pages/StationsPage";
import OneStationPage from "../pages/OneStationPage";
import OneJourneyPage from "../pages/OneJourneyPage";

/**
 * A component that displays a routing setup for the app, including the `Navbar` component and various route components.
 * @return {JSX.Element} The `BrowserRouter` element with the routing configuration.
 */
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
                <Route path="/journeys/:id"  element={<OneJourneyPage/>}/>

                <Route path="stations"  element={<StationsPage/>}/>
                <Route path="stations/:id"  element={<OneStationPage/>}/>

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
