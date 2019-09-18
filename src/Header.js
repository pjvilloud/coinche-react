import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
    render(){
        return <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Coinche</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/" exact>Accueil</Nav.Link>
                        <Nav.Link as={NavLink} to="/calc">Calculette</Nav.Link>
                        <NavDropdown title="Memo" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#memo/annonces">Annonces</NavDropdown.Item>
                            <NavDropdown.Item href="#memo/toutatout">Tout-Atout</NavDropdown.Item>
                            <NavDropdown.Item href="#memo/sansatout">Sans-Atout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    }
}
export default Header;