import React from 'react';
import {Container, Nav, Navbar,Offcanvas} from "react-bootstrap";
import {useNavigate} from "react-router";
import { ReactComponent as Logo } from '../img/logo1.svg';



/**
 * A component that displays a responsive navbar with links to the stations and journeys pages.
 * @return {JSX.Element} The `Navbar` element.
 */
const Navbar2 = () => {

    const navigate = useNavigate();

    return (
        <Navbar key={'lg'} bg="dark" expand={'lg'} className="mb-3" variant='dark'>
            <Container>
                <Navbar.Brand className='d-flex justify-content gap-2' onClick={()=>navigate('/')} style={{cursor : 'pointer'}}>
                    <Logo
                        style={{marginTop : '1.5px'}}
                        width="25"
                        height="25"
                    />    Helsinki City Bike App
                    {' '}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${'lg'}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link onClick={()=>navigate('/stations')} style={{cursor : 'pointer'}}>Stations</Nav.Link>
                            <Nav.Link onClick={()=>navigate('/journeys')} style={{cursor : 'pointer'}}>Journeys</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Navbar2;
