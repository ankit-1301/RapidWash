//-----------------------------USER PROFILE PAGE--------------------------

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../assets/img/user.png";
import { BACKEND } from '../services/helper';

export default function UserProfile() {
  
  const [totalcount, setTotalCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();
  const [user, setLuser] = useState([]);
  const goback = () => {
    navigate("/user/dashboard");
  };
  useEffect(() => {
    axios
      .get(`${BACKEND}/api/users/check`, { withCredentials: true })
      .then((response) => {
        if (response.data.message === "user not login") { navigate("/user") }
        else if (response.data.message === "user already login") { }
      });
    axios
      .get(`${BACKEND}/api/users/get`, { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          setLuser(response.data.message);
          axios
            .post(`${BACKEND}/api/order/userorderdetail`, {
              email: response.data.message.email,
            })
            .then((response) => {
              setTotalCount(response.data.count);
              setTotalCost(response.data.totalCost);
            });
        } else if (!response.data.message) {
        }
      });


  }, []);

  return (
    <div>
      <div>


        <div className="p-16">
          <div className="p-8 bg-white border-2 border-gray-300 shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-gray-700 text-xl">{totalcount}</p>
                  <p className="text-gray-400">Order</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">₹ {totalCost}</p>
                  <p className="text-gray-400">Total Cost</p>
                </div>

              </div>
              <div className="relative">
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <img
                    className="h-48 w-48 rounded-full"
                    src={user.image || img}

                    alt=""
                  />
                </div>
              </div>

              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"></div>
            </div>

            <div className="mt-20 text-center pb-12">
              <h1 className="text-4xl font-medium text-gray-700 uppercase">
                {user.username} <span className="font-light text-gray-500"></span>
              </h1>
              <p className="font-light text-gray-600 mt-3 lowercase">{user.email}</p>

              <p className="mt-8 text-gray-500 uppercase">{user.address}</p>
              <p className="mt-2 text-gray-500 uppercase">
                {user.city} - {user.pincode}
              </p>
              <p className="mt-2 text-gray-500 uppercase">{user.occ}</p>
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
    </div>
  );
}
