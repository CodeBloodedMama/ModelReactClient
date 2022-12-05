import React from 'react';
import {GuestHeader, ManagerHeader} from "./Headers"

export default function ChooseHeader({user, cb}){
    console.log("chooseheader: " + JSON.stringify(user))
    //console.log(cb)
    if(user == 'guest'){
        return <GuestHeader/>;
    }
    else{
        return <ManagerHeader callback={cb}/>;
    }
}