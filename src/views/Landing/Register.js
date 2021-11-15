import React, {Component} from 'react'
import {FormInput} from "../../components/FormInput";
import {Button, Col, Form, Row, Alert} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {addPost, register} from "../../action";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // username: "xxx",
            // name: "yyy",
            // email: "xxx@xxx.com",
            // passwd: "xxx",
            // birthday: "1997-01-01",
            // phone: "000-000-0000",
            // zipcode: "00000",
            // passwdConf: "xxx",
            // invMsg: "",

            username: "",
            name: "",
            email: "",
            passwd: "",
            birthday: "",
            phone: "",
            zipcode: "",
            passwdConf: "",
            invMsg: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Form className={"p-4 border rounded"} method={"get"} id={"register"}>
                <Form.Label>Register</Form.Label>
                {this.props.regInvMsg !== '' && <Alert variant={'danger'}>
                    {this.props.regInvMsg}
                </Alert>}
                <Row>
                    <Col>
                        <FormInput type="text"
                                   id="username"
                                   pattern="[a-zA-Z]{1}.*"
                                   label="User name"
                                   required={true}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                    <Col>
                        <FormInput type="email"
                                   id="email"
                                   label="Email"
                                   required={true}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput type="password"
                                   id="passwd"
                                   label="Password"
                                   required={true}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                    <Col>
                        <FormInput type="password"
                                   id="passwdConf"
                                   label="Confirm password"
                                   required={true}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput type={"tel"}
                                   id={"phone"}
                                   label={"Phone"}
                                   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                   placeholder={"XXX-XXX-XXXX"}
                                   required={true}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                    <Col>
                        <FormInput type={"date"}
                                   id="birthday"
                                   label={"Birthday"}
                                   required={true}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className={"col-6"}>
                        <FormInput type={"text"}
                                   id={"zipcode"}
                                   label={"Zipcode"}
                                   pattern="[0-9]{5}"
                                   required={true}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                    <Col className={"col-6"}>
                        <FormInput type={"text"}
                                   id={"name"}
                                   label={"Name"}
                                   required={false}
                                   handleChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <input type="hidden" name="timeStamp" id="timeStamp"/>
                <Button variant="outline-secondary" onClick={this.handleSubmit}>Submit</Button>
            </Form>
        );
    }

    handleChange(evt, name) {
        this.setState({
            [name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        let user = {...this.state}
        delete user.invMsg
        this.props.register(user);
    }

    getCurrentTime() {
        let currentdate = new Date();
        return (currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds())
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        posts: state.posts,
        userList: state.userList,
        regInvMsg: state.regInvMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(register(user)),
        addPost: (post) => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);