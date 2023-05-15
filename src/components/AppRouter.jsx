import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MainScreen from "../pages/MainScreen";
import EditCahs from "../pages/EditCash";

const AppRouter = () => {

    const location = useLocation()
    const router = useNavigate()

    useEffect(() => {
        if (location.pathname === "/") {
            Telegram.WebApp.BackButton.hide()
        } else {
            Telegram.WebApp.BackButton.show()
        }
    }, [location])

    useEffect(() => {
        Telegram.WebApp.BackButton.onClick(() => {
            router(-1)
        })
    }, [])

    return (
        <Routes>
            <Route path="/" element={<MainScreen/>}/>
            <Route path="/edit_cash" element={<EditCahs/>}/>
        </Routes>
    );
};

export default AppRouter;