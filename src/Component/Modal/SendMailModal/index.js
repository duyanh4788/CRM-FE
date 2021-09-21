import React, { Component } from "react";
import "./css.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axiosFetch from "../../../axios";
import { url } from "../../../axios/domainUrl";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export default class ModalSendMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      email: "",
      message: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (message) => {
    this.setState({
      message,
    })
  }

  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      email: this.props.dataSendMail,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.message = draftToHtml(convertToRaw(this.state.message.getCurrentContent()))
    this.sendMailUser();
  };
  sendMailUser = () => {
    axiosFetch(`${url}/sendmail`, "POST", this.state)
      .then((result) => {
        const myModal = document.getElementById("btn-close");
        alert("Gửi mail Thành Công");
        document.getElementById("myform1").reset();
        myModal.click();
      })
      .catch((err) => {
        console.log(err.response);
        alert("Gửi mail Không thành công");
        document.getElementById("myform1").reset();
      });
  };
  render() {
    return (
      <div>
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
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Message:
                      </label>
                      <Editor
                        editorState={this.state.message}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                      />;
                      {/* <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="message"
                        onChange={this.handleOnchange}
                      /> */}
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
                        Send Mail
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
