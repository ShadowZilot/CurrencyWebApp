import React from 'react';
import cl from './HistoryItem.module.css'
import DayItem from "../day_item/DayItem";

const HistoryItem = (props) => {
    return (
        <div className={cl.main_container}>
            <div style={{
                width: '100%', display: 'flex', flexDirection: 'row',
                marginBottom: '0', paddingBottom: '0'
            }}>
                <p className={cl.month_label}>{props.h_item.month}</p>
                {props.h_item.month_profit !== 0 ?
                    <p className={cl.profit_label}>Прибыль: {Intl.NumberFormat("ru-RU").format(props.h_item.month_profit)} $</p> :
                    <div></div>}
            </div>
            <div className={cl.days_container}>
                {
                    props.h_item.days.map((item) => <DayItem key={item.day_number} day={item}/>)
                }
            </div>
        </div>
    );
};

export default HistoryItem;