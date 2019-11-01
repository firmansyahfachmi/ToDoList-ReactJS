import React, { Component, Fragment } from "react";
import { Button, Form } from "react-bootstrap";

import "./cardnote.css";

class CardNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      idEdit: "",
      noteData: {
        title: "",
        description: "",
        color: ""
      }
    };
  }

  change = e => {
    let formData = { ...this.state.noteData };
    formData[e.target.name] = e.target.value;
    this.setState({ noteData: formData });
  };

  editNote = (id, title, description, color) => {
    let push = {
      ...this.state.noteData,
      title: title,
      description: description,
      color: color
    };
    this.setState({ edit: true, idEdit: id, noteData: push });
  };

  submitEdit = id => {
    this.props.handleChange(this.state.noteData, id);
    this.setState({ edit: false });
  };

  render() {
    return (
      <Fragment>
        {this.props.data.map((item, index) => (
          <div
            className={`col-lg-12 cardNote shadow-sm pl-0 pr-0 mb-3 bg-${item.color}`}
            key={index}
          >
            <div className="col-lg-12 top">
              {this.state.edit === true && this.state.idEdit === index ? (
                <>
                  <Form.Control
                    name="title"
                    type="text"
                    defaultValue={item.title}
                    className="col-lg-7"
                    placeholder="Title"
                    onChange={this.change}
                  />
                  <select
                    name="color"
                    className="ml-1 form-control col-lg-2"
                    onChange={this.change}
                  >
                    <option>Choose Color...</option>
                    <option value="warning" className="bg-warning">
                      Yellow
                    </option>
                    <option value="danger" className="bg-danger">
                      Red
                    </option>
                    <option value="success" className="bg-success">
                      Green
                    </option>
                    <option value="primary" className="bg-primary">
                      Blue
                    </option>
                    <option value="info" className="bg-info">
                      Teal
                    </option>
                  </select>
                  <Button
                    className="ml-auto"
                    variant="primary"
                    onClick={() => this.submitEdit(index)}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <Button
                    className="ml-auto"
                    variant="white"
                    onClick={() =>
                      this.editNote(
                        index,
                        item.title,
                        item.description,
                        item.color
                      )
                    }
                  >
                    {item.color.length < 1 ? (
                      <i className="fas fa-pen" style={{ color: "teal" }}></i>
                    ) : (
                      <i className="fas fa-pen" style={{ color: "white" }}></i>
                    )}
                  </Button>
                  <Button
                    className="ml-1"
                    variant="white"
                    onClick={() => this.props.handleDelete(index)}
                  >
                    {item.color.length < 1 ? (
                      <i
                        className="fas fa-trash"
                        style={{ color: "rgb(199, 52, 52)" }}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-trash"
                        style={{ color: "white" }}
                      ></i>
                    )}
                  </Button>
                </>
              )}
            </div>
            <div className="col-lg-12 body m-auto">
              {this.state.edit === true && this.state.idEdit === index ? (
                <textarea
                  name="description"
                  className="form-control col-lg-10"
                  rows="5"
                  defaultValue={item.description}
                  placeholder="Description"
                  onChange={this.change}
                ></textarea>
              ) : item.color.length < 1 ? (
                <p style={{ color: "grey" }}>{item.description}</p>
              ) : (
                <p style={{ color: "white" }}>{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default CardNote;
