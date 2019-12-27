import React, { Component } from 'react'
import { InputGroup, FormControl } from 'react-bootstrap';
import '../styles/input.css';
export default class Input extends Component {
    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
        )
    }
}
