import React, {useEffect, useState} from 'react';
import cl from "./CashInfo.module.css"
import CashService from "../../../API/CashService";
import {useFetching} from "../../../hooks/useFetching";
import {useNavigate} from "react-router-dom";

const CashInfo = () => {

    const today = new Date()
    const [loadedCash, setCash] = useState({})
    const [profit, setProfit] = useState(1)
    const [cash, isLoading, error] = useFetching(async () => {
        const response = await CashService.cashInfo(Date.now())
        setCash(response)
    })
    const router = useNavigate()
    const [loadProfit, isLoadingProfit, errorProfit] = useFetching(async () => {
        const response = await CashService.profit(Date.now())
        setProfit(response)
    })


    useEffect(() => {
        cash().then(r => {
        })
        loadProfit().then(r => {
        })
    }, [])
    return (
        <div>
            {
                isLoading && isLoadingProfit ? <h4>Загрузка...</h4> : <div className={cl.info_block}>
                    <div className={cl.date_block}>
                        <h3 className={cl.date_title}>{new Intl.DateTimeFormat("ru-RU").format(today)}</h3>
                        <div>
                        <span className="material-symbols-outlined" onClick={(e) => router('/edit_cash')}>
                                edit
                        </span>
                        </div>
                    </div>
                    <hr className={cl.cash_divider}/>
                    <h4 className={cl.cash_title}>Начало дня</h4>
                    <div className={cl.cash_info}>
                        <p className={cl.cash_labels}>{`Рубль: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.begin_cash}["ruble"])}`}</p>
                        <p className={cl.cash_labels}>{`Доллар: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.begin_cash}["dollar"])}
                         (${{...loadedCash.begin_cash}["average_dollar"]})`}</p>
                        <p className={cl.cash_labels}>{`Евро: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.begin_cash}["euro"])}
                            (${{...loadedCash.begin_cash}["average_euro"]})`}</p>
                        <p className={cl.cash_labels}>{`USDT: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.begin_cash}["usdt"])}
                            (${{...loadedCash.begin_cash}["average_usdt"]})`}</p>
                        <p className={cl.cash_labels}>{`Всего рубля: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.begin_cash}["total_ruble"])}`}</p>
                    </div>
                    <hr className={cl.cash_divider}/>
                    <h4 className={cl.cash_title}>Текущий остаток</h4>
                    <div className={cl.cash_info}>
                        <p className={cl.cash_labels}>{`Рубль: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.current_cash}["ruble"])}`}</p>
                        <p className={cl.cash_labels}>{`Доллар: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.current_cash}["dollar"])}
                         (${{...loadedCash.current_cash}["average_dollar"]})`}</p>
                        <p className={cl.cash_labels}>{`Евро: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.current_cash}["euro"])}
                            (${{...loadedCash.current_cash}["average_euro"]})`}</p>
                        <p className={cl.cash_labels}>{`USDT: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.current_cash}["usdt"])}
                            (${{...loadedCash.current_cash}["average_usdt"]})`}</p>
                        <p className={cl.cash_labels}>{`Всего рубля: ${Intl.NumberFormat("ru-RU").format(
                            {...loadedCash.current_cash}["total_ruble"])}`}</p>
                    </div>
                    <hr className={cl.cash_divider}/>
                    <p>{`Прибыль: ${profit}`}</p>
                </div>
            }
        </div>
    );
};

export default CashInfo;