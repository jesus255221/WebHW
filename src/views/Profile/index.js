import React, {Component} from "react";
import NavBar from "../../components/NavBar";
import {Button, Card, Col, Form, Row, ListGroup} from "react-bootstrap";
import UpdateInfo from "./UpdateInfo";
import {connect} from "react-redux";

class Profile extends Component {
    render() {
        let info = this.props.user !== undefined ? this.infoCard(this.props.user) : "";
        return (
            <>
                <NavBar/>
                <Row className={"m-5 align-self-center justify-content-around align-content-center"}>
                    <Col className={"col-5"}>
                        {info}
                    </Col>
                    <Col className={"col-5"}>
                        <UpdateInfo/>
                    </Col>
                </Row>
            </>);
    }

    infoCard(user) {
        return (
            <Card className={"h-100"}>
                <Card.Body>
                    <Card.Title>Current info</Card.Title>
                    <Card.Img className={"mb-3"} variant="top" src="https://avatars.dicebear.com/v2/avataaars/6b59aa8b5f487df2847a61554e6d3634.svg"/>
                    <Form.Control type="file"/>
                    <ListGroup variant="flush">
                        <ListGroup.Item><span id={"profileUsername"}>Name: {user.name}</span></ListGroup.Item>
                        <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                        <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
                        <ListGroup.Item>Zipcode: {user.zipcode}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>);
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)