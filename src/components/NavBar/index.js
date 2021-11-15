import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";


export default class NavBar extends Component {
    constructor(prop) {
        super(prop);
    }
    render() {
        return(
            <>
                <Navbar bg="light" expand="lg" className={"sticky-top"}>
                    <Container>
                        <Navbar.Brand><Link to={"/"}>Rice Book</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/*<Link to={"/main"}>Main</Link>*/}
                                {/*<Link to={"/landing"}>Landing</Link>*/}
                                {/*<Link to={"/profile"}>Profile</Link>*/}
                                {/*<Nav.Link><Link to={"/main"}>Main</Link></Nav.Link>*/}
                                {/*<Nav.Link><Link to={"/landing"}>Landing</Link></Nav.Link>*/}
                                {/*<Nav.Link><Link to={"/profile"}>Profile</Link></Nav.Link>*/}
                                <LinkContainer to={"/main"}><Nav.Link>Main</Nav.Link></LinkContainer>
                                <LinkContainer to={"/landing"}><Nav.Link>Landing</Nav.Link></LinkContainer>
                                <LinkContainer to={"/profile"}><Nav.Link>Profile</Nav.Link></LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>);
    }
}
