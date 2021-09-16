import React, { Component } from "react";
import axiosFetch from "../../axios";
import "./css.css";
import User from "../User";
import ModalSendMail from "../Modal/SendMailModal";
import { connect } from "react-redux";
import { getCreatetatus_Action, getDataUser_Action, getUpdateStatus_Action, searchDataUser_Action } from "../../reducer/getData.action";
import { url } from "../../axios/domainUrl";


class ListUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stateSearchfi: true,
    };
  }

  componentDidMount() {
    this.fetchGetUser();

  }

  componentDidUpdate() {
    if (this.props.statusCodeUpdate === 200) {
      this.fetchGetUser();
      this.props.resetStatusCodeUpdate(0)
    }
    if (this.props.statusCodeCreate === 201) {
      this.fetchGetUser();
      this.props.resetStatusCodeCreate(0)
    }
  }

  fetchGetUser = async () => {
    await axiosFetch(`${url}`, "GET")
      .then((result) => {
        this.setState({ loading: false });
        this.props.getDataUser(result.data.data.users)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleOnchange = (e) => {
    this.props.searchDataUser(e.target.value)
    if (e.target.value === "") {
      this.fetchGetUser();
    }
  };

  renderUser = () => {
    return this.props.dataUsers.map((item, index) => {
      return (
        <User key={index} dataItem={item} />
      );
    });
  };

  clickSearch = () => {
    const search = document.getElementById("search_fi");
    if (this.state.stateSearchfi) {
      search.style.width = "150px";
      search.style.display = "inline";
      this.setState({ stateSearchfi: false });
    } else {
      search.style.width = "0px";
      search.style.display = "none";
      this.setState({ stateSearchfi: true });
    }
  };

  render() {
    if (this.state.loading) {
      return "dang loading";
    }

    return (
      <div className="containerr">
        <div className="ListUser_container">
          <div className="ListUser_container_menu">
            <h5>Tất Cả Liên Hệ</h5>
            <div className="ListUser_container_menu_icon">
              <input
                type="text"
                onChange={this.handleOnchange}
                className="search_fi"
                id="search_fi"
              />
              <i className="fas fa-search" style={{ cursor: "pointer" }} onClick={this.clickSearch}></i>
              <i
                className="fas fa-plus-circle text-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
          <ul className="ListUser_container_ul">
            {this.renderUser()}
          </ul>
        </div>
        <div className="User_profile">
          {this.props.dataUserById ?
            <>
              <ModalSendMail dataSendMail={this.props.dataUserById.email} />
              <div className="User_profile_container">
                <div className="User_profile_container_content">
                  <i
                    className="fas fa-share-square "
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                    data-bs-whatever="@mdo"
                  ></i>
                  <div className="User_profile_container_content_avatar">
                    <img src="https://static.toiimg.com/thumb/resizemode-4,msid-76729536,width-1200,height-900/76729536.jpg" alt="" />
                  </div>
                  <div className="User_profile_container_content_text">
                    <div
                      className="User_profile_container_content_text_text"
                      id="User_profile_container_content_text_text"
                    >
                      <h3>{this.props.dataUserById.name}</h3>
                      <p className="text-primary">
                        <i className="fas fa-envelope"></i>
                        {this.props.dataUserById.email}
                      </p>
                      <p>
                        <i className="fas fa-phone"></i>0{this.props.dataUserById.sdt}
                      </p>
                      <p>
                        <i className="fas fa-home"></i>
                        {this.props.dataUserById.address}
                      </p>
                      <p>
                        <i className="fas fa-business-time"></i>
                        {this.props.dataUserById.CurrentSigninAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
            : <div className="User_profile_container">
              <div className="User_profile_notifyContact">
                <span className="notifyContact">Vui Lòng Chọn Liên Hệ</span>
              </div>
            </div>}
        </div>
      </div>
    );
  }
}

const mapDispacthToProps = (dispacth) => {
  return {
    getDataUser: (data) => {
      dispacth(getDataUser_Action(data))
    },
    searchDataUser: (data) => {
      dispacth(searchDataUser_Action(data))
    },
    resetStatusCodeUpdate: (data) => {
      dispacth(getUpdateStatus_Action(data))
    },
    resetStatusCodeCreate: (data) => {
      dispacth(getCreatetatus_Action(data))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    dataUsers: state.userReducer.dataUsers,
    dataUserById: state.userReducer.dataUserById,
    statusCodeUpdate: state.userReducer.statusCode,
    statusCodeCreate: state.userReducer.statusCodeCreate
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(ListUser);