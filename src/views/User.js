import React from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../components/button";
import "../styles/user.css";
class User extends React.Component {
  constructor(props) {
    super(props);
    let pathName = window.location.pathname.split("/");
    let isEditProduct = false;
    this.state = {
      error: null,
      id: pathName[2],
      response: {}
    };
    this.initialState = {
      id: "",
      name: "",
      age: "",
      email: "",
      position: "",
      phone: ""
    };

    if (this.state.response) {
      this.isEditProduct = true;
    } else {
      this.state = this.initialState;
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(data) {
    let apiUrl;
    console.log(this.isEditProduct);

    if (this.isEditProduct) {
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
    console.log(value);

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.onFormSubmit(this.state.response);
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
          },
          error => {
            this.setState({ error });
          }
        )
        .catch(err => console.log(err));
    }
    this.state = this.state.response;
  }
  render() {
    return (
      <div className="App">
        <h2>Customer</h2>
        <Row>
          <Col>
            <Form className="form-over">
              <Form.Group controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleChange}
                  placeholder="ID"
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleChange}
                  placeholder="Age"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={this.state.position}
                  onChange={this.handleChange}
                  placeholder="Position"
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  placeholder="Phone"
                />
              </Form.Group>
              <Form.Group>
                <Button variant="contained" onClick={this.handleSubmit} label={"Save"} color={"primary"} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
