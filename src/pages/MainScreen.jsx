import React, {useState} from 'react';
import CashInfo from "../components/UI/cash_info/CashInfo";
import DealSelector from "../components/UI/deals_selector/DealSelector";
import DealsList from "../components/deals_list/DealsList";
import {useParams} from "react-router-dom";

function MainScreen() {
    const [selectedType, setSelectedType] = useState(0)
    const {time = Date.now() } = useParams()

    return (
        <div>
            <CashInfo cash={{time: time}}/>
            <DealSelector selectorChanged={(selection) => {
                setSelectedType(selection)
            }}/>
            <DealsList selectedType={selectedType} time={time}/>
        </div>
    );
}

export default MainScreen;