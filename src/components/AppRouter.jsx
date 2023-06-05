import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MainScreen from "../pages/MainScreen";
import EditCahs from "../pages/EditCash";

const AppRouter = () => {

    const location = useLocation()
    const router = useNavigate()

    useEffect(() => {
        Telegram.WebApp.MainButton.setText("Записать сделку")
        if (location.pathname === "/") {
            Telegram.WebApp.BackButton.hide()
            Telegram.WebApp.MainButton.show()
        } else {
            Telegram.WebApp.BackButton.show()
            Telegram.WebApp.MainButton.hide()
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