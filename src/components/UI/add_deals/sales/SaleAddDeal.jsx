import React, {useEffect, useMemo, useState} from 'react';

import MyInput from "../../input/MyInput";
import {useNavigate} from "react-router-dom";
import MainButton from "../../../../helpers/MainButton";
import AddService from "../../../../API/AddService";
import cl from "./SaleAddDeal.module.css"
import AverageRate from "../../../../API/AverageRate";
import MySelect from "../../my_select/MySelect";

const SaleAddDeal = () => {
    const [amount, setAmount] = useState(0)
    const [saleRate, setRate] = useState(0.0)
    const [currency, setCurrency] = useState("usd")
    const router = useNavigate()
    const [average, setAverage] = useState(0)
    useEffect(() => {
        async function fetchAverageRate() {
            const tmp = await AverageRate.rate(currency.toLowerCase())
            setAverage(tmp)
        }

        fetchAverageRate().then(r => {
        })
    }, [currency])
    useEffect(() => {
        Telegram.WebApp.MainButton.show()
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
                <MyInput style={{marginLeft: '16px'}} value={amount} inputMode="numeric"
                         onChange={(e) => setAmount(e.target.value)}></MyInput>
                <MySelect style={{width: '4.875em'}} value={currency}
                          onChange={(e) => setCurrency(e.target.value)}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="ust">USDT</option>
                </MySelect>
            </div>
            <h4 className={cl.sale_add_deal_title}>По курсу</h4>
            <div className={cl.sale_input_container}>
                <MyInput style={{marginLeft: '16px'}} value={saleRate} inputMode="decimal"
                         onChange={(e) => setRate(e.target.value)}></MyInput>
                {saleRate !== 0 ? <p style={{marginLeft: '1em'}}>{(saleRate - average).toFixed(2)}</p> : <div></div>}
            </div>
            <h3 className={cl.sale_add_deal_title}>Сумма
                рубля: {Intl.NumberFormat("ru-RU").format(amount * saleRate)}</h3>
            {saleRate !== 0 ?
                <h3 className={cl.sale_add_deal_title}>Прибыль: {Intl.NumberFormat("ru-RU").format(amount * (saleRate - average))}</h3> :
                <div/>}
        </div>
    );
};

export default SaleAddDeal;