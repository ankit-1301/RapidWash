
//------------------------------------USER SIDE ORDER EDIT-----------------------------

import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND } from '../services/helper';
function OrderDetail() {
  const [showSubmit, setShowsubmit] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.order.username);
  const [contact, setContact] = useState(location.state.order.contact);
  const [address, setAdd] = useState(location.state.order.address);
  const [email, setEmail] = useState(location.state.order.uemail);
  const [pincode, setPin] = useState(location.state.order.pincode);
  const [cloth, setCloth] = useState(location.state.order.pair);
  const [city, setCity] = useState(location.state.order.city);
  const [wemail, setWemail] = useState(location.state.order.wemail);
  const [shopname, setshopname] = useState(location.state.order.shopname);
  const [type,setType]=useState(location.state.order.type);
  const [cost,setCost]=useState(location.state.order.costp);
  
//-----------------------USER LOGIN OR NOT-------------------------
  axios
  .get(`${BACKEND}/api/users/check`, { withCredentials: true })
  .then((response) => {console.log("dash");
    if (response.data.message === "user not login"){navigate("/user")}
    else if(response.data.message === "user already login"){}
    });

  const Close = () => {
    navigate(-1);
  };

  //-------------------------------SAVE EDIT ORDER------------------------------
  const handleOrder = async (Sevent) => {
    Sevent.preventDefault();
    if (
      name === "" ||
      contact === "" ||
      address === "" ||
      city === "" ||
      email === "" ||
      pincode === "" ||
      cloth === ""
    ) {
      toast.error("Fields are required");
    } else {
      await axios
        .post(`${BACKEND}/api/order/edit`, {
          _id:location.state.order._id,
          username: name,
          contact: contact,
          uemail: email,
          wemail: wemail,
          shopname: shopname,
          address: address,
          city: city,
          pincode:pincode,
          cost: cost * cloth,
          pair:cloth,
        })
        .then((response) => {
          console.log("hii");
          if (response.data.message === "edit successful") {
            toast.success("Order Booked  (wailt a moment)");
            
              navigate("/user/order");
          } else {
            toast.error("Retry");
          }
        });
    }
  };

  return (
    <>
      <div>
        <div className="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Edit Order Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-3">
                        <label for="name">Full Name</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label for="contact">Contact</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={contact}
                          placeholder=""
                          onChange={(event) => setContact(event.target.value)}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="email">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={email}
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label for="address">Address / Street</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={address}
                          placeholder="Plese give full Address"
                          onChange={(event) => setAdd(event.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label for="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={city}
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label for="zipcode">Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value={pincode}
                          // onChange={(event) => setPin(event.target.value)}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label for="soda">How many Pair?</label>
                        <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="number"
                            name="cloth"
                            id="cloth"
                            placeholder="0"
                            className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                            value={cloth}
                            onChange={(event) => setCloth(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-3">
                      <label for="type">Type</label>
                        <input
                          type="text"
                          name="type"
                          id="type"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value={type}
                        /><p className="text-red-500">If you want change type Rebook your Order</p>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end gap-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                            onClick={() => setShowsubmit(true)}
                          >
                            Submit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            onClick={Close}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      {/*--------------------CONFIRMATION POPUP--------------*/}
      {showSubmit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-full md:w-1/3 mx-auto">
              <div className="flex flex-col p-4 rounded-lg shadow bg-white">
                <div className="flex">
                  <div>
                  <svg className="w-6 h-6 fill-current text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                  </div>

                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-800">
                      Edit Your Order
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Are You Sure?
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-3">
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-md"
                    onClick={() => setShowsubmit(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                    onClick={handleOrder}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default OrderDetail;
