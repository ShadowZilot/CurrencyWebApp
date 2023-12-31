import '../styles/EditCash.css';
import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import {useFetching} from "../hooks/useFetching";
import CashService from "../API/CashService";
import Button from "../components/UI/button/Button";
import {useNavigate, useParams} from "react-router-dom";

const EditCash = () => {
    const {time = -1} = useParams()
    const router = useNavigate()
    const [ruble, setRuble] = useState(0)
    const [dollar, setDollar] = useState(0)
    const [averageDollar, setAverageDollar] = useState(0)
    const [euro, setEuro] = useState(0)
    const [averageEuro, setAverageEuro] = useState(0)
    const [usdt, setUsdt] = useState(0)
    const [averageUsdt, setAverageUsdt] = useState(0)
    const [cashId, setCashId] = useState(0)
    const [cashTime, setCashTime] = useState(0)
    const [cash, isLoading, error] = useFetching(async () => {
        let response
        if (time === -1) {
            response = await CashService.currentCashInfo(Date.now())
            setRuble({...response.current_cash}["ruble"])
            setDollar({...response.current_cash}["dollar"])
            setAverageDollar({...response.current_cash}["average_dollar"])
            setEuro({...response.current_cash}["euro"])
            setAverageEuro({...response.current_cash}["average_euro"])
            setUsdt({...response.current_cash}["usdt"])
            setAverageUsdt({...response.current_cash}["average_usdt"])
        } else {
            response = await CashService.firstCashInfo(time)
            setCashId(response.id)
            setCashTime(response.cash_date)
            setRuble(response.ruble)
            setDollar(response.dollar)
            setAverageDollar(response.average_dollar)
            setEuro(response.euro)
            setAverageEuro(response.average_euro)
            setUsdt(response.usdt)
            setAverageUsdt(response.average_usdt)
        }
    })
    useEffect(() => {
        Telegram.WebApp.MainButton.hide()
        cash().then(r => {
        })
    }, [])

    async function saveCash() {
        if (time === -1) {
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
        } else {
            await CashService.updateFirstCash(
                {
                    id: cashId,
                    ruble: ruble,
                    dollar: dollar,
                    average_dollar: averageDollar,
                    euro: euro,
                    average_euro: averageEuro,
                    usdt: usdt,
                    average_usdt: averageUsdt,
                    comment: "",
                    cash_time: cashTime
                }
            ).then((r) => {
                Telegram.WebApp.showAlert("Касса изменена!")
                router(-1)
            })
        }
    }

    return (
        <div>
            <h3 className="edit_cash_title">Редактирование кассы</h3>
            <h5 className="currency_label">Рубль</h5>
            <MyInput style={{marginLeft: '16px'}} type="text" inputMode="decimal"
                     pattern="\d*" value={ruble} onChange={(e) => setRuble(e.target.value)}/>
            <h5 className="currency_label">Доллары</h5>
            <div className="field_container">
                <MyInput style={{marginLeft: '16px'}} type="text" inputMode="decimal" pattern="\d*"
                         value={dollar} onChange={(e) => setDollar(e.target.value)}/>
                <MyInput style={{
                    marginLeft: 'auto', marginRight: '16px',
                    width: '55px'
                }} type="text" inputMode="decimal" pattern="\d*"
                         value={averageDollar} onChange={(e) => setAverageDollar(e.target.value)}/>
            </div>
            <h5 className="currency_label">Eвро</h5>
            <div className="field_container">
                <MyInput style={{marginLeft: '16px'}} type="text" inputMode="decimal" pattern="\d*"
                         value={euro} onChange={(e) => setEuro(e.target.value)}/>
                <MyInput style={{
                    marginLeft: 'auto', marginRight: '16px',
                    width: '55px'
                }} type="text" inputMode="decimal" pattern="\d*"
                         value={averageEuro} onChange={(e) => setAverageEuro(e.target.value)}/>
            </div>
            <h5 className="currency_label">USDT</h5>
            <div className="field_container">
                <MyInput style={{marginLeft: '16px'}} type="text" inputMode="decimal" pattern="\d*"
                         value={usdt} onChange={(e) => setUsdt(e.target.value)}/>
                <MyInput style={{
                    marginLeft: 'auto', marginRight: '16px',
                    width: '55px'
                }} type="text" inputMode="decimal" pattern="\d*"
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