import React from 'react';
import '../styles/AddDealScreen.css';
import DealSelector from "../components/UI/deals_selector/DealSelector";

const AddDealScreen = () => {
    return (
        <div>
            <h3 className="add_deal_title">Запись сделки</h3>
            <DealSelector selectorChanged={(selection) => {
                alert(selection)
            }}/>
        </div>
    );
};

export default AddDealScreen;