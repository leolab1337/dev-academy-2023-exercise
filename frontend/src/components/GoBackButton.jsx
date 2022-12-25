import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

/**
 * A button that navigates to the previous location in the history stack when clicked.
 * @return {JSX.Element} The `Button` element.
 */
const GoBackButton = () => {

    const navigate = useNavigate();

    return (
        <Button onClick={()=>navigate(-1)}>Go back</Button>
    );
};

export default GoBackButton;
