import React, {Component} from 'react'
import {connect} from 'react-redux'
import NavBar from "../../components/NavBar";
import Register from './Register'
import {Col, Row} from "react-bootstrap";
import Login from "./Login";

export class Landing extends Component {
    render() {
        return (
            <>
                <NavBar/>
                <Row className={"m-5 align-self-center justify-content-around align-content-center"}>
                    <Col className={"col-5"}>
                        <Register/>
                    </Col>
                    <Col className={"col-5"}>
                        <Login/>
                    </Col>
                </Row>
            </>);
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
