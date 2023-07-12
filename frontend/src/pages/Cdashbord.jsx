//-----------------------------CLIENT DASHBOARD-------------------------------------

import React from "react";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Washcard from "../Components/Washcard";
import { useNavigate,useLocation } from "react-router-dom";
import Header from "../Components/Header";
import { useContext } from "react";
import { UserContext } from "../Context/User";
import { BACKEND } from '../services/helper';

function Cdashbord(props) {
  const {lguser} = useContext(UserContext);
  const location = useLocation();
  const [user, setLuser] = useState(lguser || []);
  const [area, setArea] = useState("all");
  const navigate = useNavigate();
  const [washerman, setUsers] = useState([]);
  const [cities, setcities] = useState([]);


  useEffect(() => {
//--------USER LOGIN OR NOT----------
    axios
      .get(`${BACKEND}/api/users/check`, { withCredentials: true })
      .then((response) => {
        if (response.data.message === "user not login") { navigate("/user") }
        else if (response.data.message === "user already login") { }
      });
//---------------IF LOGIN GET LOGIN USER INFO------------
    axios
      .get(`${BACKEND}/api/users/get`, { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          setLuser(response.data.message);
        }
        else if (!response.data.message) { }
      });
  }, []);


  useEffect(() => {
    //-------------------------ALL WASHERMAN IN OUR DATA--------------
    axios
      .post(`${BACKEND}/api/washerman/all`, { city: area })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    //--------------ALL CITY WHERE WASHERMAN AVAILABLE---------------
    axios
      .get(`${BACKEND}/api/washerman/cities`)
      .then((res) => {
        setcities(res.data);

      });
  }, []);

  //------------SERCH BY SELECTED CITY------------------
  const search = () => {
    console.log("search");
    axios
      .post(`${BACKEND}/api/washerman/all`, { city: area })
      .then((res) => {
        console.log("searchhh", res.data);
        setUsers(res.data);

      })
      .catch((err) => console.log(err));

  }


  return (
    <>
      <div className="min-h-screen">

        {/* <Header user={user}/> */}
    
        <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
              Find best Option for you
        
            </h2>
          </div>
        </header>
        {/* <Navbar/> */}
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-3 px-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center space-x-10">
                <div className="w-100px">
                  <select
                    label="Select City"
                    id="area"
                    value={area}
                    className="uppercase bg-white border border-gray-500 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) => {
                      console.log(`${event.target.value}`);
                      setArea(event.target.value);
                    }}
                  >
                    <option defaultValue="all">All</option>
                    {cities.map((city) => (
                      <option value={city} key={city} >{city}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md" onClick={search}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </header>
        <div>
          <div>
            <div className="min-h-screen from-red-300 to-yellow-200 flex justify-center items-center py-20">
              <div className="md:px-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 space-y-4 md:space-y-0">
                {washerman.map((wash) => (
                  <Washcard key={wash._id} user={wash} luser={user} />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cdashbord;

