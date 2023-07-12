//-----------------------------USER EDITPROFILE PAGE------------------------------------

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BACKEND } from '../services/helper';

function Usereditprofile() {
  
  const [showSubmit, setShowsubmit] = React.useState(false);
 
  const navigate = useNavigate();
 
  const [id, setId] = useState();
  const [luser, setLuser] = useState([]);
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [address, setAdd] = useState();
  const [pincode, setPin] = useState();
  const [occupation, setOcc] = useState();
  const [postImage, setPostImage] = useState();
 
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log("my image", base64);
    setPostImage(base64);
  };

  

  useEffect(() => {
    axios
      .get(`${BACKEND}/api/users/check`, { withCredentials: true })
      .then((response) => {
        // console.log("dash");
        if (response.data.message === "user not login") {
          navigate("/user");
        } else if (response.data.message === "user already login") {
        }
      });
    axios
      .get(`${BACKEND}/api/users/get`, { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          setLuser(response.data.message);
          setName(response.data.message.username);
          setContact(response.data.message.contact);
          setEmail(response.data.message.email);
          setCity(response.data.message.city);
          setAdd(response.data.message.address);
          setPin(response.data.message.pincode);
          setOcc(response.data.message.occ);
          setId(response.data.message._id);
          // setId(response.data.message._id);
        } else if (!response.data.message) {
        }
      });
  }, []);
  // console.log("luser from edit", luser);

  const handleedit = async (event) => {
    
    // console.log("under update");
    event.preventDefault();
    await axios
      .post(`${BACKEND}/api/users/update`, {
        _id: id,
        username: name,
        pincode: pincode,
        city: city,
        occ: occupation,
        contact: contact,
        address: address,
        postImage: postImage,
      })
      .then((response) => {
        if (response.data.message === "edit user") {
          // console.log("done update", response.data.user);
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/user/profile");
        }
      });
  };

  return (
    <div>
      <div>
        <div>
          <div className="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
              <div>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                      <p className="font-medium text-lg">Edit Profile Details</p>
                      <p>Please fill out all the fields.</p>
                    </div>

                    <div className="md:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label for="name">Full Name</label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder=""
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label for="contact">Contact</label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={contact}
                            placeholder=""
                            onChange={(event) => setContact(event.target.value)}
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label for="email">Email Address</label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={email}
                            placeholder="email@domain.com"
                            // onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label for="address">Address / Street</label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={address}
                            placeholder="Plese give full Address"
                            onChange={(event) => setAdd(event.target.value)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label for="city">City</label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={city}
                            placeholder="Your City"
                            onChange={(event) => setCity(event.target.value)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label for="zipcode">Zipcode</label>
                          <input
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Your zipcoe"
                            value={pincode}
                            onChange={(event) => setPin(event.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label for="zipcode">Occupation</label>
                          <input
                            type="text"
                            name="occupation"
                            id="occupation"
                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Your occupation"
                            value={occupation}
                            onChange={(event) => setOcc(event.target.value)}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label>Upload Profile Photo</label>
                          <input
                            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent  dark:focus:bg-transparent"
                            type="file"
                            id="formFileMultiple"
                            onChange={(e) => handleFileUpload(e)}
                          />
                        </div>

                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end gap-2">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                              onClick={() => setShowsubmit(true)}
                            >
                              Submit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                              onClick={() => {
                                navigate(-1);
                              }}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {showSubmit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-full md:w-1/3 mx-auto">
              <div className="flex flex-col p-4 rounded-lg shadow bg-white">
                <div className="flex">
                  <div>
                    <svg
                      className="w-6 h-6 fill-current text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>

                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-800">
                      Edit Your Profile
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Are You Sure?
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-3">
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-md"
                    onClick={() => setShowsubmit(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                    onClick={handleedit}
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
      
    </div>
  );
}

export default Usereditprofile;

function convertToBase64(file, maxWidth = 800, maxHeight = 600, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const img = new Image();
      img.src = fileReader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        let compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        while (compressedDataUrl.length / 1024 >= 95) {
          quality -= 0.05;
          compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(compressedDataUrl);
      };
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
