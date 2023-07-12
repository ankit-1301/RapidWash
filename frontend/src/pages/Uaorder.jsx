//--------------------------ORDERTABLE PAGE IN USER SIDE--------------------------------------------

import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Details from "../Components/OrderTable";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';

function Uaorder() {
  const user = useContext(UserContext).lguser;
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('Under Approval');
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Under Approval');
  console.log('stsss', status);
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

  //-----------------------USER DELETE ORDER-----------------------
  const onDeleteOrder = async (id) => {
    axios
      .post(`${BACKEND}/api/order/delete`, {
        _id: id,
      })
      .then((res) => {
        setCount(count + 1);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    //---------------DISPLAY ALL ORDER BY USER------------------
    console.log('haaahaahahahamma', user.email, status);
    axios
      .post(`${BACKEND}/api/order/detail`, {
        uemail: user.email,
        status: status,
      })
      .then((res) => {
        setOrders(res.data.orders);
        console.log(res.data.orders);
      })
      .catch((err) => console.log(err));
  }, [status, count, user]);
  useEffect(() => {
    //-----------------------USER LOGIN CHECK-----------------
    axios
      .get(`${BACKEND}/api/users/check`, { withCredentials: true })
      .then((response) => {
        // console.log("dash");
        if (response.data.message === "user not login") {
          navigate("/user");
          window.location.reload();
        } else if (response.data.message === "user already login") {
          navigate("/user/order");
        }
      });
  }, []);





  return (
    <>
      <div className="min-h-screen">

        <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
              {status} Order
              {/* {user.username} */}
            </h2>
          </div>
        </header>
        <div className="flex">
          <div className="container">
            <nav className="">
              <div className=" flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">

                <div className={getTabClassNames('Under Approval')} onClick={event => sts(event, 'Under Approval')}>
                  Under Approval
                </div>

                <div className={getTabClassNames('Picking')} onClick={event => sts(event, 'Picking')}>
                  Picking
                </div>

                <div className={getTabClassNames('Picked')} onClick={event => sts(event, 'Picked')}>
                  Picked
                </div>

                <div className={getTabClassNames('Processing')} onClick={event => sts(event, 'Processing')}>
                  Processing
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
                        <Details key={order._id} order={order} onDeleteOrder={onDeleteOrder} />
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

export default Uaorder;
