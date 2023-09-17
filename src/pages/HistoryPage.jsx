import React, {useEffect, useState} from 'react';
import '../styles/HistoryPage.css'
import MySelect from "../components/UI/my_select/MySelect";
import {useFetching} from "../hooks/useFetching";
import History from "../API/History";
import HistoryItem from "../components/UI/history_item/HistoryItem";
import {Carousel} from "@trendyol-js/react-carousel";

const HistoryPage = () => {
    const [year, setYear] = useState("2023")
    const [history, setHistory] = useState([])
    const [loadHistory, isLoadingHistory, errorList] = useFetching(async () => {
        let response = []
        response = await History.getHistory(parseInt(year))
        setHistory(response)
    })
    useEffect(() => {
        Telegram.WebApp.MainButton.hide()
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
                        <Carousel className="swipable_month_container"
                                  show={1}
                                  slide={1} swiping={true}
                                  current={new Date().getMonth() + 1}
                                  dynamic={true}
                                  useArrowKeys={false}
                                  swipeOn={0.15}
                                  rightArrow={<div style={{margin: 0, padding: 0}}><span className="material-symbols-outlined">chevron_right</span></div>}
                                  leftArrow={<div style={{margin: 0, padding: 0}}><span className="material-symbols-outlined">chevron_left</span></div>}>
                            {history.map((item) => <HistoryItem key={item.month_code} h_item={item}/>)}
                        </Carousel>
                    }
                </div>
            }
        </div>
    );
};

export default HistoryPage;