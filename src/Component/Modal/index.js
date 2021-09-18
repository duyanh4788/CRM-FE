import React, { Component } from "react";
import "./css.css";
import axiosFetch from "../../axios";
import { url } from "../../axios/domainUrl";
import { connect } from "react-redux";
import { getCreatetatus_Action } from "../../reducer/getData.action";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      sdt: "",
      address: "",
    };
  }
  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.createUser();
  };
  createUser = () => {
    axiosFetch(`${url}`, "POST", this.state)
      .then((result) => {
        alert(result.data.status);
        this.props.createDataUser(result.status)
        const myModal = document.getElementById("btn-close");
        let form = document.getElementById("formContact")
        form.reset();
        myModal.click();
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      });
  };
  render() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thêm User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit} id="formContact">
                <div className="mb-3">
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="name"
                    onChange={this.handleOnchange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label"
                  >
                    email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="email"
                    onChange={this.handleOnchange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label"
                  >
                    SDT:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="sdt"
                    onChange={this.handleOnchange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="address"
                    onChange={this.handleOnchange}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="btn-close"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispacthToProps = (dispacth) => {
  return {
    createDataUser: (data) => {
      dispacth(getCreatetatus_Action(data))
    },
  }
}

export default connect(null, mapDispacthToProps)(Modal);