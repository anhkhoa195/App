import React, { Component } from "react";
import "../styles/table.css";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import Button from "./button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { CONSTANTS } from "../constants/index";
import Select from "rc-select";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import "rc-select/assets/index.css";

class Table extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
    this.deleteMember = this.deleteMember.bind(this);
    this.state = {
      error: null,
      activePage: 1,
      totalPages: null,
      pageSizeOptions: CONSTANTS.PER_PAGE_ITEMS,
      pageAble: this.props.pageAble,
      itemPages: 10
    };
    this.onChange = this.onChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  confirmDialog(id, name) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>You want to delete this id: {name}?</h1>
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
              onClick={() => this.confirmDialog(item.id, item.name)}
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

    return header.map((items, index) => {
      return <th key={index}>{items.toUpperCase()}</th>;
    });
  }

  onShowSizeChange(current, pageSize) {
    this.updateData(current, pageSize);
    this.setState({ itemPages: pageSize });
    this.setState({ activePage: 1 });
  }

  onChange(current, pageSize) {
    this.updateData(current, pageSize);
    this.setState({ itemPages: pageSize });
    this.setState({ activePage: current });
  }
  updateData(page, totalPages) {
    this.props.parentCallback(page + "," + totalPages);
  }
  render() {
    this.state.totalPages = Math.ceil(
      this.props.dataRes.length / this.state.itemPages
    );
    return (
      <div className="table">
        <table id="customer">
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.tableData()}</tbody>
        </table>
        <div className="row pagination">
          <div>
            {this.state.activePage && (
              <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                Page{" "}
                <span className="font-weight-bold">
                  {this.state.activePage}
                </span>{" "}
                /{" "}
                <span className="font-weight-bold">
                  {this.state.totalPages}
                </span>
              </span>
            )}
          </div>
          <div className="d-flex flex-row paginate">
            <Pagination
              selectComponentClass={Select}
              showSizeChanger
              pageSizeOptions={this.state.pageSizeOptions}
              defaultPageSize={this.state.itemPages}
              defaultCurrent={this.state.activePage}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onChange}
              total={this.props.dataRes.length}
              locale={localeInfo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
