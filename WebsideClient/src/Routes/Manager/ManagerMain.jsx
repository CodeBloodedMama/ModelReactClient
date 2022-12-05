import React from 'react'
import "../../Styles/ManagerMain.css"
import ManagerAddStaff from "./ManagerAddStaff"
import ManagerJob from "./ManagerJob"
import {Route, Routes, NavLink} from "react-router-dom";

export default function ManagerMain() {
    return(
        <div className="Manager">
            <div className="Manager-Nav">
                <h2>Navbar</h2>
                <ul className="nav-items">
                    <li><NavLink to="/Manager/Staff">Staff</NavLink></li>
                    <li><NavLink to="/Manager/Jobs">Jobs</NavLink></li>
                </ul>


            </div>
            <div className="Manager-Content">
                <Routes>
                    <Route
                        path="/Staff/*" element={<ManagerAddStaff/>}
                    />
                    <Route
                        path="/Jobs/*" element={<ManagerJob/>}
                    />
                </Routes>
            </div>
        </div>
    )
}