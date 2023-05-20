import { lazy } from "react";

export const OneStationPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // todo remove , for demonstration
            setTimeout(() => resolve(import("./OneStationPage")), 1000);
        })
);

