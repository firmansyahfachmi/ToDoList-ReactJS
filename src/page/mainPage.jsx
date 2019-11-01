import React, { Component, Fragment } from "react";
import { Navbar, InputGroup, FormControl, Button } from "react-bootstrap";

import "./main.css";
import CardNote from "../components/cardNote";

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      stackNote: [],
      toDoTitle: ""
    };
  }

  addNote = () => {
    if (this.state.toDoTitle.length < 1) {
      alert("Fill the title!");
    } else {
      let noteData = {
        title: this.state.toDoTitle,
        description: "",
        color: ""
      };
      this.state.stackNote.push(noteData);
      this.setState({ toDoTitle: "" });
    }
    document.getElementById("inputTitle").value = "";
  };

  setTitle = e => {
    this.setState({
      toDoTitle: e.target.value
    });
  };

  deleteNote = id => {
    let stack = "";
    stack = this.state.stackNote.splice(0, id);

    this.setState({ stackNote: stack });
  };

  edited = (data, id) => {
    let stack = [];
    this.state.stackNote.map((item, index) => {
      if (index === id) {
        let newItem = {
          ...item,
          title: data.title,
          description: data.description,
          color: data.color
        };
        stack.push(newItem);
      } else {
        stack.push(item);
      }
    });

    this.setState({ stackNote: stack });
  };

  render() {
    return (
      <Fragment>
        <Navbar bg="light" className="shadow-sm">
          <Navbar.Brand href="#home">To Do List</Navbar.Brand>
        </Navbar>

        <div className="col-lg-9 ml-auto mr-auto mt-5 main">
          <InputGroup className="mb-3 col-lg-8 ml-auto mr-auto">
            <FormControl
              placeholder="Add Todo list Title"
              onChange={this.setTitle}
              id="inputTitle"
            />
            <InputGroup.Append>
              <Button variant="info" onClick={this.addNote}>
                <i className="fas fa-plus"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="divCard pt-2">
            <CardNote
              data={this.state.stackNote}
              handleDelete={this.deleteNote}
              handleChange={this.edited}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MainPage;
