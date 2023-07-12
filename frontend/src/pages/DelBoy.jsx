//----------------------------------DELIVERYBOY LOGIN PAGE-----------------------------------------

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/assets/css/User.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { BACKEND } from '../services/helper';

function DelBoy() {
    const [logemail, setEmail] = useState("");
    const [logpass, setPassword] = useState("");
    const navigate = useNavigate();

    //-------------CHECK LOGIN OR NOT--------------
    axios
        .get(`${BACKEND}/api/delivery/check`, {
            withCredentials: true,
        })
        .then((response) => {
            if (response.data.message === "boy not login") {
            } else if (response.data.message === "boy already login") {
                navigate("/deliveryboy/dash");
            }
        });

    //----------------------LOGIN -----------------------
    const handlelogin = () => {
        axios
            .post(`${BACKEND}/api/delivery/login`, { email: logemail, password: logpass }, { withCredentials: true })
            .then((response) => {
                if (response.data.message === "Successfully logged in") {
                    console.log(response.data.boy);
                    navigate("/deliveryboy/dash");
                } else {
                    toast.error("Email and password Invalid");
                    navigate("/deliveryboy");
                }
            });
    }


    return (
        <div>
            <div className="st.section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">

                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <div className="body">
                                                        <h4 className="mb-4 pb-3 text-2xl">DeliveryBoy Log In</h4>
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            name="logemail"
                                                            className="form-style"
                                                            placeholder="Your Email"
                                                            id="logemail"
                                                            value={logemail}
                                                            onChange={(event) =>
                                                                setEmail(event.target.value)
                                                            }
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            name="logpass"
                                                            className="form-style"
                                                            placeholder="Your Password"
                                                            id="logpass"
                                                            value={logpass}
                                                            onChange={(event) =>
                                                                setPassword(event.target.value)
                                                            }
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>

                                                    <button
                                                        className="btn mt-4"
                                                        onClick={handlelogin}
                                                    >
                                                        submit
                                                    </button>
                                                    <div
                                                        className="text-white hover:text-red"
                                                        onClick={() => navigate("/washerman")}
                                                    >
                                                        Washerman ?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default DelBoy;

