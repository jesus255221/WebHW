import React, {Component} from "react";
import {Button, ButtonGroup, Card, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {addPost} from "../../action";

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postText: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clear = this.clear.bind(this)
    }

    render() {
        return (
            <>
                <Card className={"mb-3 pe-0"}>
                    <Card.Body>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Add picture</Form.Label>
                            <Form.Control type="file"/>
                        </Form.Group>
                        <Form.Control className={"mb-3"} as="textarea" onChange={this.handleChange} placeholder={"Add post"} value={this.state.postText}/>
                        <ButtonGroup className={"w-100"}>
                            <Button as="input" type="button" value="Cancel" variant={"outline-secondary"} onClick={this.clear}/>
                            <Button as="input" type="button" value="Post" variant={"outline-secondary"} onClick={this.handleSubmit}/>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </>);
    }

    handleChange(evt) {
        this.setState(
            {
                postText: evt.target.value
            }
        )
    }

    handleSubmit(evt) {
        evt.preventDefault()
        this.props.addPost({
            body: this.state.postText,
            userId: this.props.user.id,
            userName: this.props.user.name,
            timeStamp: this.getCurrentTime()
        });
    }

    clear() {
        this.setState({
            postText: "",
        })
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
    return {user: state.user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => dispatch(addPost(post))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)