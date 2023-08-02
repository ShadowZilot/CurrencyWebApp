import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MainButton from "../../../../helpers/MainButton";
import AddService from "../../../../API/AddService";
import cl from "../sales/SaleAddDeal.module.css";
import MyInput from "../../input/MyInput";
import MySelect from "../../my_select/MySelect";

const MixingAddDeal = () => {
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState("rub")
    const router = useNavigate()
    const [profit, setProfit] = useState(0)
    const [comment, setComment] = useState("")
    useEffect(() => {
        Telegram.WebApp.MainButton.show()
        if (currency === "rub") {
            MainButton.setActionToMainButton(() => {
                AddService.addRubleTransaction(
                    {
                        "amount": +amount,
                        "comment": comment
                    }
                ).then(r => router(-1))
            })
        } else {
            MainButton.setActionToMainButton(() => {
                AddService.addMixingDeal(
                    {
                        "dealer": Telegram.WebApp.initDataUnsafe.user.username,
                        "amount": +amount,
                        "profit": +profit,
                        "currency": currency.toLowerCase(),
                        "comment": ""
                    }
                ).then(r => router(-1))
            })
        }
    }, [amount, profit, currency, comment])

    return (
        <div>
            <h4 className={cl.sale_add_deal_title}>Сумма {currency === "rub" ? `рубля` : `сделки`}</h4>
            <div>
                <MyInput style={{marginLeft: '16px'}} value={amount} type="text" inputMode="numeric"
                         onChange={(e) => setAmount(e.target.value)}></MyInput>
                <MySelect style={{width: '4.875em'}} value={currency}
                          onChange={(e) => setCurrency(e.target.value)}>
                    <option value="rub">RUB</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="ust">USDT</option>
                </MySelect>
            </div>
            <h4 className={cl.sale_add_deal_title}>{currency === "rub" ? `Комментарий` : `Прибыль`}</h4>
            <div className={cl.sale_input_container}>
                {
                    currency !== "rub" ? <MyInput style={{marginLeft: '16px'}} value={profit} inputMode="decimal"
                                                  onChange={(e) => setProfit(e.target.value)}></MyInput> :
                        <MyInput style={{
                            marginLeft: '16px', marginRight: '16px',
                            width: '100%'
                        }} type="text" value={comment}
                                 onChange={(e) => setComment(e.target.value)}></MyInput>
                }
            </div>
        </div>
    );
};

export default MixingAddDeal;