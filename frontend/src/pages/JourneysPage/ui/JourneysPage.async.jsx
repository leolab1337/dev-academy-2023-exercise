import { lazy } from "react";

export const JourneysPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // todo remove , for demonstration
            setTimeout(() => resolve(import("./JourneysPage")), 1000);
        })
);
