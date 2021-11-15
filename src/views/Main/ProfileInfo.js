import React, {Component} from 'react'
import {Button, Row, Col, FormControl, InputGroup, ButtonGroup, Card, Form, Accordion} from "react-bootstrap";
import {connect} from "react-redux";
import {follow, logout, unfollow, updateStatus} from "../../action";
import {Link} from "react-router-dom";
import {FormInput} from "../../components/FormInput";

export class ProfileInfo extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.handleFollowChange = this.handleFollowChange.bind(this);

        this.state = {
            status: "",
            loaded: false,
            wantsFollow: ""
        }

        console.log(this.props.following)
    }

    render() {
        return (
            <>
                <Row>
                    <ButtonGroup className={"mb-3 px-0"}>
                        <Button variant={"outline-secondary"} as="input" type="button" value="Logout"
                                onClick={this.props.logout}/>
                        <Link className={"btn btn-outline-secondary"} to={"/profile"}
                              role={"button"}>Profile</Link>
                    </ButtonGroup>
                </Row>
                <Row>
                    <Card className={"mb-3"}>
                        <Card.Img className={"profile_pic"} variant="top"
                                  src="https://avatars.dicebear.com/v2/avataaars/6b59aa8b5f487df2847a61554e6d3634.svg"/>
                        <Card.Body>
                            <Card.Title>{this.props.user.name === "" ? this.props.user.username : this.props.user.name}</Card.Title>
                            <Card.Text>
                                {this.props.user.status}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <InputGroup className="mb-3 px-0">
                        <FormControl
                            placeholder={"User status"}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2" onChange={this.handleChange}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={this.handleSubmit}>
                            Update
                        </Button>
                    </InputGroup>
                </Row>
                <Row>
                    <Accordion className={"px-0 mb-3"}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Friends</Accordion.Header>
                            <Accordion.Body>
                                {this.props.userList
                                    .filter((u) => this.props.following.includes(u.name) || this.props.following.includes(String(u.id)))
                                    .map((u, index) =>
                                        <>
                                            <Card className={"mb-3"} key={index}>
                                                <Card.Img className={"profile_pic"} variant="top"
                                                          src="https://avatars.dicebear.com/v2/avataaars/6b59aa8b5f487df2847a61554e6d3634.svg"/>
                                                <Card.Body>
                                                    <Card.Title>{u.name}</Card.Title>
                                                    <Card.Text>
                                                        {u.status}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Button className={"mb-2"} variant="outline-secondary"
                                                        onClick={() => this.handleUnfollow(u.id)}>
                                                    Unfollow
                                                </Button>
                                            </Card>
                                        </>)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <InputGroup className="mb-3 px-0">
                        <FormControl
                            placeholder={"User"} onChange={this.handleFollowChange} value={this.state.wantsFollow}
                        />
                        <Button variant="outline-secondary" id="button-addon2"
                                onClick={() => this.handleFollow(this.state.wantsFollow)}>
                            Follow
                        </Button>
                    </InputGroup>
                </Row>
            </>
        );


    }

    handleChange(evt) {
        this.setState({
            status: evt.target.value
        });
    }


    handleSubmit(evt) {
        evt.preventDefault()
        console.log("submitted");
        this.props.updateStatus(this.state.status)
    }

    handleUnfollow(userId) {
        this.props.unfollow(userId)
    }

    handleFollowChange(evt) {
        this.setState({
            wantsFollow: evt.target.value
        });
    }

    handleFollow(info) {
        if (info !== "") {
            this.props.follow(info)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userList: state.userList,
        status: state.status,
        following: state.user.following
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        updateStatus: (status) => dispatch(updateStatus(status)),
        follow: (info) => dispatch(follow(info)),
        unfollow: (userId) => dispatch(unfollow(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)