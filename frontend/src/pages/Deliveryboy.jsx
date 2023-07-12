//-----------------------------WASHERMAN DELIVERYBOY ADD PAGE------------------------------

import Wheader from "../Components/Wheader";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delboytable from "../Components/Delboytable";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';
function Delivery() {
    const navigate = useNavigate();
    const washerman = useContext(UserContext).lguser;
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [password, setPassword] = useState();
    const [boys, setBoys] = useState([]);
    const [count, setCount] = useState(0);

    //-----------------DELETE DELIVERYBOY-------------------
    const onDelete = (id) => {
        axios
            .post(`${BACKEND}/api/delivery/delete`, { _id: id })
            .then((response) => {
                setCount(count + 1);
                console.log("get boy", response.data);
            });
    }
    useEffect(() => {
        //--------------------------LOGIN OR NOT---------------------------
        axios
            .get(`${BACKEND}/api/washerman/check`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.data.message === "washerman not login") {
                    navigate("/washerman");
                    window.location.reload();
                } else if (response.data.message === "washerman already login") {
                    navigate("/washerman/deliveryboy");
                }
            });
    }, []);

    useEffect(() => {
        //----------------------------WASHERMAN UNDER DELIVERYBOY-----------------------
        axios
            .post(`${BACKEND}/api/delivery/getboy`, { wemail: washerman.email })
            .then((response) => {
                setBoys(response.data.boys)
                console.log("get boy", response.data.boys);
            });
      

    }, [count,washerman]);

    //-------------------------------WASHERMAN ADD DELIVERYBOY INFO-----------------------------
    const add = () => {
        setCount(count + 1);
        axios
            .post(`${BACKEND}/api/delivery/signup`, { email: email, name: name, password: password, contact: contact, wemail: washerman.email })
            .then((response) => {
                if (response.data.message === "Boy Already Exists") {
                    toast.error("Boy Already Exists");
                } else if (response.data.message === "Signup successful") {
                    toast.success("Boy Already Exists");
                }
            });
    }

    return (<>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <header className="bg-black shadow">
                <div className="mx-auto text-center">
                    <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600 sm:text-4xl">
                        Washerman Dashboard
                    </h2>
                </div>
            </header>
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-500 ">
                    DeliveryBoy
                </h1>

                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="contact"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Contact
                        </label>
                        <input
                            type="tel"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-600" onClick={add}>
                            ADD
                        </button>
                    </div>
                </form>
            </div>

        </div>
        <div className="overflow-x-auto">
            <div>
                <div className="container">
                    <div className="shadow-md rounded my-5">
                        <table className="min-w-max bg-white w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">contact</th>
                                    <th className="py-3 px-6 text-left">Password</th>
                                    <th className="py-3 px-6 text-left">Action</th>
                                </tr>
                            </thead>
                            {boys.map((boy) => (
                                <Delboytable boy={boy} key={boy._id} onDelete={onDelete} />
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>)

}
export default Delivery;