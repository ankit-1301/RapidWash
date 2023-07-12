import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BACKEND } from '../services/helper';

function Washeditprofile(){
    const navigate=useNavigate();
    const [id, setId] = useState();
    const [luser, setLuser] = useState();
    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [email, setEmail] = useState();
    const [city, setCity] = useState();
    const [address, setAdd] = useState();
    const [pincode, setPin] = useState();
    const [shopname, setShopname] = useState();
    const [cost,setCost]=useState();
    const [hw,setHw]=useState();
    const [dc,setDc]=useState();
    const [oi,setOi]=useState();
    const [postImage, setPostImage] = useState();
    const [postsImage, setPostsImage] = useState();
    const [upi,setUpi]=useState();
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPostImage(base64);
    };
    const handleFileUploadShop = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPostsImage(base64);
    };

    const handleedit=async(event)=>{
      event.preventDefault();
      await axios
      .post(`${BACKEND}/api/washerman/update`,{
        _id:id,
        username:name,
        contact:contact,
        pincode:pincode,
        city:city,
        cost,cost,
        address:address,
        shopname:shopname,
        postImage:postImage,
        postsImage:postsImage,
        hw:hw,
        oi:oi,
        dc:dc,
        upi:upi,
      }).then((response) => {
        if (response.data.message === "edit washerman") {
          console.log("done update", response.data.washerman);
          navigate("/washerman/profile");
        }else{console.log("not done")}
      });
    }

    useEffect(() => {
      axios
    .get(`${BACKEND}/api/washerman/check`, { withCredentials: true })
    .then((response) => {console.log("dash");
      if (response.data.message === "washerman not login"){navigate("/washerman");window.location.reload();}
      else if(response.data.message === "washerman already login"){}
      });
    axios
      .get(`${BACKEND}/api/washerman/getwash`, { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          setLuser(response.data.message);
          setName(response.data.message.username);
          setContact(response.data.message.contact);
          setEmail(response.data.message.email);
          setCity(response.data.message.city);
          setAdd(response.data.message.address);
          setPin(response.data.message.pincode);
          setShopname(response.data.message.shopname);
          setId(response.data.message._id);
          setCost(response.data.message.cost);
          setHw(response.data.message.hw)
          setDc(response.data.message.dc)
          setOi(response.data.message.oi)
          setUpi(response.data.message.upi)
        } else if (!response.data.message) {
        }
      });
    }, []);
    console.log("washerman ",luser);
    return(
        <div>
            <div>
        <div>
          
            <div className="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
              <div className="container max-w-screen-lg mx-auto">
                <div>
                  <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className="text-gray-600">
                        <p className="font-medium text-lg">Edit Washerman Profile Details</p>
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
                              onChange={(event) =>
                                setContact(event.target.value)
                              }
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
                            />
                          </div>

                          <div className="md:col-span-3">
                            <label for="address">Shop Address / Street</label>
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
                            <label for="Shopname">Shopname</label>
                            <input
                              type="text"
                              name="Shopname"
                              id="Shopname"
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="Your Shopname"
                              value={shopname}
                              onChange={(event) => setShopname(event.target.value)}
                            />
                          </div>


                          <div className="md:col-span-5">
                            <label for="zipcode">UPI ID</label>
                            <input
                              type="text"
                              name="upi"
                              id="upi"
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="Your zipcoe"
                              value={upi}
                              onChange={(event) => setUpi(event.target.value)}
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label for="normalcost">Normal Cost</label>
                            <input
                              type="text"
                              name="normalcost"
                              id="normalcost"
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="Your Cost"
                              value={cost}
                              onChange={(event) => setCost(event.target.value)}
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label for="hw">Hard wash Cost</label>
                            <input
                              type="text"
                              name="hw"
                              id="hw"
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="Your Cost"
                              value={hw}
                              onChange={(event) => setHw(event.target.value)}
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label for="dc">Dey Clean Cost</label>
                            <input
                              type="text"
                              name="dc"
                              id="dc"
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="Your Cost"
                              value={dc}
                              onChange={(event) => setDc(event.target.value)}
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label for="oi">Only Iron Cost</label>
                            <input
                              type="text"
                              name="oi"
                              id="oi"
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="Your Cost"
                              value={oi}
                              onChange={(event) => setOi(event.target.value)}
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
                          <div className="md:col-span-3">
                           
                            <label>Upload Shop Photo</label>
                            <input
                              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent  dark:focus:bg-transparent"
                              type="file"
                              id="formFileMultiple"
                              onChange={(e) => handleFileUploadShop(e)}
                            />
                          </div>

                          <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end gap-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={handleedit}
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
        </div>
    )
}
export default Washeditprofile;


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
