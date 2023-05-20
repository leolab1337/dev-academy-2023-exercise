import { lazy } from "react";

export const OneJourneyPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // todo remove , for demonstration
            setTimeout(() => resolve(import("./OneJourneyPage")), 1000);
        })
);

