import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MainButton from "../../../../helpers/MainButton";
import AddService from "../../../../API/AddService";
import cl from "../sales/SaleAddDeal.module.css";
import MyInput from "../../input/MyInput";
import MySelect from "../../my_select/MySelect";

const MixingAddDeal = () => {
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState("USD")
    const router = useNavigate()
    const [profit, setProfit] = useState(0)
    useEffect(() => {
        Telegram.WebApp.MainButton.show()
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
                <MyInput style={{marginLeft: '16px'}} value={amount} inputMode="numeric"
                         onChange={(e) => setAmount(e.target.value)}></MyInput>
                <MySelect style={{width: '4.875em'}} value={currency}
                        onChange={(e) => setCurrency(e.target.value)}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="ust">USDT</option>
                </MySelect>
            </div>
            <h4 className={cl.sale_add_deal_title}>Прибыль</h4>
            <div className={cl.sale_input_container}>
                <MyInput style={{marginLeft: '16px'}} value={profit} inputMode="decimal"
                         onChange={(e) => setProfit(e.target.value)}></MyInput>
            </div>
        </div>
    );
};

export default MixingAddDeal;