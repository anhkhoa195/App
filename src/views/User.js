import React from "react";
import { router } from "react-router-dom";
import axios from "axios";
import { Row, Form, Col, Button } from "react-bootstrap";
class User extends React.Component {
  constructor(props) {
    super(props);
    let pathName = window.location.pathname.split("/");
    this.initialState = {
      id: "",
      name: "",
      age: "",
      email: "",
      position: "",
      phone: ""
    };
    this.state = {
      isCreateProduct: false,
      error: null,
      id: pathName[2],
      response: { id: 1, name: "Wasif", age: 21, email: "wasif@email.com", position: "", phone: "" },
      isEditProduct: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onCreate() {
    this.setState({ isAddProduct: true });
    this.setState(this.initialState);
  }

  onFormSubmit(data) {
    let apiUrl;

    if (this.state.isEditProduct) {
      apiUrl = "http://localhost:3000/editProduct";
    } else {
      apiUrl = "http://localhost:3000/createProduct";
    }

    axios
      .post(apiUrl + this.state.id, data)
      .then(res =>
        res.json().then(
          result => {
            this.setState({
              response: result,
              isAddProduct: false,
              isEditProduct: false
            });
          },
          error => {
            this.setState({ error });
          }
        )
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  //   getProductById = productId => {
  //     const pathName = window.location.pathname.split("/");
  //     const id = pathName[2];

  //     const apiUrl = "http://localhost:3000/getProduct";
  //     const formData = new FormData();
  //     formData.append("productId", productId);

  //     const options = {
  //       method: "POST",
  //       body: formData
  //     };

  //     fetch(apiUrl, options)
  //       .then(res => res.json())
  //       .then(
  //         result => {
  //           this.setState({
  //             product: result,
  //             isEditProduct: true,
  //             isAddProduct: true
  //           });
  //         },
  //         error => {
  //           this.setState({ error });
  //         }
  //       );
  //   };
  render() {
    return (
      <div className="wrapAll">
        <h2>Update User</h2>
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={this.state.response.id}
                  defaultValue={this.state.id}
                  onChange={this.handleChange}
                  placeholder="ID"
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.response.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={this.state.response.age}
                  onChange={this.handleChange}
                  placeholder="Age"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={this.state.response.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={this.state.response.position}
                  onChange={this.handleChange}
                  placeholder="Position"
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={this.state.response.phone}
                  onChange={this.handleChange}
                  placeholder="Phone"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.response.id} />
                <Button variant="success" type="submit">
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
