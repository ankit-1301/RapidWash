//------------------------------------USER LOGIN PAGE-----------------------------------

import React from "react";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/assets/css/User.css";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import Footer from "../Components/Footer";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';

function User() {
  const [sigocc, setocc] = useState("");
  const [sigcity, setCity] = useState("");
  const [logemail, setEmail] = useState("");
  const [logpass, setPassword] = useState("");
  const [signame, setName] = useState("");
  const [sigemail, setSemail] = useState("");
  const [sigpass, setSpass] = useState("");
  const [sigadd, setAdd] = useState("");
  const [sigcon, setCon] = useState("");
  const [sigpin, setPin] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BACKEND}/api/washerman/check`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message === "washerman not login") {
        } else if (response.data.message === "washerman already login") {
          navigate("/washerman/dashboard");
        }
      });
    axios
      .get(`${BACKEND}/api/users/check`, { withCredentials: true })
      .then((response) => {
        if (response.data.message === "user not login") {
        } else if (response.data.message === "user already login") {
          navigate("/user/dashboard");
        }
      });
      
  }, []);
  const handEmail = async(e)=>{
    const value = e.target.value;
    setIsValidEmail(validator.isEmail(value));
    if(setIsValidEmail){
      setSemail(value)
    }
  }

  const handlelogin = async (event) => {
    event.preventDefault();
    if (logemail === "" || logpass === "") {
      toast.error("Email and password fields are required");
    } else {
      await axios
        .post(
          `${BACKEND}/api/users/login`,
          {
            email: logemail,
            password: logpass,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.message === "Successfully logged in") {
            updateUser(response.data.user);
            navigate("/user/dashboard", {
              state: { user: response.data.user },
            });
          } else if (response.data.message === "Invalid Password") {
            toast.error("Invalid Password");
          } else if (response.data.message === "User not found") {
            toast.error("User not found");
          } else {
            toast.error("Email and Password fields are invalid");
          }
        });
    }
  };
  const handlesignup = async (Sevent) => {
    Sevent.preventDefault();
    if (
      sigemail === "" ||
      sigpass === "" ||
      signame === "" ||
      sigadd === "" ||
      sigcon === "" ||
      sigpin === ""||sigcity===""
    ) {
      toast.error("Email and password fields are required");
    } else {
      await axios
        .post(`${BACKEND}/api/users/signup`, {
          username: signame,
          email: sigemail,
          password: sigpass,
          address: sigadd,
          contact: sigcon,
          pincode: sigpin,
          city:sigcity,
          occ:sigocc
        })
        .then((response) => {
          if (response.data.message === "User Already Exists") {
            toast.error("User Already Exists");
          } else if (response.data.message === "Signup successful") {
            window.location.reload();
          }
        });
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleprev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <div className="st.section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <div className="body">
                            <h4 className="mb-4 pb-3 text-2xl">User Log In</h4>
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
                            Submit
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

                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <div className="body">
                            <h4 className="mb-4 pb-3 text-2xl">User Sign Up</h4>
                          </div>
                          {currentStep === 1 && (
                            <div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="signame"
                                  className="form-style"
                                  placeholder="Your Full Name"
                                  id="signame"
                                  value={signame}
                                  onChange={(Sevent) =>
                                    setName(Sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-user"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="email"
                                  name="sigemail"
                                  className="form-style"
                                  placeholder="Your Email"
                                  id="sigemail"
                                  value={sigemail}
                                  onChange={handEmail
                                  }
                                />{!isValidEmail && <p className="text-white">Please enter a valid email address.</p>}

                                <i className="input-icon uil uil-at"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="password"
                                  name="sigpass"
                                  className="form-style"
                                  placeholder="Your Password"
                                  id="sigpass"
                                  value={sigpass}
                                  onChange={(Sevent) =>
                                    setSpass(Sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-lock-alt"></i>
                              </div>
                              <button
                                className="btn mt-4"
                                onClick={handleNext}
                              >
                                Next
                              </button>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="sigadd"
                                  className="form-style"
                                  placeholder="Your Address"
                                  id="sigadd"
                                  value={sigadd}
                                  onChange={(Sevent) =>
                                    setAdd(Sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-location-point"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="tel"
                                  name="sigcon"
                                  className="form-style"
                                  placeholder="Enter Your Contact"
                                  id="sigcon"
                                  value={sigcon}
                                  onChange={(Sevent) =>
                                    setCon(Sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-phone"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="text"
                                  name="sigpin"
                                  className="form-style"
                                  placeholder="Your Pincode"
                                  id="sigpin"
                                  value={sigpin}
                                  onChange={(Sevent) =>
                                    setPin(Sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-map-pin-alt"></i>
                              </div>
                              <button
                                className="btn mt-4"
                                onClick={handleprev}
                              >
                                Previous
                              </button>
                              <button
                                className="btn mt-4"
                                onClick={handleNext}
                              >
                                Next
                              </button>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div>
                              <div className="form-group">
                                <select
                                  id="sigcity"
                                  name="sigcity"
                                  className="form-style"
                                  value={sigcity}
                                  onChange={(sevent) =>
                                    setCity(sevent.target.value)
                                  }
                                >
                                  <option value="" disabled selected>
                                    Select a City
                                  </option>
                                  <option value="surat">Surat</option>
                                  <option value="rajkot">Rajkot</option>
                                  <option value="gandhinagar">
                                    Gandhinagar
                                  </option>
                                  <option value="nadiad">Nadiad</option>
                                </select>
                                <i className="input-icon uil uil-location-point"></i>
                              </div>
                              <div className="form-group mt-2">
                              <input
                                  type="text"
                                  name="sigocc"
                                  className="form-style"
                                  placeholder="Your Occupation"
                                  id="sigocc"
                                  value={sigocc}
                                  onChange={(Sevent) =>
                                    setocc(Sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-chat-bubble-user"></i>
                                </div>
                              <button
                                className="btn mt-4"
                                onClick={handleprev}
                              >
                                Previous
                              </button>
                              <button
                                className="btn mt-4"
                                onClick={handlesignup}
                              >
                                Submit
                              </button>
                            </div>
                          )}
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
      <Footer/>
      <ToastContainer />
    </div>
  );
}

export default User;
