//---------------------------------------ORDERTABLE FOR USER PAGE--------------------------------------------------

import React from "react";
import { useNavigate } from "react-router-dom";

function Details({ order, onDeleteOrder }) {
  const [showModal, setShowModal] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const navigate = useNavigate();

  //---------------DISPLAY ONLY DATE NOT TIME----------------
  const dateObj = new Date(order.date);
  const formattedDate = dateObj.toLocaleDateString('en-GB');

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
              <span className="font-medium">{order.shopname}</span>
            </div>
          </td>
          <td className="py-3 px-6">
            <div>{formattedDate}</div>
          </td>
          <td className="py-3 px-6">
            <div>{order.payment}</div>
          </td>
          <td className="py-3 px-6">
            <div>{order.reff}</div>
          </td>
          <td className="py-3 px-6">
            <div>{order.cost}</div>
          </td>
          <td className="py-3 px-6">
            <span className="text-red-500 rounded-full text-ls">
              {order.status}
            </span>
          </td>
          <td className="py-3 px-6 text-center">


            {/* eye */}
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
              {order.status === "Under Approval" && (
                <>
                  {/*EDIT*/}
                  <div
                    className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                    onClick={() =>
                      navigate("/user/order/edit", {
                        state: { order: order },
                      })
                    }
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
                  {/*DELETE*/}
                  <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => setShowDelete(true)}>
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </td>
        </tr>
      </tbody>
      {/*DISPLAY ORDER DETAIL*/}
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
                      {order.delivery && (
                        <>
                          <tr>
                            <th scope="row">Delivery Name</th>
                            <td>{order.delivery.name}</td>
                          </tr>
                          <tr>
                            <th scope="row">Delivery Contact</th>
                            <td>{order.delivery.contact}</td>
                          </tr>
                          <tr>
                            <th scope="row">Delivery Email</th>
                            <td>{order.delivery.email}</td>
                          </tr>
                        </>
                      )}

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

      {/*POP UP WHEN DELETE ORDER*/}
      {showDelete ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-full md:w-1/3 mx-auto">
              <div className="flex flex-col p-4 rounded-lg shadow bg-white">
                <div className="flex">
                  <div>
                    <svg
                      className="w-6 h-6 fill-current text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                    </svg>
                  </div>

                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-800">
                      Delete Your Order
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Are You Sure?
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-3">
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-md"
                    onClick={() => setShowDelete(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 ml-2 bg-red-500 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    onClick={() => {
                      onDeleteOrder(order._id);
                      setShowDelete(false);
                    }}
                  >
                    Continue
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

export default Details;
