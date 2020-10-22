import React, { useEffect, useContext } from 'react'
import {useHistory} from "react-router-dom"
import UserContext from "../context/UserContext"


function Home() {

    const {userData} = useContext(UserContext);
    const history = useHistory();

    //Forcing the user to log in if not authenticated
    useEffect(() => {
        if(!userData.user)
        {
            history.push("/login");
        }
    }, [])
    return (
        <div className="page">
            <h2>Home component</h2>
        </div>
    )
}

export default Home
