import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

const GoBackButton = () => {

    const navigate = useNavigate();

    return (
        <Button onClick={()=>navigate(-1)}>Go back</Button>
    );
};

export default GoBackButton;
