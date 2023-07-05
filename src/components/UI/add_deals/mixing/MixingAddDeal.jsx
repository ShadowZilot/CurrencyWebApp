import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MainButton from "../../../../helpers/MainButton";
import AddService from "../../../../API/AddService";
import cl from "../sales/SaleAddDeal.module.css";
import MyInput from "../../input/MyInput";

const MixingAddDeal = () => {
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState("USD")
    const router = useNavigate()
    const [profit, setProfit] = useState(0)
    useEffect(() => {
        MainButton.setActionToMainButton(() => {
            AddService.addMixingDeal(
                {
                    "dealer": Telegram.WebApp.initDataUnsafe.user.username,
                    "amount": amount,
                    "profit": profit,
                    "currency": currency.toLowerCase(),
                    "comment": ""
                }
            ).then(r => router(-1))
        })
    }, [amount, profit, currency])

    return (
        <div>
            <h4 className={cl.sale_add_deal_title}>Сумма cделки</h4>
            <div>
                <MyInput value={amount} inputMode="numeric"
                         onChange={(e) => setAmount(e.target.value)}></MyInput>
                <select value={currency}
                        onChange={(e) => setCurrency(e.target.value)}>
                    <option>USD</option>
                    <option>EUR</option>
                </select>
            </div>
            <h4 className={cl.sale_add_deal_title}>Прибыль</h4>
            <div className={cl.sale_input_container}>
                <MyInput value={profit} inputMode="decimal"
                         onChange={(e) => setProfit(e.target.value)}></MyInput>
            </div>
        </div>
    );
};

export default MixingAddDeal;