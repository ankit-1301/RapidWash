//---------------------------------------DELIVERYBOY DASHBOARD-------------------------------

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Details from "../Components/DelOrdertable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND } from '../services/helper';

function Delboydash() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [boy, setBoy] = useState();
    const [selectedTab, setSelectedTab] = useState('Picking');
    const [status, setStatus] = useState('Picking');
    const [count, setCount] = useState(0);

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

    //---------------LOGOUT-------------------
    const logout = () => {
        axios
            .get(`${BACKEND}/api/delivery/logout`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message === "Logged out successfully") {
                    localStorage.clear();
                    navigate("/deliveryboy");
                }
            })
            .catch((err) => console.log(err));
    };

    //----------------------------LOGIN OR NOT--------------------------
    axios
        .get(`${BACKEND}/api/delivery/check`, {
            withCredentials: true,
        })
        .then((response) => {
            // console.log("dash");
            if (response.data.message === "boy not login") {
                navigate("/deliveryboy");
            } else if (response.data.message === "boy already login") {

            }
        });

    //---------------------STATUS CHANGE VERIFY OTP------------------------------
    const changestatus = (id, otp) => {
        if (otp != '') {
            axios
                .post(`${BACKEND}/api/order/reqdelboystatuschange`, { _id: id, otp: otp })
                .then((response) => {
                    setCount(count + 1);
                    
                    if (response.data) {
                        setCount(count + 1);
                        console.log(count);
                        console.log("hello");
                    }
                });
        } else {
            toast.error("Enter Otp");
        }

    }

    useEffect(() => {
        //--------------------DELIVERYBOY INFO---------------------------
        axios
            .get(`${BACKEND}/api/delivery/get`, { withCredentials: true })
            .then((response) => {
                if (response.data.boy) {
                    setBoy(response.data.boy)
                    console.log("under", status);
                    //-----------------ALL PICKING ORDER BY DELIVERYBOY--------------------------
                    axios
                        .post(`${BACKEND}/api/order/reqdelboy`, { email: response.data.boy.email, status: status })
                        .then((response) => {
                            if (response.data.orders) {
                                setOrders(response.data.orders)
                            }
                        });
                } else {
                    navigate("/deliveryboy");
                }
            });

    }, [selectedTab, count]);
    console.log(orders);



    return (<>
        <header className="container bg-black shadow flex justify-between items-center">
            <div className="text-center">
                <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
                    DeliveryboyDash
                </h2>
            </div>
            <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded px-2" onClick={logout}>
                Logout
            </button>
        </header>


        <div className="overflow-x-auto container">
            <div>
                <div className="">
                    <div className="shadow-md rounded my-5">
                        <table className="min-w-max bg-white w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Order ID</th>
                                    <th className="py-3 px-6 text-left">User Name</th>
                                    <th className="py-3 px-6 text-left">Address</th>
                                    <th className="py-3 px-6 text-left">Date</th>
                                    <th className="py-3 px-6 text-left">Action</th>

                                </tr>
                            </thead>
                            {orders.map((order) => (
                                <Details order={order} changestatus={changestatus} />
                            ))}
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    </>)
}
export default Delboydash;