import React, {useEffect, useMemo, useState} from 'react';

import MyInput from "../../input/MyInput";
import {useNavigate} from "react-router-dom";
import MainButton from "../../../../helpers/MainButton";
import AddService from "../../../../API/AddService";
import cl from "./SaleAddDeal.module.css"
import AverageRate from "../../../../API/AverageRate";

const SaleAddDeal = () => {
    const [amount, setAmount] = useState(0)
    const [saleRate, setRate] = useState(0.0)
    const [currency, setCurrency] = useState("USD")
    const router = useNavigate()
    const [average, setAverage] = useState(0)
    useEffect(() => {
        async function fetchAverageRate() {
            const tmp = await AverageRate.rate(currency.toLowerCase())
            setAverage(tmp)
        }
        fetchAverageRate().then(r => {})
    }, [currency])
    useEffect(() => {
        MainButton.setActionToMainButton(() => {
            AddService.addSaleDeal(
                {
                    "dealer": Telegram.WebApp.initDataUnsafe.user.username,
                    "amount": amount,
                    "rate": saleRate,
                    "average": average,
                    "currency": currency.toLowerCase(),
                    "comment": ""
                }
            ).then(r => router(-1))
        })
    }, [amount, saleRate, currency, average])

    return (
        <div>
            <h4 className={cl.sale_add_deal_title}>Сумма продажи</h4>
            <div>
                <MyInput value={amount} inputMode="numeric"
                         onChange={(e) => setAmount(e.target.value)}></MyInput>
                <select value={currency}
                        onChange={(e) => setCurrency(e.target.value)}>
                    <option>USD</option>
                    <option>EUR</option>
                </select>
            </div>
            <h4 className={cl.sale_add_deal_title}>По курсу</h4>
            <div className={cl.sale_input_container}>
                <MyInput value={saleRate} inputMode="numeric"
                         onChange={(e) => setRate(e.target.value)}></MyInput>
                { saleRate !== 0 ? <p>{(saleRate - average).toFixed(2)}</p> : <div></div>}
            </div>
            <h3 className={cl.sale_add_deal_title}>Сумма рубля: {Intl.NumberFormat("ru-RU").format(amount * saleRate)}</h3>
            {saleRate !== 0 ? <h3 className={cl.sale_add_deal_title}>Прибыль: {Intl.NumberFormat("ru-RU").format(amount * (saleRate - average))}</h3> : <div/>}
        </div>
    );
};

export default SaleAddDeal;