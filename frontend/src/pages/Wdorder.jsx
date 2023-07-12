//----------------------------------WASHERMAN DONEORDER PAGE--------------------------------------

import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Details from "../Components/Wordertable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';

function Wdorder() {
  const Backend=process.env.BACKEND
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const washerman = useContext(UserContext).lguser;
  const [status,setStatus]=useState('Done');
  const [count ,setCount]=useState(0);
  const [selectedTab, setSelectedTab] = useState('Done');
  const onDeleteOrder = async (id) => {

  axios
    .post(`${BACKEND}/api/order/delete`, {
      _id: id,
    })
    .then((res) => {
      setCount(count+1);
    })
    .catch((err) => console.log(err));
    
};
const onChangestatus = async (id) => {
  axios
    .post(`${BACKEND}/api/order/status`, {
      _id: id,
    })
    .then((res) => {
      setCount(count+1);
    })
    .catch((err) => console.log(err));
};

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
  const sts = (event,sta) => {
    handleTabClick(event, sta)
    setStatus(sta);
  };
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
          navigate("/washerman/order/done");
        }
      });
    }, []);
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
       
  }, [status,count,washerman]);

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
        <nav >
              <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                
                  <div className={getTabClassNames('Done')} onClick={event =>sts(event,'Done')}>
                  Done
                  </div>
                
               
                  <div className={getTabClassNames('Delivered')} onClick={event =>sts(event,'Delivered')}>
                  Delivered
                  </div>
                
              </div>
            </nav>
          <div className="overflow-x-auto">
            <div>
              <div className="">
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
                      <Details order={order} onDeleteOrder={onDeleteOrder} onChangestatus={onChangestatus} />
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

export default Wdorder;
