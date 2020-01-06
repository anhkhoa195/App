import React, { useState, useCallback, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import User from "./User";
import Table from "../components/table";
import Button from "../components/button";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";
class Home extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      dataRes: [],
      tableHeader: [
        "id",
        "name",
        "age",
        "email",
        "position",
        "phone",
        "edit",
        "delete"
      ],
      pageAble: null
    };
    this.addNewCustomer = this.addNewCustomer.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.getDataTable = this.getDataTable.bind(this);
  }
  async callbackFunction(childData) {
    await this.setState({ pageAble: childData });
    this.getDataTable();
  }
  getDataTable() {
    const apiUrl = "http://localhost:4000/products";
    axios
      .get(apiUrl, {
        params: {
          pageAble: this.state.pageAble
        }
      })
      .then(
        res => {
          this.setState({
            dataRes: res.data
          });
        },
        error => {
          this.setState({ error });
        }
      )
      .catch(err => console.log(err));
  }
  componentWillMount() {
    this.state.pageAble = "1,10";
    this.getDataTable();
  }
  addNewCustomer() {
    this.props.history.push("/user");
  }
  render() {
    return (
      <div className="App">
        <h1>Customer List</h1>
        <Button
          variant={"contained"}
          label={"Add new"}
          color={"primary"}
          onClick={this.addNewCustomer}
        ></Button>
        <Table
          parentCallback={this.callbackFunction}
          dataRes={this.state.dataRes}
          tableHeader={this.state.tableHeader}
          history={this.props.history}
          pageAble={this.state.pageAble}
          isEdit={true}
          isDelete={true}
        />
      </div>
    );
  }
}
export default Home;
