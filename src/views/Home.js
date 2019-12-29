import React, { useState, useCallback, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import User from "./User";
import Table from "../components/table";
import Button from "../components/button";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";
class Home extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      dataRes: [
        { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" }
        // { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" },
        // { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" },
        // { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" },
        // { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" },
        // { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" },
        // { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" },
        // { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com", position: "", phone: "" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com", position: "", phone: "" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com", position: "", phone: "" }
      ],
      tableHeader: ["id", "name", "age", "email", "position", "phone"]
    };
  }
  componentWillMount() {
    const apiUrl = "http://localhost:4000/products";
    axios
      .get(apiUrl)
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
  addNew() {
    console.log(this.props);

    // this.props.history.push("/user");
  }
  render() {
    return (
      <div className="App">
        <h1>Customer List</h1>
        <Button variant={"contained"} label={"Add new"} color={"primary"} onClick={this.addNew}></Button>
        <Table
          dataRes={this.state.dataRes}
          tableHeader={this.state.tableHeader}
          history={this.props.history}
          isEdit={true}
          isDelete={true}
        />
      </div>
    );
  }
}
export default Home;
