import {Container} from "react-bootstrap";
import GoBackButton from "../components/GoBackButton";
import OneStation from "../components/stations/OneStation";

/**
 * A component that displays a page with information about a single station.
 * @return {JSX.Element} The `Container` element with the page content, including the `GoBackButton` and `OneStation` components.
 */
const OneStationPage = () => {
    return (
        <Container>
            <GoBackButton/>
            <h1 className='d-flex justify-content-center'>Station info</h1>
            <div className='d-flex justify-content-center'>
                <OneStation/>
            </div>
        </Container>
    );
};

export default OneStationPage;
