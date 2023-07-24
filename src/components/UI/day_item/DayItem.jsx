import React from 'react';
import cl from './DayItem.module.css'
import {useNavigate} from "react-router-dom";

const DayItem = (props) => {
    const router = useNavigate()
    return (
        <div onClick={(e) => router(`/day/${props.day.day_date}`)} className={cl.main_container}>
            <p className={cl.day_label}>{props.day.day_number}</p>
            {props.day.day_profit !== 0 ?
                <p className={cl.profit_label}>{Intl.NumberFormat("ru-RU").format(props.day.day_profit)}</p> :
                <div></div>}
        </div>
    );
};

export default DayItem;