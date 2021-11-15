import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import Post from "./Post";

export class Posts extends Component {

    render() {
        return (
            <>
                <Row xs={1} md={3} className="g-3 px-0">
                    {this.props.displayPosts
                        .map((post, index) => <Col><Post
                            post={post} key={index}/></Col>)}
                </Row>
            </>);
    }


}

const mapStateToProps = (state) => {
    return {
        displayPosts: state.displayPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)