import React, { Component } from "react";
import "../styles/table.css";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import User from "../views/User";
import Button from "./button";
import { confirmAlert } from "react-confirm-alert"; // Import
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
// require("bootstrap/less/bootstrap.less");

class Table extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
    this.deleteMember = this.deleteMember.bind(this);
    this.state = {
      error: null,
      activePage: 1
    };
  }
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
  deleteMember(id) {
    axios
      .post("http://localhost:4000/delete/" + id)
      .then()
      .catch(err => console.log(err));
  }
  editCustommer(id) {
    this.props.history.push(`/user/${id}`);
  }

  tableData() {
    let table = [];

    this.props.dataRes.map(item => {
      let rows = [];
      Object.values(item).map(value => {
        rows.push(<td>{value}</td>);
      });
      if (this.props.isEdit) {
        rows.push(
          <td>
            <Button
              onClick={() => this.editCustommer(item.id)}
              label={"Edit"}
              color={"secondary"}
              variant={"contained"}
            ></Button>
          </td>
        );
      }
      if (this.props.isDelete) {
        rows.push(
          <td>
            <Button
              onClick={() => this.confirmDialog(item.id)}
              label={"delete"}
              color={"primary"}
              variant={"contained"}
            ></Button>
          </td>
        );
      }
      table.push(<tr>{rows}</tr>);
    });
    return table;
  }

  renderTableHeader() {
    let header = this.props.tableHeader;
    if (this.props.isEdit === true) {
      header.push("edit");
    }
    if (this.props.isDelete) {
      header.push("delete");
    }
    return header.map((items, index) => {
      return <th key={index}>{items.toUpperCase()}</th>;
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div>
        <table id="customer">
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.tableData()}</tbody>
        </table>
        {/* <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.props.dataRes.length}
            pageRangeDisplayed={5}
            onChange={() => this.handlePageChange}
          /> */}
      </div>
    );
  }
}

export default Table;
