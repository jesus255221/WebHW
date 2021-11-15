import React, {Component} from 'react'
import {FormInput} from "../../components/FormInput";
import {Alert, Button, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {updateInfo} from "../../action";

class UpdateInfo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            zipcode: "",
            passwd: "",
            invMsg: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Form className={"p-4 border rounded h-100"} method={"get"} id={"register"}>
                <Form.Label>Update information</Form.Label>
                {this.state.invMsg !== '' && <Alert variant={'danger'}>
                    {this.state.invMsg}
                </Alert>}
                <FormInput type="text"
                           id="name"
                           label="Name"
                           required={false}
                           handleChange={this.handleChange}
                           value={this.state.name}
                />
                <FormInput type="email"
                           id={"email"}
                           label="Email"
                           required={false}
                           handleChange={this.handleChange}
                           value={this.state.email}
                />
                <FormInput type="password"
                           id="passwd"
                           label="Password"
                           required={false}
                           handleChange={this.handleChange}
                           value={this.state.passwd}
                />
                <FormInput type={"tel"}
                           id={"phone"}
                           label={"Phone"}
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                           placeholder={"XXX-XXX-XXXX"}
                           required={false}
                           handleChange={this.handleChange}
                           value={this.state.phone}
                />
                <FormInput type={"text"}
                           id={"zipcode"}
                           label={"Zipcode"}
                           pattern="[0-9]{5}"
                           required={false}
                           handleChange={this.handleChange}
                           value={this.state.zipcode}
                />
                <input type="hidden" name="timeStamp" id="timeStamp"/>
                <Button variant="outline-secondary" onClick={this.handleSubmit}>Update info</Button>
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
        let new_user = {...this.props.user}
        let ids = ["name", "email", "phone", "zipcode", "passwd"]
        let regexes = [".*", ".+@.+\..+", "[0-9]{3}-[0-9]{3}-[0-9]{4}", "[0-9]{5}"]
        let updated = false
        let invFlag = false;
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] === "passwd" && this.state.passwd !== "") {
                new_user.passwd = this.state.passwd
                new_user.passwdConf = this.state.passwd
                updated = true
            } else {
                let ele = this.state[ids[i]]
                if (ele !== "") {
                    if (RegExp(regexes[i]).test(ele)) {
                        new_user[ids[i]] = ele
                        updated = true
                    } else {
                        this.setState({
                            invMsg: ids[i] + " is not valid!"
                        })
                        invFlag = true
                        break;
                    }
                }
            }
        }
        if (!invFlag && updated) {
            this.props.updateInfo(new_user)
            this.setState({
                name: "",
                email: "",
                phone: "",
                zipcode: "",
                passwd: "",
                invMsg: ""
            })
        }
    }


}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateInfo: (user) => dispatch(updateInfo(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfo)