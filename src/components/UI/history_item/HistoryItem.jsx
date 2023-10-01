import React, {useEffect, useState} from 'react';
import cl from './HistoryItem.module.css'
import DayItem from "../day_item/DayItem";

const HistoryItem = (props) => {
    const [daysOffset, setDaysOffset] = useState([])

    useEffect(() => {
        if (daysOffset.length === 0) {
            let day = new Date(props.h_item.days[0].day_date).getDay() - 1
            if (day < 0) {
                day = 6
            }
            const offset = []
            for (let i = day; i > 0; i--) {
                offset.push(-i)
            }
            offset.push(...props.h_item.days)
            setDaysOffset(offset)
        }
    }, []);

    const Days = () => {
        return (<div className={cl.history_content_bg}>
            <div className={cl.week_container}>
                <h4 className={cl.week_day}>ПН</h4>
                <h4 className={cl.week_day}>ВТ</h4>
                <h4 className={cl.week_day}>СР</h4>
                <h4 className={cl.week_day}>ЧТ</h4>
                <h4 className={cl.week_day}>ПН</h4>
                <h4 className={cl.week_day}>СБ</h4>
                <h4 className={cl.week_day}>ВС</h4>
            </div>
            <hr style={{marginBottom: '1.4em'}}/>
            <div className={cl.days_container}>
                {
                    daysOffset.map((item) => item.day_number === undefined ? <div key={item}></div>
                        : <DayItem key={item.day_number} day={item}/>)
                }
            </div>
        </div>)
    }

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
            <Days></Days>
        </div>
    );
};

export default HistoryItem;