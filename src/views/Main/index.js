import React, {Component} from 'react'
import {connect} from 'react-redux'
import NavBar from "../../components/NavBar";
import ProfileInfo from "./ProfileInfo";
import {Col, Container, Row} from "react-bootstrap";
import AddPost from "./AddPost";
import SearchBar from "./SearchBar";
import Posts from "./Posts";

export class Main extends Component {

    render() {
        return (
            <>
                <Container fluid className={"px-0"}>
                    <NavBar/>
                    <Row className={"ms-1"}>
                        <Col className={"col-3 ms-2 mt-3 position-fixed profile_container"}>
                            <Row>
                                <ProfileInfo/>
                            </Row>
                        </Col>
                        <Col className={"col-8 mt-3 offset-3"}>
                            <Row>
                                <AddPost/>
                            </Row>
                            <Row>
                                <SearchBar/>
                            </Row>
                            <Row>
                                <Posts/>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => (
    {}
)

const mapDispatchToProps =
    {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
