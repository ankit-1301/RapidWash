import React,{useState} from 'react'
import { UserContext } from './User';
import { useEffect } from 'react';
import axios from 'axios';
const UserState=({children})=> {
    const Backend=process.env.BACKEND
    const [lguser, setUser] = useState([]);
    const updateUser = (newUser) => {
        setUser(newUser);
      };
    useEffect(() => {
      axios
      .get("https://rapidwash.onrender.com/api/users/get", { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          setUser(response.data.message);
        }
        else if (!response.data.message) { }
      });
      axios
      .get("https://rapidwash.onrender.com/api/washerman/getwash", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message) {
          setUser(response.data.message);
        } else {
        }
      });
  }, []);
  
      return (
        <UserContext.Provider value={{ lguser, updateUser }}>
          {children}
        </UserContext.Provider>
      );
 
}

export default UserState;