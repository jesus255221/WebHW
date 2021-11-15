import React, {Component} from 'react'
import {FormInput} from "../../components/FormInput";
import {Form, Button, Alert} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../action";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // loginUser: "Sincere@april.biz",
            loginUser: "",
            // loginPasswd: "Sincere@april.biz",
            loginPasswd: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        console.log((this.props.loginFailed))
        return (
            <>
                <Form className={"p-4 border rounded h-100"} method={"get"} id={"register"}>
                    {this.props.loginFailed && <Alert variant={'danger'}>
                        Invalid username/password
                    </Alert>}
                    <Form.Label>Login</Form.Label>
                    <FormInput type="text"
                               id="loginUser"
                               pattern="[a-zA-Z]{1}.*"
                               label="Account"
                               required={true}
                               handleChange={this.handleChange}
                    />
                    <FormInput type="password"
                               id="loginPasswd"
                               label="Password"
                               required={true}
                               handleChange={this.handleChange}
                    />
                    <Button type={"submit"} variant="outline-secondary" onClick={this.handleSubmit}>Login</Button>
                </Form>
            </>
        );
    }

    handleChange(evt, name) {
        this.setState({
            [name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.login(this.state.loginUser, this.state.loginPasswd)
    }
}


const mapStateToProps = (state) => {
    return {
        userList: state.userList,
        loginFailed: state.loginFailed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)