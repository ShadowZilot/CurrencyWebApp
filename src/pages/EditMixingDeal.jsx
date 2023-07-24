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
    const {id} = useParams()
    const [amount, setAmount] = useState(0)
    const [profit, setProfit] = useState(0)
    const [currency, setCurrency] = useState("usd")
    const [time, setTime] = useState(0)
    const [mixing, isLoadingMixing, errorList] = useFetching(async () => {
        let response = await TransactionSingle.mixingById(id)
        setAmount(response.amount)
        setProfit(response.profit)
        setCurrency(response.currency)
        setTime(response.transaction_date)
    })
    useEffect(() => {
        MainButton.setActionToMainButton(() => {
            EditTransaction.editMixing(
                {
                    "id": id,
                    "dealer": Telegram.WebApp.initDataUnsafe.user.username,
                    "amount": amount,
                    "profit": profit,
                    "currency": currency.toLowerCase(),
                    "comment": "",
                    "transaction_date": time
                }
            ).then(() => {
                Telegram.WebApp.showAlert("Сделка отредактирована")
                router(-1)
            })
        })
    }, [amount, currency, profit])
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
                                }} inputMode="numeric" value={amount}
                                         onChange={(e) => setAmount(e.target.value)}/>
                                <MySelect style={{
                                    height: 'auto', marginLeft: 'auto',
                                    verticalAlign: 'center', width: '40%'
                                }} value={currency} onChange={(e) => setCurrency(e.target.value)}>,
                                    <option value="usd">USD</option>
                                    <option value="eur">EUR</option>
                                    <option value="ust">USDT</option>
                                </MySelect>
                            </div>
                        </div>
                        <MyInput style={{
                            height: '2.625em', width: '100%',
                            marginTop: '1em', boxSizing: 'border-box'
                        }} inputMode="numeric"
                                 value={profit}
                                 onChange={(e) => setProfit(e.target.value)}/>
                        <span className="material-symbols-outlined"
                              style={{marginLeft: 'auto', marginTop: '0.5em'}}
                              onClick={(e) => Telegram.WebApp.showConfirm(
                                  "Вы действительно хотите удалить сделку?",
                                  (result) => {
                                      if (result) {
                                          EditTransaction.deleteDeal(
                                              id,
                                              "mixing"
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
};

export default EditMixingDeal;