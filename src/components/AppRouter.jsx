import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MainScreen from "../pages/MainScreen";
import EditCash from "../pages/EditCash";
import AddDealScreen from "../pages/AddDealScreen";
import MainButton from "../helpers/MainButton";
import EditPurchaseDeal from "../pages/EditPurchaseDeal";


const AppRouter = () => {

    const location = useLocation()
    const router = useNavigate()

    useEffect(() => {
        Telegram.WebApp.MainButton.setText("Записать сделку")
        if (location.pathname === "/") {
            Telegram.WebApp.BackButton.hide()
            Telegram.WebApp.MainButton.show()
            MainButton.setActionToMainButton(() => {
                    router("/add_deal")
                }
            )
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
            <Route path="/edit_cash" element={<EditCash/>}/>
            <Route path="/add_deal" element={<AddDealScreen/>}/>
            <Route path="/edit_purchase/:id" element={<EditPurchaseDeal/>}/>
        </Routes>
    );
};

export default AppRouter;