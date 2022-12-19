import {useNavigate} from "react-router";
import {Container} from "react-bootstrap";

/**
 * Error page
 * @returns {JSX.Element}
 * @constructor
 */
function Error() {

    const navigate = useNavigate();
    return (
        <Container>
            <h2>Not Found</h2>
            <button onClick={()=>navigate("/")}>Go to the main page</button>
        </Container>
    );
}

export default Error;
