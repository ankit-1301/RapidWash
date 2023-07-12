//-----------------------------USER DONE ORDER PAGE---------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Details from "../Components/OrderTable";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';

function Udorder() {
  const user = useContext(UserContext).lguser;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('Done');

  const [selectedTab, setSelectedTab] = useState('Done');

  const handleTabClick = (event, tabName) => {
    setSelectedTab(tabName);
  };

  const getTabClassNames = (tabName) => {
    if (selectedTab === tabName) {
      return 'border-b-2 border-blue-500 mx-1.5 sm:mx-6 text-gray-800 dark:text-black';
    } else {
      return 'border-b-2 border-transparent px-1 text-gray-500 dark:hover:text-black hover:border-blue-500 mx-1.5 sm:mx-6';
    }
  };

  const sts = (event, sta) => {
    handleTabClick(event, sta)
    setStatus(sta);
  };

  useEffect(() => {
    //--------------------USER LOGIN CHECK-------------------------------
    axios
      .get(`${BACKEND}/api/users/check`, { withCredentials: true })
      .then((response) => {
        // console.log("dash");
        if (response.data.message === "user not login") {
          navigate("/user");
          window.location.reload();
        } else if (response.data.message === "user already login") {
          navigate("/user/order/done");
        }
      });
  }, []);

  useEffect(() => {
    
          //----------------------DISPLAY DONE ORDER--------------------------------
          axios
            .post(`${BACKEND}/api/order/detail`, {
              uemail: user.email,
              status: status,
            })
            .then((res) => {
              setOrders(res.data.orders);
            })
            .catch((err) => console.log(err));
  }, [status,user]);

  return (
    <>
      <div className="min-h-screen">
        <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
              {status} Order
            </h2>
          </div>
        </header>
        <div className="flex">
          <div className="container">
            <nav >
              <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">

                <div className={getTabClassNames('Done')} onClick={event => sts(event, 'Done')}>
                  Done
                </div>


                <div className={getTabClassNames('Delivered')} onClick={event => sts(event, 'Delivered')}>
                  Delivered
                </div>

              </div>
            </nav>
            <div className="overflow-x-auto">
              <div>
                <div className="w-full">
                  <div className="shadow-md rounded my-5">
                    <table className="min-w-max bg-white w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">Order ID</th>
                          <th className="py-3 px-6 text-left">Shop Name</th>
                          <th className="py-3 px-6 text-left">Date</th>
                          <th className="py-3 px-6 text-left">Payment Mode</th>
                          <th className="py-3 px-6 text-left">Reffrance Id</th>
                          <th className="py-3 px-6 text-left">Total Price</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                      </thead>
                      {orders.map((order) => (
                        <Details key={order._id} order={order} />
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Udorder;
