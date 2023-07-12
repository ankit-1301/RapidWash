//-------------------------------------------------WASHERMAN ORDER TABLE-----------------------------------------------

import React, { useState } from "react";
function Details({ order, onDeleteOrder, onChangestatus, boys, DeliveryDetail }) {
  const [showDelete, setShowDelete] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [shoModal, setShoModal] = React.useState(false);
  const [del, setdel] = useState("-");

  //------------------ONLY DATE REMOVE TIME---------
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
              <span className="font-medium">{order.username}</span>
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
            <div>{order.pair}</div>
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
            <div className="flex item-center ">
              <div
                className="w-4 mr-2 transform hover:text-green-500 hover:scale-110"
                onClick={() => setShowModal(true)}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>

              {/*-----STATUS DELIVERED REMOVR CHANGE STATUS BUTTON && STATUS UNDER APPROVE WITH CHANGE STATUS BUTTON ADD DELIVERYBOY------------*/}
              {order.status !== "Delivered" && (
                <>
                  {order.status === "Under Approval" ? (
                    <>
                      <div
                        className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                        onClick={() => {
                          setShoModal(true);
                        }}
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
                    </>
                  ) : (<><div
                    className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                    onClick={() => {
                      onChangestatus(order._id);
                    }}
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
                  </div></>)}
                  {/*--------STATUS DONE REVOME ORDER DELETE BUTTON--------------------*/}
                  {order.status !== "Done" && (

                    <>
                      <div
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                        onClick={() => setShowDelete(true)}
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </td>
        </tr>
      </tbody>

      {/*-----------------------ADD DELIEVERYBOT POPUP WHEN STSTUS CHANGE APPROVE TO PICKING----------------*/}
      {shoModal ? (
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
                      Choose Your DeliveryBoy
                    </h2>
                    <select
                      label="Select City"
                      id="area"
                      value={del}
                      className="uppercase bg-white border border-gray-500 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => {
                        console.log(event.target.value);
                        setdel(event.target.value);
                      }}
                    >
                      <option defaultValue="-">-</option>
                      {boys.map((boy) => (
                        <option value={boy.email} key={boy._id} >{boy.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-3">
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-md"
                    onClick={() => setShoModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 ml-2 bg-red-500 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    onClick={() => {

                      DeliveryDetail(del, order._id);
                      onChangestatus(order._id);
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
      {/*--------------------ORDER DETAIL-------------------------*/}
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
                        <th scope="row">Owner email</th>
                        <td>{order.uemail}</td>
                      </tr>
                      <tr>
                        <th scope="row">Owner Phone No.</th>
                        <td>{order.contact}</td>
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

      {/*------------DELETE ORDER CONFIRMATION ------------------*/}
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
