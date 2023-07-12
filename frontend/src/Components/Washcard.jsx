//-----------------------ALL WASHERMAN DISPLAY FOR USER HOME PAGE---------------------------------------------

import React from "react";
import img from "../assets/img/5jpg.jpg";
import { useNavigate } from "react-router-dom";

function Washcard({ user, luser }) {
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  //-------------REDIRCT BOOK PAGE--------------------
  const detail = () => {
    navigate("/user/order/book", { state: { luser: luser, washerman: user } });
  };

  return (
    <>
      <div className="max-w-xs overflow-hidden bg-white rounded-xl shadow-lg dark:bg-gray-800 transform hover:scale-105 transition duration-500">
        <div className="px-4 py-2">
          <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-black">
            {user.shopname}
          </h1>
          <p className="text-1xl font-bold text-gray-200 uppercase dark:text-black">
            Cost - ₹ {user.cost}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 truncate">
            {user.address}
          </p>
        </div>

        <img className="object-cover w-full h-48 mt-2" src={user.simage || img} alt="NIKE AIR" />

        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
          <h1 className="text-lg font-bold text-white">{user.city}</h1>
          <button
            className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
            onClick={() => setShowModal(true)}
          >
            View
          </button>
        </div>
      </div>

      {/*SHOLW WASHERMAN ALL DETAIL PRICE,ADDRESS,...*/}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    About {user.shopname}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <table className="table table-striped-columns">
                    <tbody>
                      <tr>
                        <th scope="row">Shop owner Name</th>

                        <td>{user.username}</td>
                      </tr>
                      <tr>
                        <th scope="row">Contact</th>
                        <td>{user.contact}</td>

                      </tr>
                      <tr>
                        <th scope="row">Shop Address</th>
                        <td>{user.address}</td>

                      </tr>
                      <tr>
                        <th scope="row">Shop City</th>
                        <td>{user.city}</td>

                      </tr>
                      <tr>
                        <th scope="row">Shop pincode</th>
                        <td>{user.pincode}</td>

                      </tr>
                      <tr>
                        <th scope="row">&nbsp;Cost per pair</th>
                        <td><table>
                          <tr scope="row">
                            <td>Normal Wash : {user.cost}</td>
                            <td>Hard wash : {user.hw}</td>
                          </tr>
                          <tr scope="row">
                            <td>Only Dry Cleaning : {user.dc}</td>
                            <td>Only Iron : {user.oi}</td>
                          </tr>
                        </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={detail}>
                    Book
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

export default Washcard;
