import React from 'react';
import {Container} from "react-bootstrap";
import JourneysMain from "../../../components/journeys/JourneysMain";


/**
 * A component that displays the journeys page.
 * @return {JSX.Element} The `Container` react-bootstrap element with the page content.
 */
const JourneysPage = () => {
    return (
        <Container>
            it is journeys page,
            <JourneysMain/>

        </Container>
    );
};

export default JourneysPage;
