import React, {useEffect, useState} from 'react';
import cl from "./CashInfo.module.css"
import CashService from "../../../API/CashService";
import {useFetching} from "../../../hooks/useFetching";
import {useNavigate} from "react-router-dom";
import History from "../../../API/History";
import MainButton from "../../../helpers/MainButton";

const CashInfo = (props) => {

    const today = props.cash.time
    const [loadedCash, setCash] = useState({})
    const [profit, setProfit] = useState(1)
    const [dollarProfit, setDollarProfit] = useState(1)
    const [isCanAdd, setIsCadAdd] = useState()
    const [computeCanAdd, loagingCanAdd, canAddError] = useFetching(async () => {
        if (Date.now() - today > 5000) {
            let canAddResult = await History.isCanAdd(today)
            setIsCadAdd(canAddResult.can_add)
            if (canAddResult.can_add === true) {
                Telegram.WebApp.MainButton.show()
                MainButton.setActionToMainButton(() => {
                        router("/add_deal")
                    }
                )
            } else {
                Telegram.WebApp.MainButton.hide()
            }
        }
    })
    const [cash, isLoading, error] = useFetching(async () => {
        const response = await CashService.cashInfo(today)
        setCash(response)
    })
    const router = useNavigate()
    const [loadProfit, isLoadingProfit, errorProfit] = useFetching(async () => {
        const response = await CashService.profit(today)
        setProfit(response)
        setDollarProfit(await CashService.dollarProfit(today))
    })

    useEffect(() => {
        computeCanAdd()
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
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                            {isCanAdd || Date.now() - today < 5000 ?
                                <span className="material-symbols-outlined" onClick={(e) => router('/edit_cash')}>
                                edit
                        </span> : <div></div>}
                            <span className="material-symbols-outlined"
                                  style={{marginLeft: 'auto'}}
                                  onClick={(e) => router('/history')}>
                            history
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
                    <p>{`Прибыль: ${Intl.NumberFormat("ru-RU").format(profit)}`}</p>
                    <div style={{
                        display: 'flex', flexDirection: 'row',
                        marginTop: '0',
                        marginBottom: '0',
                        height: "2em"
                    }}>
                        <p style={{
                            height: '100%',
                            marginRight: '1em',
                            marginBottom: '0',
                            marginTop: '0.3em'
                        }}>{`Прибыль в $: ${Intl.NumberFormat("ru-RU").format(dollarProfit)}`}</p>
                        <span style={{margin: '0', marginBottom: '3em', alignSelf: 'baseline'}}
                              className="material-symbols-outlined" onClick={(e) =>
                            router(`/edit_dollar/${today}`)}>
                                edit
                        </span>
                    </div>
                </div>
            }
        </div>
    );
};

export default CashInfo;