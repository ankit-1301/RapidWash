//---------------------------------------------WASHERMAN DASHBOARD------------------------------

import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';

function Wdashbord() {
  const navigate = useNavigate();
  const washerman = useContext(UserContext).lguser;
  const [totalcount, setTotalCount] = useState(0);
  const [totalMcount, setTotalMCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalMCost, setTotalMCost] = useState(0);
  const [totaltcount, setToataltcount] = useState(0);
  const [totalpcount, setToatalpcount] = useState(0);
  const [totalacount, setToatalacount] = useState(0);
  const [totalTCost, setTotalTCost] = useState(0);
  const [all, setAll] = useState("true");
  const [lastMonth, setLastmonth] = useState("false");
  const [today, setToday] = useState("false");


  useEffect(() => {
    axios
      .get(`${BACKEND}/api/washerman/check`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message === "washerman not login") {
          navigate("/washerman");
        } else if (response.data.message === "washerman already login") {
          navigate("/washerman/dashboard");
        }
      });
  }, []);
  axios
    .post(`${BACKEND}/api/order/dashorderdetail`, {
      email: washerman.email,
    })
    .then((response) => {
      setTotalCount(response.data.count);
      setTotalMCount(response.data.mcount);
      setTotalCost(response.data.totalCost);
      setTotalMCost(response.data.totalMCost);
      setTotalTCost(response.data.totalTCost);
      setToataltcount(response.data.tcount);
      setToatalpcount(response.data.tpcount);
      setToatalacount(response.data.tacount)
    });

  
  return (
    <>
      <div className="min-h-screen">
        <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600 sm:text-4xl">
              Washerman Dashboard
            </h2>
          </div>
        </header>
        <div className="w-100px">
          <select
            label="All"
            id=""
            value=""
            className="uppercase bg-white border border-gray-500 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(event) => {
              if (event.target.value === "all") {
                setAll(true);
                setLastmonth(false);
                setToday(false);
              }
              else if (event.target.value === "lastMonth") {
                setLastmonth(true);
                setAll(false);
                setToday(false);
              }
              else if (event.target.value === "today") {
                setToday(true);
                setLastmonth(false);
                setAll(false);
              }
            }}
          >
            <option value="all" selected >All Time</option>
            <option value="lastMonth" >Last month</option>
            <option value="today" >Today</option>


          </select>
        </div>
        <div className=" md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <div className="flex flex-wrap">

                {all ? (
                  <>
              
                      <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                          
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Total order
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    {totalcount}
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap text-red-500">All Time</span>
                              </p>
                            </div>
                          

                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                          <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                  Total Earing
                                </h5>
                                <span className="font-semibold text-xl text-blueGray-700">
                                  ₹ {totalCost}
                                </span>
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                              <span className="whitespace-nowrap text-red-500">All Time</span>
                            </p>
                          </div>
                        </div>
                      </div>
                   
                  </>
                ) : (<></>)
                }

                {lastMonth ? (<>
                 
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                Total Order
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                {totalMcount}
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="whitespace-nowrap text-green-500">
                              Since last month
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                Total Earing
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                ₹ {totalMCost}
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="whitespace-nowrap text-green-500">
                              Since last Month
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                
                </>) : (<></>)}
                {today ? (<>

                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Total Approval Order
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                              {totalacount}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="whitespace-nowrap text-yellow-500">
                            Today
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Total Pending Order
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                              {totalpcount}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="whitespace-nowrap text-yellow-500">
                            Today
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Total Done Order
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                              {totaltcount}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="whitespace-nowrap text-blue-500">
                            Today
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Total Earing
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                              {totalTCost}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="whitespace-nowrap text-blue-500">
                            Today
                          </span>
                        </p>
                      </div>
                    </div>
                  </div></>) : (<></>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wdashbord;
