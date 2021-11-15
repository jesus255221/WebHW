import React from "react";
import {FormGroup, Form} from "react-bootstrap";

export class FormInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <FormGroup className="mb-3">
                    <Form.Label>{this.props.label}{this.props.required && <span>*</span>}</Form.Label>
                    <Form.Control
                        required={this.props.required}
                        type={this.props.type}
                        placeholder={this.props.placeholder ? this.props.placeholder : this.props.label}
                        id={this.props.id}
                        pattern={this.props.pattern}
                        onChange={(evt) => this.props.handleChange(evt, this.props.id)}
                        value={this.props.value}
                    />
                </FormGroup>
            </>);
    }


}



