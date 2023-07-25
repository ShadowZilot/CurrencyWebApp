import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MainScreen from "../pages/MainScreen";
import EditCash from "../pages/EditCash";
import AddDealScreen from "../pages/AddDealScreen";
import MainButton from "../helpers/MainButton";
import EditPurchaseDeal from "../pages/EditPurchaseDeal";
import EditMixingDeal from "../pages/EditMixingDeal";
import EditSaleDeal from "../pages/EditSaleDeal";
import HistoryPage from "../pages/HistoryPage";


const AppRouter = () => {

    const location = useLocation()
    const router = useNavigate()

    useEffect(() => {
        Telegram.WebApp.MainButton.setText("Записать сделку")
        if (location.pathname === "/day") {
            Telegram.WebApp.BackButton.hide()
            Telegram.WebApp.MainButton.show()
            MainButton.setActionToMainButton(() => {
                    router("/add_deal")
                }
            )
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
            <Route path="/day">
                <Route index={true} element={<MainScreen/>}/>
                <Route index={false} path=":time" element={<MainScreen/>}/>
            </Route>
            <Route path="/edit_cash" element={<EditCash/>}/>
            <Route path="/add_deal" element={<AddDealScreen/>}/>
            <Route path="/edit_purchase/:id" element={<EditPurchaseDeal/>}/>
            <Route path="/edit_mixing/:id" element={<EditMixingDeal/>}/>
            <Route path="/edit_sale/:id" element={<EditSaleDeal/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
        </Routes>
    );
};

export default AppRouter;