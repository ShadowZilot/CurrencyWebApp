import React from 'react';
import cl from './RubleItem.module.css'
import {useNavigate} from "react-router-dom";
import DateLabel from "../../../helpers/DateLabel";

const RubleItem = (props) => {
    const router = useNavigate()
    return (
        <div onClick={() => router(`/edit_mixing/${props.ruble.id}/ruble`)}>
            <div className={cl.main_ruble_container}>
                <div className={cl.inner_ruble_container}>
                    <div className={cl.ruble_container}>
                        <h4 className={cl.ruble_item_text}>{Intl.NumberFormat("ru-RU").format(props.ruble.amount)} ₽ </h4>
                        <p className={cl.ruble_bottom_text}>{props.ruble.comment}</p>
                    </div>
                </div>
                <p className={cl.date_text}>{DateLabel.dateLabel(props.ruble.transaction_date)}</p>
            </div>
        </div>
    );
};

export default RubleItem;