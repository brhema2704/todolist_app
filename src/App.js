import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      isLoggedIn: false,
      username: "",
      password: "",
      userInput: "",
      list: JSON.parse(localStorage.getItem("todoList")) || [], // Load from localStorage
    };
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // Add item if user input is not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(), // Add a random id which is used to delete
        value: this.state.userInput, // Add a user value to list
      };

      // Update list
      const list = [...this.state.list, userInput];

      // Save to localStorage
      localStorage.setItem("todoList", JSON.stringify(list));

      // Reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }

  // Function to delete item from list use id to delete
  deleteItem(key) {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== key);

    // Update list in state and localStorage
    this.setState({ list: updateList });
    localStorage.setItem("todoList", JSON.stringify(updateList));
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      todos[index].value = editedTodo;
      this.setState({ list: todos });

      // Save updated list to localStorage
      localStorage.setItem("todoList", JSON.stringify(todos));
    }
  };

  // Handle login
  handleLogin = () => {
    const { username, password } = this.state;
    if (username === "validUser" && password === "password123") {
      this.setState({ isLoggedIn: true });
    } else {
      alert("Invalid username or password");
    }
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Container>
        {!isLoggedIn ? (
          // Login Form
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
            }}
          >
            <h2>Login</h2>
            <InputGroup className="mb-3" style={{ maxWidth: "300px" }}>
              <FormControl
                placeholder="Username"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </InputGroup>
            <InputGroup className="mb-3" style={{ maxWidth: "300px" }}>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </InputGroup>
            <Button variant="dark" style={{ maxWidth: "300px" }} onClick={this.handleLogin}>
              Login
            </Button>
          </Row>
        ) : (
          // To-Do List Page
          <>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "3rem",
                fontWeight: "bolder",
              }}
            >
              TODO LIST
            </Row>

            <hr />
            <Row>
              <Col md={{ span: 5, offset: 4 }}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="add item . . . "
                    size="lg"
                    value={this.state.userInput}
                    onChange={(item) =>
                      this.updateInput(item.target.value)
                    }
                    aria-label="add something"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup>
                    <Button
                      variant="dark"
                      className="mt-2"
                      onClick={() => this.addItem()}
                    >
                      ADD
                    </Button>
                  </InputGroup>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 5, offset: 4 }}>
                <ListGroup>
                  {/* map over and print items */}
                  {this.state.list.map((item, index) => {
                    return (
                      <div key={index}>
                        <ListGroup.Item
                          variant="dark"
                          action
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {item.value}
                          <span>
                            <Button
                              style={{ marginRight: "10px" }}
                              variant="light"
                              onClick={() => this.deleteItem(item.id)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="light"
                              onClick={() => this.editItem(index)}
                            >
                              Edit
                            </Button>
                          </span>
                        </ListGroup.Item>
                      </div>
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    );
  }
}

export default App;



