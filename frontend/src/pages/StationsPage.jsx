import React from 'react';
import {Container} from "react-bootstrap";
import StationsMain from "../components/stations/StationsMain";

/**
 * A component that displays a page with a list of stations.
 * @return {JSX.Element} The `Container` element with the page content, including the `StationsMain` component.
 */
const StationsPage = () => {
    return (
        <Container>
            It is stations page,
            <StationsMain/>

        </Container>
    );
};

export default StationsPage;
