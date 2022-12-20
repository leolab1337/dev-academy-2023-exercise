import {Container} from "react-bootstrap";
import GoBackButton from "../components/GoBackButton";
import OneStation from "../components/stations/OneStation";

const OneStationPage = () => {
    return (
        <Container>
            <GoBackButton/>
             <br/>
             <br/>
            <div className='d-flex justify-content-center'>
                <OneStation/>
            </div>
        </Container>
    );
};

export default OneStationPage;
