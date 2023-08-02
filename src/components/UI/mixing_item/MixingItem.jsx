import React from 'react';
import cl from "./MixingItem.module.css"
import CurrencyLabel from "../../../helpers/CurrencyLabel";
import DateLabel from "../../../helpers/DateLabel";
import {useNavigate} from "react-router-dom";

const MixingItem = (props) => {
    const router = useNavigate()
    return (
        <div onClick={() => router(`/edit_mixing/${props.mixing.id}/mixing`)}>
            <div className={cl.main_mixing_container}>
                <div className={cl.inner_mixing_container}>
                    <div className={cl.mixing_container}>
                        <h4 className={cl.mixing_item_text}>{props.mixing.amount} {CurrencyLabel.labelForCurrency(props.mixing.currency)}</h4>
                        <p className={cl.mixing_bottom_text}>Прибыль: {Intl.NumberFormat("ru-RU").format(props.mixing.profit)} ₽</p>
                    </div>
                </div>
                <p className={cl.date_text}>{DateLabel.dateLabel(props.mixing.transaction_date)}</p>
            </div>
        </div>
    );
};

export default MixingItem;