//-------------------------------------------ORDER ALLOCATE BY WASHERMAN FOR  DELIVERYBOY-------------------------------------------

import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND } from '../services/helper';

function Details({ order, changestatus }) {
  const Backend=process.env.BACKEND
  const [showModal, setShowModal] = React.useState(false);
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const dateObj = new Date(order.date);
  const formattedDate = dateObj.toLocaleDateString('en-GB');

  //--------------SEND OTP TO USER----------------------
  const sendotp = () => {
    axios
      .post("https://rapidwash.onrender.com/api/order/reqdelboyotp", { _id:order._id })
      .then((response) => {
        toast.success("otp Send");
        if (response.data.order) {
        }
      });
  }



  return (
    <>
      <tbody className="text-gray-600 text-sm font-light">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span className="font-medium">{order._id}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span className="font-medium">{order.username}</span>
            </div>
          </td>
          <td className="py-3 px-6">
            <div>{order.address}</div>
          </td>
          <td className="py-3 px-6">
            <div>{formattedDate}</div>
          </td>
          <td className="py-3 px-6 text-center">
            <div className="flex item-center ">
              <div className="w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => setShowModal(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div
                className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                onClick={sendotp}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="h-6 border mt-0 rounded px-4 w-24 bg-gray-50"
                  placeholder="Otp"
                value={otp}
                onChange={(event) =>{setOtp(event.target.value)} }
                />
              </div>
              <div
                className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                onClick={()=>{changestatus(order._id,otp)}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

            </div>
          </td>
        </tr>
      </tbody>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">About Order</h3>
                </div>

                <div className="relative p-6 flex-auto">
                  <table className="table table-striped-columns">
                    <tbody>
                      <tr>
                        <th scope="row">Order id</th>

                        <td>{order._id}</td>
                      </tr>
                      <tr>
                        <th scope="row">Order Booked Date</th>
                        <td>{order.date}</td>
                      </tr>
                      <tr>
                        <th scope="row">Order Owner Name</th>
                        <td>{order.username}</td>
                      </tr>
                      <tr>
                        <th scope="row">Washerman email</th>
                        <td>{order.wemail}</td>
                      </tr>
                      <tr>
                        <th scope="row">Shop Name</th>
                        <td>{order.shopname}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total Pair</th>
                        <td>{order.pair}</td>
                      </tr>
                      <tr>
                        <th scope="row">Cost per Pair</th>
                        <td>{order.costp}</td>
                      </tr>
                      <tr>
                        <th scope="row">Cost</th>
                        <td>{order.cost}</td>
                      </tr>
                      <tr>
                        <th scope="row">Cost</th>
                        <td>{order.payment}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
<ToastContainer/>
    </>
  );
}

export default Details;
