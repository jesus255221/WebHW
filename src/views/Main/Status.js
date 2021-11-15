import React, {Component} from "react";
import {Card} from "react-bootstrap";


export default class Status extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={"mb-3"}>
                <Card.Img variant="top"
                          src="https://avatars.dicebear.com/v2/avataaars/6b59aa8b5f487df2847a61554e6d3634.svg"/>
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>
                        {this.props.status}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }


}

