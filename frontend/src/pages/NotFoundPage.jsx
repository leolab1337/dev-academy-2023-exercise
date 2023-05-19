import {useNavigate} from "react-router";
import {Container} from "react-bootstrap";

/**
 * A component that displays an error message and a button to navigate to the main page.
 * @return {JSX.Element} The `Container` element with the error message and button.
 */
function NotFoundPage() {

    const navigate = useNavigate();
    return (
        <Container>
            <h2>Not Found</h2>
            <button onClick={()=>navigate("/")}>Go to the main page</button>
        </Container>
    );
}

export default NotFoundPage;
