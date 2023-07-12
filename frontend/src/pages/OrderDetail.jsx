import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND } from '../services/helper';
function OrderDetail() {
  const [reff, setreff] = useState();
  const [qr, setqr] = useState();
  const [showSubmit, setShowsubmit] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.luser.username);
  const [contact, setContact] = useState(location.state.luser.contact);
  const [address, setAdd] = useState(location.state.luser.address);
  const [email, setEmail] = useState(location.state.luser.email);
  const [pincode, setPin] = useState(location.state.luser.pincode);
  const [cloth, setCloth] = useState(0);
  const [city, setCity] = useState(location.state.washerman.city);
  const [wname, setWname] = useState(location.state.washerman.username);
  const [wemail, setWemail] = useState(location.state.washerman.email);
  const [upi,setupi]=useState(location.state.washerman.upi);
  const [shopname, setshopname] = useState(location.state.washerman.shopname);
  const [payment, setpayment] = useState("CASH ON DELIVERY");
  const [type, setType] = useState("Normal Wash");
  const nw = location.state.washerman.cost;
  const hw = location.state.washerman.hw;
  const dc = location.state.washerman.dc;
  const oi = location.state.washerman.oi;
  const [cost, setCost] = useState(nw);
  const amount = (cost * cloth).toFixed(2);
  const handleTypeChange = (event) => {
    setType(event.target.value);

    if (event.target.value === 'Normal Wash') {
      setCost(nw);

    } else if (event.target.value === 'Hard Wash') {
      setCost(hw);
    } else if (event.target.value === 'Only Dry Clean') {
      setCost(dc);
    } else if (event.target.value === 'Only Iron') {
      setCost(oi);
    }
    console.log("this is final cost", cost);
  };

  const Close = () => {
    navigate("/user/dashboard");
  };
  axios
    .get(`${BACKEND}/api/users/check`, { withCredentials: true })
    .then((response) => {
      console.log("dash");
      if (response.data.message === "user not login") {
        navigate("/user");
      } else if (response.data.message === "user already login") {
      }
    });
    useEffect(() => {
      console.log(cloth*cost);
    axios
    .post("https://upiqr.in/api/qr",{name:wname,vpa:upi,amount})
    .then((response) => {
      console.log(response.data, "dash");
      setqr(response.data);
    });
  }, [cloth]);
  const checknull=()=>{
    if (
      name === "" ||
      contact === "" ||
      address === "" ||
      city === "" ||
      email === "" ||
      pincode === "" ||
      cloth === 0
    ) {
      toast.error("Fields are required");
    }else{setShowsubmit(true)}
  }

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
    } else if(payment==='CASH ON DELIVERY'||payment==='SELF SERVICE') {

      await axios
        .post(`${BACKEND}/api/order/book`, {
          username: name,
          contact: contact,
          uemail: email,
          wemail: wemail,
          shopname: shopname,
          address: address,
          city: city,
          pincode: pincode,
          costp: cost,
          cost: cost * cloth,
          pair: cloth,
          type: type,
          payment:payment
        })
        .then((response) => {
          if (response.data.message === "Booked successful") {
            toast.success("Order Booked  (wailt a moment)");
            setTimeout(() => {
              navigate("/user/order");
            });
          } else {
            toast.error("Retry");
          }
        });
    }else if(payment==='QR CODE'){
      if(reff){
        await axios
        .post(`${BACKEND}/api/order/book`, {
          username: name,
          contact: contact,
          uemail: email,
          wemail: wemail,
          shopname: shopname,
          address: address,
          city: city,
          pincode: pincode,
          costp: cost,
          cost: cost * cloth,
          pair: cloth,
          type: type,
          payment:'UPI',
          reff:reff,
        })
        .then((response) => {
          if (response.data.message === "Booked successful") {
            toast.success("Order Booked  (wailt a moment)");
            setTimeout(() => {
              navigate("/user/order");
            });
          } else {
            toast.error("Retry");
          }
        });
        
      }else{
        console.log("thi si refff",reff);
        toast.error("Enter Reffrance No / ID");
      }
    }
  };

  return (
    <>
      <div>
        <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div class="container max-w-screen-lg mx-auto">
            <div>
              <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div class="text-gray-600">
                    <p class="font-medium text-lg">Book Your Order</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div class="md:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div class="md:col-span-3">
                        <label for="name">Full Name</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="contact">Contact</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={contact}
                          placeholder=""
                          onChange={(event) => setContact(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-5">
                        <label for="email">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={email}
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="address">Address / Street</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={address}
                          placeholder="Plese give full Address"
                          onChange={(event) => setAdd(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={city}
                          placeholder=""
                        />
                      </div>

                      <div class="md:col-span-1">
                        <label for="zipcode">Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value={pincode}
                        />
                      </div>
                      
                      <div class="md:col-span-1">
                        <label for="cloth">How many Pair?</label>
                        <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            name="cloth"
                            id="cloth"
                            placeholder="0"
                            class="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                            value={cloth}
                            onChange={(event) => setCloth(event.target.value)}
                          />
                        </div>
                      </div>
                      <div class="md:col-span-2">
                        <label >Choose Your Type</label>
                        <div>
                          <select
                            class="h-10 w-40 bg-gray-50 flex border border-gray-200 rounded items-center mt-1" onChange={handleTypeChange}
                          >
                            <option value="Normal Wash" selected>Normal Wash</option>
                            <option value="Hard Wash">Hard Wash</option>
                            <option value="Only Dry Clean">Only Dry Clean</option>
                            <option value="Only Iron">Only Iron</option>
                          </select>
                        </div>
                      </div>
                      <div class="md:col-span-5">
                        <label >Choose Your Payment Method</label>
                        <div>
                          <select
                            class="h-10 w-40 bg-gray-50 flex border border-gray-200 rounded items-center mt-1" onChange={(e) => { setpayment(e.target.value) }}>
                            <option value="QR CODE" >QR CODE</option>
                            <option value="SELF SERVICE" >SELF SERVICE</option>
                            <option value="CASH ON DELIVERY" selected>CASH ON DELIVERY</option>
                          </select>
                        </div>
                      </div>

                      <div class="md:col-span-5 text-right">
                        <div class="inline-flex items-end gap-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                            onClick={() => 
                            checknull()
                            }
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
      {/*--------------------------PAYMENT MODE CONFIRMATION -------------------------*/}
      {showSubmit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div class="w-full md:w-1/3 mx-auto">
              <div class="flex flex-col p-4 rounded-lg shadow bg-white">
                <div class="flex">
                  <div>
                    <svg
                      class="w-6 h-6 fill-current text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>

                  <div class="ml-3">
                    <h2 class="font-semibold text-gray-800">Payment Method</h2>
                    <p className="uppercase">{payment}</p>
                    <div>
                      {payment === 'QR CODE' ? (
                        <div>
                        <p>Please pay for confirm Order.</p>
                        
                        <img className="w-11/12 h-11/12" src={`data:image/svg+xml;utf8,${qr}`} alt="qr" />
                        <label for="city">Transaction No</label>
                        <input
                          type="text"
                          name="reff"
                          id="reff"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={reff}
                          placeholder="Transaction No / ID"
                          onChange={(e)=>{setreff(e.target.value)}}
                        />
                      </div>
                      ) : (
                        <div>
                          <p>Please have exact change ready when the delivery arrives.</p>
                        </div>
                        

                      )}
                    </div>
                  </div>
                </div>

                <div class="flex justify-end items-center mt-3">
                  <button
                    class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-md"
                    onClick={() => setShowsubmit(false)}
                  >
                    Cancel
                  </button>

                  <button
                    class="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
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
