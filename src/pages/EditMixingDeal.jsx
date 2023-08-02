import React, {useEffect, useState} from 'react';
import '../styles/EditMixingDealStyles.css'
import {useNavigate, useParams} from "react-router-dom";
import MainButton from "../helpers/MainButton";
import MyInput from "../components/UI/input/MyInput";
import MySelect from "../components/UI/my_select/MySelect";
import {useFetching} from "../hooks/useFetching";
import TransactionSingle from "../API/TransactionSingle";
import DateLabel from "../helpers/DateLabel";
import EditTransaction from "../API/EditTransaction";

const EditMixingDeal = () => {
        const router = useNavigate()
        const {id, type} = useParams()
        const [amount, setAmount] = useState(0)
        const [profit, setProfit] = useState(0)
        const [comment, setComment] = useState("")
        const [currency, setCurrency] = useState("usd")
        const [time, setTime] = useState(0)
        const [mixing, isLoadingMixing, errorList] = useFetching(async () => {
            let response
            if (type === "mixing") {
                response = await TransactionSingle.mixingById(id)
            } else {
                response = await TransactionSingle.rubleById(id)
            }
            if (response.currency === undefined) {
                setCurrency("rub")
                setComment(response.comment)
            } else {
                setProfit(response.profit)
                setCurrency(response.currency)
            }
            setAmount(response.amount)
            setTime(response.transaction_date)
        })
        useEffect(() => {
                Telegram.WebApp.MainButton.show()
                Telegram.WebApp.MainButton.setText("Применить")
                MainButton.setActionToMainButton(() => {
                    if (type === "ruble") {
                        EditTransaction.editRuble(
                            {
                                "id": +id,
                                "amount": +amount,
                                "comment": comment,
                                "transaction_date": time
                            }
                        ).then(() => {
                            Telegram.WebApp.showAlert("Сделка отредактирована")
                            router(-1)
                        })
                    } else {
                        EditTransaction.editMixing(
                            {
                                "id": +id,
                                "dealer": Telegram.WebApp.initDataUnsafe.user.username,
                                "amount": +amount,
                                "profit": profit,
                                "currency": currency.toLowerCase(),
                                "comment": "",
                                "transaction_date": time
                            }
                        ).then(() => {
                            Telegram.WebApp.showAlert("Сделка отредактирована")
                            router(-1)
                        })
                    }

                })
            }, [amount, currency, profit, comment]
        )
        useEffect(() => {
            Telegram.WebApp.MainButton.show()
            Telegram.WebApp.MainButton.setText("Применить")
            mixing().then({})
        }, [])
        return (
            <div className="edit_mixing_main">
                {
                    isLoadingMixing ? <h4>Загрузка...</h4> : <div>
                        <h2 style={{
                            position: 'relative',
                            width: 'fit-content', height: 'fit-content',
                            left: '50%', transform: 'translateX(-50%)'
                        }}>Детали сделки</h2>
                        <div className="mixing_center_container">
                            <div className="edit_mixing_top_container">
                                <div className="edit_mixing_label_name">
                                    <p style={{flex: '0 0 1.8em'}}>Прочее</p>
                                </div>
                                <p style={{
                                    marginLeft: 'auto', marginBottom: '0',
                                    marginTop: '0', fontSize: '1.25rem', fontWeight: '700'
                                }}>{DateLabel.dateLabel(time)}</p>
                            </div>
                            <hr className="edit_mixing_top_divider"/>
                            <div className="mixing_input_row_container">
                                <div className="mixing_input_row_container" style={{
                                    width: '100%', marginTop: '0',
                                    height: '2.625em',
                                    background: 'var(--tg-theme-bg-color)',
                                    borderRadius: '12px', boxShadow: '0 3px 3px rgba(0,0,0,0.2)'
                                }}>
                                    <MyInput style={{
                                        marginLeft: 'auto', width: '100%',
                                        boxShadow: 'none', borderWidth: 0,
                                        boxSizing: 'border-box', height: '100%'
                                    }} type="text" inputMode="numeric" value={amount}
                                             onChange={(e) => setAmount(e.target.value)}/>
                                    {
                                        type === "mixing" ? <MySelect style={{
                                            height: 'auto', marginLeft: 'auto',
                                            verticalAlign: 'center', width: '40%'
                                        }} value={currency} onChange={(e) => setCurrency(e.target.value)}>,
                                            <option value="rub">RUB</option>
                                            <option value="usd">USD</option>
                                            <option value="eur">EUR</option>
                                            <option value="ust">USDT</option>
                                        </MySelect> : <div></div>
                                    }
                                </div>
                            </div>
                            {
                                type === "ruble" ? <MyInput style={{
                                        height: '4em', width: '100%',
                                        marginTop: '1em', boxSizing: 'border-box'
                                    }} type="text"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}/> :
                                    <MyInput style={{
                                        height: '2.625em', width: '100%',
                                        marginTop: '1em', boxSizing: 'border-box'
                                    }} inputMode="numeric"
                                             value={profit}
                                             onChange={(e) => setProfit(e.target.value)}/>
                            }
                            <span className="material-symbols-outlined"
                                  style={{marginLeft: 'auto', marginTop: '0.5em'}}
                                  onClick={(e) => Telegram.WebApp.showConfirm(
                                      "Вы действительно хотите удалить сделку?",
                                      (result) => {
                                          if (result) {
                                              EditTransaction.deleteDeal(
                                                  id,
                                                  currency === "rub" ? "ruble" : "mixing"
                                              ).then(() => {
                                                  Telegram.WebApp.showAlert("Сделка удалена!")
                                                  router(-1)
                                              })
                                          }
                                      }
                                  )}>
                            delete
                        </span>
                        </div>
                    </div>
                }
            </div>
        );
    }
;

export default EditMixingDeal;