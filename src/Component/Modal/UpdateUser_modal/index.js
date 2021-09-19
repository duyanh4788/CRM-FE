import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosFetch from "../../../axios";
import { url } from '../../../axios/domainUrl';
import { getUpdateContact_Action, getUpdateStatus_Action } from '../../../reducer/getData.action';
import "./css.css";

const ModalUser = (props) => {

  const dispatch = useDispatch()

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
    const { name, email, sdt, address } = inforUser
    let converSDT = sdt?.toString()
    setUser({
      name: name,
      email: email,
      sdt: converSDT,
      address: address,
    })
  }, [inforUser])

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

  const updateUser = async () => {
    await axiosFetch(`${url}/${inforUser._id}`, "PUT", users)
      .then(res => {
        dispatch(getUpdateStatus_Action(res.status))
        dispatch(getUpdateContact_Action(res.config.data))
        alert(res.data.status);
        const myModal = document.getElementById("btn-close2");
        myModal.click();
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.message);
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