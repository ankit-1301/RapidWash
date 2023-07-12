//-----------------------------------------------WASHERMAN PROFILE-----------------------------------------

import React, { useState, useEffect } from "react";
import img from "../assets/img/user.png";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img/5jpg.jpg";
import axios from "axios";
import { BACKEND } from '../services/helper';

function Washprofile() {
  const navigate = useNavigate();
  const [washerman, setwasherman] = useState([]);

  const goback = () => {
    navigate("/washerman/dashboard");
  };
  useEffect(() => {
    axios
    .get(`${BACKEND}/api/washerman/check`, { withCredentials: true })
    .then((response) => {console.log("dash");
      if (response.data.message === "washerman not login"){navigate("/washerman");window.location.reload();}
      else if(response.data.message === "washerman already login"){}
      });

      axios
      .get(`${BACKEND}/api/washerman/getwash`, { withCredentials: true })
      .then((response) => {
        console.log("dash",response.data);
        if (response.data.message) {
    
          setwasherman(response.data.message);
        } else{
          navigate("/washerman");
        }
      });
  }, []);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${washerman.simage || img1})` }}
        className="bg-cover bg-center h-96 w-full bg-blue-500"
      >
        <div className="p-16">
          <div className="p-8 bg-white border-2 border-gray-500 shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className=" text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-blue-700 text-xl">{washerman.shopname}</p>
                <p className="text-gray-400">shopname</p>
              </div>
              
            </div>
            <div className="relative ">
              <div className="w-48 h-48 border-2 border-black bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  className="h-48 w-48 rounded-full"
                  src={washerman.image || img}
                  alt=""
                />
              </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"></div>
          </div>

            <div className="mt-20 text-center pb-12">
              <h1 className="text-4xl font-medium text-gray-700 uppercase">
                {washerman.username}
                <span className="font-light text-gray-500"></span>
              </h1>

              <p className="font-light text-gray-600 mt-3 lowercase">
                {washerman.email}
              </p>
              <p className="font-light text-gray-600 mt-3 lowercase">
                UPI ID - {washerman.upi}
              </p>

              <p className="mt-8 text-gray-500 uppercase">{washerman.address}</p>
              <p className="mt-2 text-gray-500 uppercase">
                {washerman.city} - {washerman.pincode}
              </p>
              <p className="mt-2 text-gray-500 gap-2 uppercase">Normal Wash : ₹ {washerman.cost}</p>
              <p className="mt-2 text-gray-500 uppercase">Hard Wash : ₹ {washerman.hw}</p>
              <p className="mt-2 text-gray-500 uppercase">Dry Cleaning : ₹ {washerman.dc}</p>
              <p className="mt-2 text-gray-500 uppercase">Only Iron : ₹ {washerman.oi}</p>
            </div>
            <div className="content-center ">
              <button
                className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md"
                onClick={goback}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Washprofile;
