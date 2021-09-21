import React, { Component } from "react";
import "./css.css";
import axiosFetch from "../../../axios";
import { url } from "../../../axios/domainUrl";

export default class ModalSendMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      email: "",
      message: "",
    };
  }

  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      email: this.props.dataSendMail,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.sendMailUser()
  };
  sendMailUser = () => {
    axiosFetch(`${url}/sendmail`, "POST", this.state)
      .then((result) => {
        console.log(result);
        alert("Gửi mail Thành Công");
        document.getElementById("myform1").reset();
        const myModal = document.getElementById("btn-closeEmail");
        myModal.click();
      })
      .catch((err) => {
        alert("Gửi mail không Thành Công");
        const myModal = document.getElementById("btn-closeEmail");
        myModal.click();

      });
  };
  render() {
    return (
      <div className="ModalUser">
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  SEND MAIL
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit} id="myform1">
                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label"
                    >
                      Tiêu Đề:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="header"
                      onChange={this.handleOnchange}
                    />
                  </div>
                  <div className="mb-3">
                    <p
                      htmlFor="recipient-name"
                      className="col-form-p"
                    >
                      Message:
                    </p>
                    <textarea name="message" onChange={this.handleOnchange} className="textarea"></textarea>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      id="btn-closeEmail"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Send Mail
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
