import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ConfirmDialog extends Component {
    submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };

    render() {
        return (
            <div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>You want to delete this file?</p>
                <button onClick={onClose}>No</button>
                <button onClick={() => {
                    this.handleClickDelete();
                    onClose();
                }}
                >
                    Yes, Delete it!
                </button>
            </div>
        );
    }
}