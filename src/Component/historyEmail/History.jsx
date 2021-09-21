import React, { useEffect, useState } from 'react'
import axiosFetch from '../../axios'
import "./history.css"
import dayjs from "dayjs";
import { url } from '../../axios/domainUrl';

function History(props) {

    const [historyEmail, setHistory] = useState([])

    useEffect(() => {
        axiosFetch(`${url}/historyEmail`, "GET", null)
            .then(history => {
                setHistory(history.data.data.email)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    
    return (
        <div className="ModalUser">
            <div
                className="modal fade"
                id="exampleModal3"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            ><div className="modal-dialog">
                    <div className="modal-content">
                        <h4 className="h4 text-center">History Send Email</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>To Send</th>
                                    <th>From To</th>
                                    <th>Title</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyEmail.filter(item => item.emailTo === props.emailUser).map((items, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{items.emailFrom}</td>
                                            <td>{items.emailTo}</td>
                                            <td>{items.title.slice(0, 10)}</td>
                                            <td>{dayjs(items.CurrentSigninAt).format("DD-MM-YYYY hh:mm")}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div></div>
        </div>
    )
}

export default History
