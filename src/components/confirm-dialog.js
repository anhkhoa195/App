import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default class ConfirmDialog extends Component {
  confirmDialog(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>You want to delete this member {id}?</h1>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>Cancel</button>
              <button
                onClick={() => {
                  this.deleteMember(id);
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.submit}>Confirm dialog</button>
      </div>
    );
  }
}
