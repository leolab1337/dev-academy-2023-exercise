import React, {memo} from 'react';
import {Container, Nav, Navbar,Offcanvas} from "react-bootstrap";
import {useNavigate} from "react-router";
import { ReactComponent as Logo } from '../../../../img/logo1.svg';

import styles from './Navbar.module.css'
import {RoutePaths} from "../../../router/routeConfig";

/**
 * A component that displays a responsive navbar with links to the stations and journeys pages.
 * @return {JSX.Element} The `Navbar` element.
 */
export const Navbar2 = memo(() => {

    const navigate = useNavigate();

    return (
        <Navbar key={'lg'} bg="dark" expand={'lg'} className={styles.Navbar} variant='dark' >
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
                            <Nav.Link onClick={()=>navigate(RoutePaths.STATIONS)} style={{cursor : 'pointer'}}>Stations</Nav.Link>
                            <Nav.Link onClick={()=>navigate(RoutePaths.JOURNEYS)} style={{cursor : 'pointer'}}>Journeys</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
});

