import React, {useEffect, useState} from 'react';
import MyInput from "../../input/MyInput";
import cl from "./PurchaseAddDeal.module.css"
import MainButton from "../../../../helpers/MainButton";
import AddService from "../../../../API/AddService";
import {useNavigate} from "react-router-dom";
import MySelect from "../../my_select/MySelect";

const PurchaseAddDeal = () => {
    const [amount, setAmount] = useState(0)
    const [purchaseRate, setRate] = useState(0.0)
    const [currency, setCurrency] = useState("usd")
    const router = useNavigate()
    useEffect(() => {
        MainButton.setActionToMainButton(() => {
            AddService.addPurchaseDeal(
                {
                    "dealer": Telegram.WebApp.initDataUnsafe.user.username,
                    "amount": amount,
                    "rate": purchaseRate,
                    "currency": currency.toLowerCase(),
                    "comment": ""
                }
            ).then(r => router(-1))
        })
    }, [amount, purchaseRate, currency])

    return (
        <div>
            <h4 className={cl.purchase_add_deal_title}>Сумма покупки</h4>
            <div>
                <MyInput style={{marginLeft: '16px'}} value={amount} inputMode="decimal"
                         onChange={(e) => setAmount(e.target.value)}></MyInput>
                <MySelect style={{width: '4.875em'}} value={currency}
                        onChange={(e) => setCurrency(e.target.value)}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="ust">USDT</option>
                </MySelect>
            </div>
            <h4 className={cl.purchase_add_deal_title}>По курсу</h4>
            <div>
                <MyInput style={{marginLeft: '16px'}} value={purchaseRate} inputMode="decimal"
                         onChange={(e) => setRate(e.target.value)}></MyInput>
            </div>
            <h3 className={cl.purchase_add_deal_title}>Сумма рубля: {Intl.NumberFormat("ru-RU").format(amount * purchaseRate)}</h3>
        </div>
    );
};

export default PurchaseAddDeal;