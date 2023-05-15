import React from 'react';
import CashInfo from "../components/UI/cash_info/CashInfo";
import DealSelector from "../components/UI/deals_selector/DealSelector";

function MainScreen() {
    return (
        <div>
            <CashInfo/>
            <DealSelector/>
        </div>
    );
}

export default MainScreen;