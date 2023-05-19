import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import {routeConfig} from "./routeConfig";
import {PageLoader} from "../utilComponents/PageLoader";

console.log(routeConfig);

export const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={
                    <Suspense fallback={<PageLoader />}>
                        {element}
                    </Suspense>
                }
            />
        ))}
    </Routes>
);
