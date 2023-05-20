import { Navigate } from "react-router-dom";
import {JourneysPage} from "../../pages/JourneysPage";
import {OneJourneyPage} from "../../pages/OneJourneyPage";
import {OneStationPage} from "../../pages/OneStationPage";
import {NotFoundPage} from "../../pages/NotFoundPage";
import {StationsPage} from "../../pages/StationsPage";

export const RoutePaths = {
    MAIN: "/",
    STATIONS: "stations",
    ONESTATION: "stations/:id",
    JOURNEYS: "journeys",
    ONEJOURNEY: "journeys/:id",
    NOT_FOUND: "404",
    // last one
    NOT_FOUND_CATCH: "*",
};

export const routeConfig = {
    main: {
        path: RoutePaths.MAIN,
        element: <Navigate to={RoutePaths.STATIONS} replace />,
    },

    stations: {
        path: RoutePaths.STATIONS,
        element: <StationsPage />,
    },

    oneStation: {
        path: RoutePaths.ONESTATION,
        element: <OneStationPage />,
    },

    journeys: {
        path: RoutePaths.JOURNEYS,
        element: <JourneysPage />,
    },

    oneJourney: {
        path: RoutePaths.ONEJOURNEY,
        element: <OneJourneyPage />,
    },
    notFound: {
        path: RoutePaths.NOT_FOUND,
        element: <NotFoundPage />,
    },

    notFoundCatch: {
        path: RoutePaths.NOT_FOUND_CATCH,
        element: <Navigate to={RoutePaths.NOT_FOUND} />,
    },
};

