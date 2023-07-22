import '../styles/EditCash.css';
import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import {useFetching} from "../hooks/useFetching";
import CashService from "../API/CashService";
import Button from "../components/UI/button/Button";
import {useNavigate} from "react-router-dom";

const EditCash = () => {
    const router = useNavigate()
    const [ruble, setRuble] = useState(0)
    const [dollar, setDollar] = useState(0)
    const [averageDollar, setAverageDollar] = useState(0)
    const [euro, setEuro] = useState(0)
    const [averageEuro, setAverageEuro] = useState(0)
    const [usdt, setUsdt] = useState(0)
    const [averageUsdt, setAverageUsdt] = useState(0)
    const [cash, isLoading, error] = useFetching(async () => {
        const response = await CashService.currentCashInfo(Date.now())
        setRuble({...response.current_cash}["ruble"])
        setDollar({...response.current_cash}["dollar"])
        setAverageDollar({...response.current_cash}["average_dollar"])
        setEuro({...response.current_cash}["euro"])
        setAverageEuro({...response.current_cash}["average_euro"])
        setUsdt({...response.current_cash}["usdt"])
        setAverageUsdt({...response.current_cash}["average_usdt"])
    })
    useEffect(() => {
        cash().then(r => {
        })
    }, [])

    async function saveCash() {
        await CashService.saveCashInfo(
            {
                ruble: ruble,
                dollar: dollar,
                average_dollar: averageDollar,
                euro: euro,
                average_euro: averageEuro,
                usdt: usdt,
                average_usdt: averageUsdt,
                comment: ""
            }
        ).then((r) => {
            Telegram.WebApp.showAlert("Касса изменена!")
            router(-1)
        })
    }

    return (
        <div>
            <h3 className="edit_cash_title">Редактирование кассы</h3>
            <h5 className="currency_label">Рубль</h5>
            <MyInput type="text" inputMode="decimal"
                     pattern="\d*" value={ruble} onChange={(e) => setRuble(e.target.value)}/>
            <h5 className="currency_label">Доллары</h5>
            <div className="field_container">
                <MyInput type="text" inputMode="decimal" pattern="\d*"
                         value={dollar} onChange={(e) => setDollar(e.target.value)}/>
                <MyInput style={{width: '55px'}} type="text" inputMode="decimal" pattern="\d*"
                         value={averageDollar} onChange={(e) => setAverageDollar(e.target.value)}/>
            </div>
            <h5 className="currency_label">Eвро</h5>
            <div className="field_container">
                <MyInput type="text" inputMode="decimal" pattern="\d*"
                         value={euro} onChange={(e) => setEuro(e.target.value)}/>
                <MyInput style={{width: '55px'}} type="text" inputMode="decimal" pattern="\d*"
                         value={averageEuro} onChange={(e) => setAverageEuro(e.target.value)}/>
            </div>
            <h5 className="currency_label">USDT</h5>
            <div className="field_container">
                <MyInput type="text" inputMode="decimal" pattern="\d*"
                         value={usdt} onChange={(e) => setUsdt(e.target.value)}/>
                <MyInput style={{width: '55px'}} type="text" inputMode="decimal" pattern="\d*"
                         value={averageUsdt} onChange={(e) => setAverageUsdt(e.target.value)}/>
            </div>
            <div className="decision_buttons_container">
                <Button onClick={(e) => saveCash()}>Сохранить</Button>
                <Button onClick={(e) => router(-1)}>Отменить</Button>
            </div>
        </div>
    );
};

export default EditCash;