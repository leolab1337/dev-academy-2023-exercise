import { lazy } from "react";

export const StationsPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // todo remove , for demonstration
            setTimeout(() => resolve(import("./StationsPage")), 1000);
        })
);

