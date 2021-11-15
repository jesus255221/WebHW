import React, {Component} from "react";
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";

export class Post extends Component {

    render() {
        // console.log(this.props.post, this.props.userList)
        return (
            <>
                <Card className={"m-1"} key={this.props.key}>
                    <Card.Img variant="top" src="http://via.placeholder.com/180x100"/>
                    <Card.Body className={"d-flex flex-column"}>
                        <Card.Title>{this.props.post.userName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.post.timeStamp}</Card.Subtitle>
                        <Card.Text>
                            {this.props.post.body}
                        </Card.Text>
                        <InputGroup className="mb-3 mt-auto">
                            <FormControl
                                placeholder={"Comment"}
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                                +
                            </Button>
                        </InputGroup>
                        <Button variant="outline-secondary" id="button-addon2">
                            Edit
                        </Button>
                    </Card.Body>
                </Card>
            </>);
    }
}


const mapStateToProps = (state) => {
    return {
        userList: state.userList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);