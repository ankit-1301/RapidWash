//------------------------------WASHERMAN LOGIN------------------------------------------

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/assets/css/User.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';
function Washerman() {
  // const Backend=helper;
  // console.log("giiiiiiiii",Backend);
  const [currentStep, setCurrentStep] = useState(1);
  const [logemail, setEmail] = useState("");
  const [logpass, setPass] = useState("");
  const [signame, setName] = useState("");
  const [sigpass, setSpass] = useState("");
  const [sigemail, setSemail] = useState("");
  const [sigadd, setAdd] = useState("");
  const [sigcity, setCity] = useState("");
  const [sigpin, setPin] = useState("");
  const [sigsname, setSname] = useState("");
  const [sigcon, setCon] = useState("");
  const [sigcost, setCost] = useState("");
  const [upi,setupi]=useState("");
  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleprev = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND}/api/users/check`, { withCredentials: true })
      .then((response) => {
        if (response.data.message === "user not login") {
        } else if (response.data.message === "user already login") {
          navigate("/user/dashboard");
        }
      });
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


      
  }, []);

  const handlesignup = async (sevent) => {
    sevent.preventDefault();
    if (
      sigemail === "" ||
      sigpass === "" ||
      signame === "" ||
      sigadd === "" ||
      sigcity === "" ||
      sigcon === "" ||
      sigpin === "" ||
      sigsname === ""||upi===""
    ) {
      toast.error("All fields are required");
    } else {

      await axios
        .post(`${BACKEND}/api/washerman/signup`, {
          username: signame,
          email: sigemail,
          password: sigpass,
          address: sigadd,
          city: sigcity,
          pincode: sigpin,
          shopname: sigsname,
          contact: sigcon,
          cost: sigcost,
          hw:1.3*sigcost,
          dc:0.8*sigcost,
          oi:0.6*sigcost,
          upi:upi,
        })
        .then((response) => {
          if (response.data.message === "Signup successful") {
            window.location.reload();
          } else if (response.data.message === "User Already Exists") {
            toast.error("User Already Exists");
          }
        });
    }
  };

  const handlelogin = async (event) => {
    event.preventDefault();
    if (logemail === "" || logpass === "") {
      toast.error("Email and password fields are required");
    } else {
      await axios
        .post(
          `${BACKEND}/api/washerman/login`,
          {
            email: logemail,
            password: logpass,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.message === "Successfully logged in") {
            updateUser(response.data.washerman);
            navigate("/washerman/dashboard", {state: { washerman: response.data.washerman },});
          } else if (response.data.message === "Invalid Password") {
            toast.error("Invalid Password");
          } else if (response.data.message === "User not found") {
            toast.error("User not found");
          } else {
            console.log(response.data.message);
            toast.error("Email and Password fields are invalid");
          }
        });
    }
  };

  return (
    <div>
      <div className="section">
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
                            <h4 className="mb-4 pb-3 text-2xl">
                              Washerman Log In
                            </h4>
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              value={logemail}
                              onChange={(event) => setEmail(event.target.value)}
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
                              onChange={(event) => setPass(event.target.value)}
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
                            onClick={() => navigate("/user")}
                          >
                            User ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <div className="body">
                            <h4 className="mb-4 pb-3 text-2xl">
                              Washerman Sign Up
                            </h4>
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
                                  onChange={(sevent) =>
                                    setName(sevent.target.value)
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
                                  onChange={(sevent) =>
                                    setSemail(sevent.target.value)
                                  }
                                />
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
                                  onChange={(sevent) =>
                                    setSpass(sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-lock-alt"></i>
                              </div>
                              <button className="btn mt-4" onClick={handleNext}>
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
                                  placeholder="Your Shop Address"
                                  id="sigadd"
                                  value={sigadd}
                                  onChange={(sevent) =>
                                    setAdd(sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-store"></i>
                              </div>
                              <div className="form-group mt-2">
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
                                  name="sigpin"
                                  className="form-style"
                                  placeholder="Your Area Pincode"
                                  id="sigpin"
                                  value={sigpin}
                                  onChange={(sevent) =>
                                    setPin(sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-map-pin-alt"></i>
                              </div>
                              <button className="btn mt-4" onClick={handleprev}>
                                Previous
                              </button>
                              <button className="btn mt-4" onClick={handleNext}>
                                Next
                              </button>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="sigsname"
                                  className="form-style"
                                  placeholder="Your Shope Name"
                                  id="sigsname"
                                  value={sigsname}
                                  onChange={(sevent) =>
                                    setSname(sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-shop"></i>
                              </div>
                              
                              <div className="form-group mt-2">
                                <input
                                  type="tel"
                                  name="sigcon"
                                  className="form-style"
                                  placeholder="Your Contact no."
                                  id="sigcon"
                                  value={sigcon}
                                  onChange={(sevent) =>
                                    setCon(sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-phone"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="number"
                                  name="sigcost"
                                  className="form-style"
                                  placeholder="Cost Per Pair"
                                  id="sigcost"
                                  value={sigcost}
                                  onChange={(sevent) =>
                                    setCost(sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-rupee-sign"></i>
                              </div>
                              <div>
                                <button
                                  className="btn mt-4"
                                  onClick={handleprev}
                                >
                                  Previous
                                </button>
                                <button className="btn mt-4" onClick={handleNext}>
                                Next
                              </button>
                              </div>
                            </div>
                          )}
                          {currentStep === 4 && (
                            <div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="upi"
                                  className="form-style"
                                  placeholder="Your UPI ID"
                                  id="upi"
                                  value={upi}
                                  onChange={(sevent) =>
                                    setupi(sevent.target.value)
                                  }
                                />
                                <i className="input-icon uil uil-shop"></i>
                              </div>
                              
                              <div>
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
      
      <div className="float-right text-white hover:text-red-500 bg-black w-full" onClick={()=>{navigate("/deliveryboy")}}>DeliveryBoy ?</div>
      <Footer/>
      <ToastContainer />
    </div>
  );
}

export default Washerman;
