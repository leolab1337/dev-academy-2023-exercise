import { lazy } from "react";

export const NotFoundPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // todo remove , for demonstration
            setTimeout(() => resolve(import("./NotFoundPage")), 1000);
        })
);

