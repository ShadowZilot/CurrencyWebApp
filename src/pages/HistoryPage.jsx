import React, {useEffect, useState} from 'react';
import '../styles/HistoryPage.css'
import MySelect from "../components/UI/my_select/MySelect";
import {useFetching} from "../hooks/useFetching";
import History from "../API/History";
import HistoryItem from "../components/UI/history_item/HistoryItem";

const HistoryPage = () => {
    const [year, setYear] = useState("2023")
    const [history, setHistory] = useState([])
    const [loadHistory, isLoadingHistory, errorList] = useFetching(async () => {
        let response = []
        response = await History.getHistory(parseInt(year))
        setHistory(response)
    })
    useEffect(() => {
        loadHistory()
    }, [year])

    return (
        <div className="main_history_container">
            <div className="history_top_container">
                <p className="history_title">История сделок</p>
                <MySelect value={year} onChange={(e) => setYear(e.target.value)}
                          style={{marginLeft: 'auto', paddingRight: '1em', width: '4.875em'}}>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </MySelect>
            </div>
            {
                isLoadingHistory ? <h4 style={{marginTop: '4em'}}>Загрузка..</h4> : <div>
                    {
                        history.map((item) => <HistoryItem key={item.month_code} h_item={item}/>)
                    }
                </div>
            }
        </div>
    );
};

export default HistoryPage;