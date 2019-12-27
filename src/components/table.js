import React, { Component } from "react";
import "../styles/table.css";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import Pagination from "./pagination";
import User from "../views/User";
import Button from "./button";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class Table extends React.Component<RouteComponentProps> {
    constructor(props) {
        super(props);
        this.deleteMember = this.deleteMember.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.state = {
            pageOfItems: [],
            error: null
        };
    }
    confirmDialog(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this member?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={() => {
                                this.deleteMember(id);
                                onClose();
                            }}>Confirm</button>
                        </div>
                    </div>
                )
            }
        })
    }
    deleteMember(id) {
        axios
            .post("http://localhost:4000/delete/" + id)
            .then()
            .catch(err => console.log(err));
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    editCustommer(id) {
        this.props.history.push(`/user/${id}`);
    }
    renderTableData() {
        return this.props.dataRes.map(item => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                    <td>{item.position}</td>
                    <td>{item.phone}</td>
                    <td>
                        <Button onClick={() => this.editCustommer(item.id)} label={"Edit"} color={"secondary"} variant={"contained"}></Button>
                    </td>
                    <td>
                        <Button onClick={() => this.confirmDialog(item.id)} label={"delete"} color={"primary"} variant={"contained"}></Button>
                    </td>
                </tr>
            );
        });
    }
    renderTableHeader() {
        let header = this.props.tableHeader;
        return header.map(items => {
            return <th key={items}>{items.toUpperCase()}</th>;
        });
    }

    render() {
        const { error, dataRes } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div>
                    <table id="students">
                        <thead>
                            <tr>{this.renderTableHeader()}</tr>
                        </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>
                    {/* <Pagination items={this.state.dataRes} onChangePage={this.onChangePage} /> */}
                </div>
            );
        }
    }
}

export default Table;
