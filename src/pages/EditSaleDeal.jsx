import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import MainButton from "../helpers/MainButton";
import '../styles/EditSaleDealStyle.css'
import EditTransaction from "../API/EditTransaction";
import {useFetching} from "../hooks/useFetching";
import TransactionSingle from "../API/TransactionSingle";
import DateLabel from "../helpers/DateLabel";
import MyInput from "../components/UI/input/MyInput";
import MySelect from "../components/UI/my_select/MySelect";
import AverageRate from "../API/AverageRate";

const EditSaleDeal = () => {
    const [isEdit, setIsEdit] = useState(false)
    const router = useNavigate()
    const {id} = useParams()
    const [amount, setAmount] = useState(0)
    const [rate, setRate] = useState(0)
    const [currency, setCurrency] = useState("")
    const [time, setTime] = useState(0)
    const [average, setAverage] = useState(0)
    useEffect(() => {
        if (isEdit) {
            async function fetchAverageRate() {
                const tmp = await AverageRate.rate(currency.toLowerCase())
                setAverage(tmp)
            }

            fetchAverageRate().then(r => {
            })
        }
    }, [currency, isEdit])
    useEffect(() => {
        MainButton.setActionToMainButton(() => {
            EditTransaction.editSale(
                {
                    "id": id,
                    "dealer": Telegram.WebApp.initDataUnsafe.user.username,
                    "amount": amount,
                    "rate": rate,
                    "average": average,
                    "currency": currency.toLowerCase(),
                    "comment": "",
                    "transaction_date": time
                }
            ).then(() => {
                Telegram.WebApp.showAlert("Сделка отредактирована")
                router(-1)
            })
        })
    }, [amount, currency, rate, average])
    useEffect(() => {
        sale().then({})
    }, [])
    const [sale, isLoadingSale, errorList] = useFetching(async () => {
        let response = await TransactionSingle.saleById(id)
        setAmount(response.amount)
        setRate(response.rate)
        setCurrency(response.currency)
        setTime(response.transaction_date)
        EditTransaction.isCanEdit(response.transaction_date).then((value) => {
            setIsEdit(value.is_edit)
            if (value.is_edit) {
                Telegram.WebApp.MainButton.show()
                Telegram.WebApp.MainButton.setText("Применить")
            } else {
                Telegram.WebApp.MainButton.hide()
                setAverage(response.rate - response.profit_rate)
            }
        })
    })
    return (
        <div className="edit_sale_main">
            {
                isLoadingSale ? <h4>Загрузка...</h4> : <div>
                    <h2 style={{
                        position: 'relative',
                        width: 'fit-content', height: 'fit-content',
                        left: '50%', transform: 'translateX(-50%)'
                    }}>Детали сделки</h2>
                    <div className="center_container">
                        <div className="edit_sale_top_container">
                            <div className="edit_sale_label_name">
                                <p style={{flex: '0 0 1.8em'}}>Продали</p>
                            </div>
                            <p style={{
                                marginLeft: 'auto', marginBottom: '0',
                                marginTop: '0', fontSize: '1.25rem', fontWeight: '700'
                            }}>{DateLabel.dateLabel(time)}</p>
                        </div>
                        <hr className="edit_sale_top_divider"/>
                        <div className="sale_input_row_container">
                            <div className="sale_input_row_container" style={{
                                width: '80%', marginTop: '0',
                                height: '2.625em',
                                background: 'var(--tg-theme-bg-color)',
                                borderRadius: '12px', boxShadow: '0 3px 3px rgba(0,0,0,0.2)'
                            }}>
                                <MyInput style={{
                                    marginLeft: 'auto', width: '100%',
                                    boxShadow: 'none', borderWidth: 0,
                                    boxSizing: 'border-box', height: '100%'
                                }} inputMode="numeric" disabled={!isEdit} value={amount}
                                         onChange={(e) => setAmount(e.target.value)}/>
                                <MySelect style={{
                                    height: 'auto', marginLeft: 'auto',
                                    verticalAlign: 'center', width: '40%'
                                }} value={currency} disabled={!isEdit} onChange={(e) => setCurrency(e.target.value)}>,
                                    <option value="usd">USD</option>
                                    <option value="eur">EUR</option>
                                    <option value="ust">USDT</option>
                                </MySelect>
                            </div>
                            <MyInput style={{
                                width: '20%', marginLeft: '1.5em',
                                marginRight: 'auto'
                            }} value={rate} disabled={!isEdit}
                                     onChange={(e) => setRate((e.target.value))}/>
                        </div>
                        <p style={{fontSize: '1em', fontWeight: '500'}}>Сумма в
                            рубле: {Intl.NumberFormat("ru-RU").format(rate * amount)}</p>
                        <div style={{marginTop: '0', display: 'flex', flexDirection: 'row'}}>
                            <p style={{
                                fontSize: '1em',
                                fontWeight: '500'
                            }}>Прибыль: {Intl.NumberFormat("ru-RU").format(amount * (rate - average))}</p>
                            <p style={{
                                marginLeft: '1em',
                                fontSize: '1em',
                                fontWeight: '500'
                            }}>({(rate - average).toFixed(2)})</p>
                            {isEdit ? <span className="material-symbols-outlined"
                                            style={{marginLeft: 'auto', marginTop: '0.5em'}}
                                            onClick={(e) => Telegram.WebApp.showConfirm(
                                                "Вы действительно хотите удалить сделку?",
                                                (result) => {
                                                    if (result) {
                                                        EditTransaction.deleteDeal(
                                                            id,
                                                            "sale"
                                                        ).then(() => {
                                                            Telegram.WebApp.showAlert("Сделка удалена!")
                                                            router(-1)
                                                        })
                                                    }
                                                }
                                            )}>
                            delete
                        </span> : <div></div>}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default EditSaleDeal;