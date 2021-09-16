import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosFetch from "../../../axios";
import "./css.css";

const ModalUser = (props) => {

  const inforUser = useSelector(state => {
    return state.userReducer.dataUserUpdate
  })

  const [users, setUser] = useState({
    name: "",
    email: "",
    sdt: "",
    address: "",
  })

  useEffect(() => {
    setUser({
      name: inforUser.name,
      email: inforUser.email,
      sdt: inforUser.sdt,
      address: inforUser.address,
    })
  }, [inforUser.address, inforUser.email, inforUser.name, inforUser.sdt])

  const handleOnchange = async (e) => {
    const { name, value } = e.target;
    setUser({
      ...users, [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser()
  };

  const updateUser = () => {
    axiosFetch(`https://mini-project-crm-api.herokuapp.com/api/v1/users/${inforUser._id}`, "PATH", users)
      .then(res => {
        console.log(res);
        alert("ok roi do ");
        const myModal = document.getElementById("btn-close2");
        myModal.click();
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="ModalUser">
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    className="col-form-label"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleOnchange}
                    name="name"
                    value={users.name || ""}
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
                    name="email"
                    value={users.email || ""}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="col-form-label"
                  >
                    SDT:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="sdt"
                    value={users.sdt || ""}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="col-form-label"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={users.address || ""}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="btn-close2"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUser