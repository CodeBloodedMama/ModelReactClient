import {NavLink} from "react-router-dom";
import React from "react";


export function GuestHeader(){
    return(
        <ul>
            <li><NavLink to={"/SignIn"}>Sign In</NavLink></li>
        </ul>
    )
}

export function ManagerHeader({callback}){
    const handleClick = (event) =>{
        event.preventDefault();
        console.log("shit");
        callback();

    }
    return(
        <ul>
            <li><NavLink onClick={handleClick}>Sign Out</NavLink></li>
        </ul>
    )
}

export function ModelHeader(signoutCallback){
    return(
        <ul>
            <li><NavLink onClick={signoutCallback}>Sign In</NavLink></li>
        </ul>
    )
}