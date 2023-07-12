//------------------------------WASHERMAN ORDERTABLE PAGE------------------------------------

import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Details from "../Components/Wordertable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';
function Waorder() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Under Approval');
  const washerman = useContext(UserContext).lguser;
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Under Approval');
  const [count, setCount] = useState(0);
  const [boys, setBoys] = useState([]);
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
  const DeliveryDetail = (del, id) => {
    if (del != '-') {
      axios
        .post(`${BACKEND}/api/delivery/getboybyemail`, { email: del })
        .then((response) => {
          axios
            .post(`${BACKEND}/api/order/editdel`, {
              _id: id,
              Deliveryboy: response.data.boy
            })
            .then((response) => {
              setCount(count + 1);
            });
        });
    } else {

    }

  };
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
  const onChangestatus = async (id) => {
    axios
      .post(`${BACKEND}/api/order/status`, {
        _id: id,
      })
      .then((res) => {
        setCount(count + 1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
          axios
            .post(`${BACKEND}/api/order/req`, {
              wemail: washerman.email,
              status: status,
            })
            .then((res) => {
              setOrders(res.data.orders);
            })
            .catch((err) => console.log(err));

          axios
            .post(`${BACKEND}/api/delivery/getboy`, { wemail: washerman.email })
            .then((response) => {
              setBoys(response.data.boys)
              console.log("get boy", response.data.boys);
            });
  }, [status, count,washerman]);

  useEffect(() => {
    axios
      .get(`${BACKEND}/api/washerman/check`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message === "washerman not login") {
          navigate("/washerman");
          window.location.reload();
        } else if (response.data.message === "washerman already login") {
          navigate("/washerman/order");
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
            </h2>
          </div>
        </header>
        <div className="container">
          <nav className="">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">

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
          <div className="overflow-x-auto container">
            <div>
              <div className="w-full">
                <div className="shadow-md rounded my-5">
                  <table className="min-w-max bg-white w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Order ID</th>
                        <th className="py-3 px-6 text-left">User Name</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Payment Mode</th>
                        <th className="py-3 px-6 text-left">Reffrance Id</th>
                        <th className="py-3 px-6 text-left">Total Pair</th>
                        <th className="py-3 px-6 text-left">Total Price</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    {orders.map((order) => (
                      <Details order={order} onDeleteOrder={onDeleteOrder} onChangestatus={onChangestatus} boys={boys} DeliveryDetail={DeliveryDetail} />
                    ))}
                  </table>
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

export default Waorder;
