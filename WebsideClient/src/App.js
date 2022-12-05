import logo from './logo.svg';
import React, {useEffect, useState} from 'react'
import {
    Routes,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate,
    useNavigate
} from 'react-router-dom'
import './Styles/App.css';
import SignIn from "./Routes/SignIn";
import * as PropTypes from "prop-types";
import ManagerMain from "./Routes/Manager/ManagerMain";
import ChooseHeader from "./Headers/ChooseHeader";
import MyJobs from "./Routes/Model/MyJobs";



function App() {
    const [userType, setUserType] = useState(localStorage.getItem("Role") ?? "guest");
    const navigate = useNavigate();

    const ManagerRoute = ({ children }) => {
        if(userType == 'Manager'){
            return children
        }
        else{
            return (<Navigate to="/SignIn"/>)
        }
    };

    const ModelRoute = ({children}) => {
        if(userType == 'Model'){
            return children
        }
        else{
            return (<Navigate to="/SignIn"/>)
        }
    }

    const signinCallback = (user) =>{
        setUserType(user);
        console.log("Why no work consistently???")
    }

    const logoutCallback = () => {
        console.log("LETS LOG OUT!!!")
        localStorage.removeItem("token")
        localStorage.setItem("Role", "guest")
        setUserType('guest');
    }

    useEffect(() => {
        if(userType == 'Manager'){
            navigate("/Manager/Jobs");
        }
        else if(userType == 'Model'){
            navigate("/MyJobs");
        }
        else{
            navigate("/SignIn")
        }
    }, [userType])

    return (
        <div className="app-main">
            <header className="App-header">
                <h1>
                    ModelClient
                </h1>
                <ChooseHeader user={userType} cb={logoutCallback}/>
            </header>
            <div className="content-main">
                <Routes>
                    <Route
                        path="/Manager/*"
                        element={
                            <ManagerRoute>
                                <ManagerMain/>
                            </ManagerRoute>
                        }
                    />
                    <Route
                        path="/MyJobs"
                        element={
                            <ModelRoute>
                                <MyJobs/>
                            </ModelRoute>
                        }
                    />

                    <Route
                        path="/SignIn"
                        element={
                            <SignIn callback={signinCallback}/>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <SignIn callback={signinCallback}/>
                        }
                    />

                </Routes>
            </div>

        </div>
  );
}

export default App;
