import React, {Component} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {updateQuery} from "../../action";

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    render() {
        return(
            <>
                <InputGroup className="mb-2 px-0">
                    <FormControl
                        placeholder={"Search here"}
                        onChange={this.handleChange}
                    />
                </InputGroup>
            </>);
    }

    handleChange(evt) {
        this.props.updateQuery(evt.target.value)
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuery: (query) => dispatch(updateQuery(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)