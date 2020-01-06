import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Button from "../components/button";
import "../styles/user.css";
class User extends React.Component {
  constructor(props) {
    super(props);
    let pathName = window.location.pathname.split("/");
    let isEditProduct = false;
    this.state = {
      submitted: false,
      error: null,
      response: {},
      isEditProduct: true,
      id: pathName[2],
      name: "",
      age: "",
      email: "",
      position: "",
      phone: ""
    };
    if (this.state.id) {
      this.state.isEditProduct = true;
    } else {
      this.state.isEditProduct = false;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(data) {
    let apiUrl;
    if (this.state.isEditProduct) {
      apiUrl = `http://localhost:4000/editProduct/${this.state.id}`;
    } else {
      apiUrl = "http://localhost:4000/createProduct";
    }

    axios
      .post(apiUrl, data)
      .then(
        res => {
          this.props.history.push("/home");
        },
        error => {
          this.setState({ error });
        }
      )
      .catch(err => console.log(err));
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    let data = {
      id: this.state.id,
      name: this.state.name,
      age: this.state.age,
      email: this.state.email,
      position: this.state.position,
      phone: this.state.phone
    };
    await this.setState({ submitted: true });
    console.log(this.state.submitted);

    event.preventDefault();
    this.onFormSubmit(data);
  }

  componentWillMount() {
    if (this.state.id) {
      const apiUrl = `http://localhost:4000/product/${this.state.id}`;
      axios
        .get(apiUrl)
        .then(
          res => {
            this.setState({
              response: res.data[0]
            });
            this.setState({
              id: this.state.response.id,
              name: this.state.response.name,
              age: this.state.response.age,
              email: this.state.response.email,
              position: this.state.response.position,
              phone: this.state.response.phone
            });
          },
          error => {
            this.setState({ error });
          }
        )
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className="App">
        <h2>
          {this.state.isEditProduct === true
            ? "Edit Customer"
            : "Create Customer"}
        </h2>
        <form className="form-over">
          <div
            className={
              "form-group row" +
              (this.state.submitted && !this.state.id ? " is-invalid" : "")
            }
          >
            <label className="form-label">ID: </label>
            <input
              type="text"
              className={
                "form-control" +
                (this.state.submitted && !this.state.id ? " is-invalid" : "")
              }
              name="id"
              value={this.state.id}
              onChange={this.handleChange}
              placeholder="ID"
            />

            {this.state.submitted && !this.state.id && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div className="form-group row">
            <label className="form-label">Name: </label>
            <input
              type="text"
              className={
                "form-control" +
                (this.state.submitted && !this.state.name ? " is-invalid" : "")
              }
              name="name"
              value={this.state.name}
              defaultValue={this.state.response.name}
              onChange={this.handleChange}
              placeholder="ID"
            />
            {this.state.submitted && !this.state.name && (
              <div className="help-block">Name is required</div>
            )}
          </div>
          <div className="form-group row">
            <label className="form-label">Age: </label>
            <input
              type="text"
              className={
                "form-control" +
                (this.state.submitted && !this.state.age ? " is-invalid" : "")
              }
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
              placeholder="Age"
            />

            {this.state.submitted && !this.state.age && (
              <div className="help-block">Age is required</div>
            )}
          </div>
          <div className="form-group row">
            <label className="form-label">Email: </label>
            <input
              type="text"
              className={
                "form-control" +
                (this.state.submitted && !this.state.email ? " is-invalid" : "")
              }
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />

            {this.state.submitted && !this.state.email && (
              <div className="help-block">Email is required</div>
            )}
          </div>
          <div className="form-group row">
            <label className="form-label">Position: </label>
            <input
              type="text"
              className={
                "form-control" +
                (this.state.submitted && !this.state.position
                  ? " is-invalid"
                  : "")
              }
              name="position"
              value={this.state.position}
              onChange={this.handleChange}
              placeholder="Position"
            />

            {this.state.submitted && !this.state.position && (
              <div className="help-block">Position is required</div>
            )}
          </div>
          <div className="form-group row">
            <label className="form-label">Phone: </label>
            <input
              type="text"
              className={
                "form-control" +
                (this.state.submitted && !this.state.phone ? " is-invalid" : "")
              }
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              placeholder="Phone"
            />

            {this.state.submitted && !this.state.phone && (
              <div className="help-block">Phone is required</div>
            )}
          </div>
          <Button
            className="saveBtn"
            variant="contained"
            onClick={this.handleSubmit}
            label={"Save"}
            color={"primary"}
          />
        </form>
      </div>
    );
  }
}

export default User;
