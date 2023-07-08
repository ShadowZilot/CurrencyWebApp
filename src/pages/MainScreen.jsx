import React, {useState} from 'react';
import CashInfo from "../components/UI/cash_info/CashInfo";
import DealSelector from "../components/UI/deals_selector/DealSelector";
import DealsList from "../components/deals_list/DealsList";

function MainScreen() {
    const [selectedType, setSelectedType] = useState(0)

    return (
        <div>
            <CashInfo/>
            <DealSelector selectorChanged={(selection) => {
                console.log(`Current selected type = ${selection}`)
                setSelectedType(selection)
                console.log(`Past selected type = ${selectedType}`)
            }}/>
            <DealsList selectedType={selectedType}/>
        </div>
    );
}

export default MainScreen;