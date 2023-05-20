import {Container} from "react-bootstrap";
import GoBackButton from "../../../components/GoBackButton";
import OneJourney from "../../../components/journeys/OneJourney";

/**
 * A component that displays a page with information about a single journey.
 * @return {JSX.Element} The `Container` element with the page content, including the `GoBackButton` and `OneStation` components.
 */
const OneJourneyPage = () => {
    return (
        <Container>
            <GoBackButton/>
            <h1 className='d-flex justify-content-center'>Journey info</h1>
            <div className='d-flex justify-content-center'>
                <OneJourney/>
            </div>
        </Container>
    );
};

export default OneJourneyPage;
