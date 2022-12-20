import {Container} from "react-bootstrap";
import GoBackButton from "../components/GoBackButton";
import OneStation from "../components/stations/OneStation";

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
