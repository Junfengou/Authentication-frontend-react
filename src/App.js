import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./Components/pages/Home"
import Login from "./Components/auth/Login"
import Register from "./Components/auth/Register"
import Header from "./Components/layout/Header"
import UserContext from "./Components/context/UserContext"
import Axios from "axios"
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });


  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null)
      {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      //first arugment is the link to retrieve the information from backend
      //second argument is the body, which in this case it doesn't need anything [body can be found on insonmia]
      const tokenRes = await Axios.post("http://localhost:5000/users/tokenIsValid",
       null, 
       {headers: {"x-auth-token" : token}}
       );
      //  console.log(tokenRes.data)
      console.log("This is TokenRes: ",tokenRes);
      //if this is true, that means the user is already authenticated
      if(tokenRes.data)
      {
        const userRes = await Axios.get("http://localhost:5000/users/",
         {headers : {"x-auth-token" : token},
        });
        console.log("userRes: ", userRes)
        
        setUserData({
          token, 
          user: userRes.data
        })
        console.log("userID: ", userRes.data.id)
      }
      
    }

    checkLoggedIn();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
