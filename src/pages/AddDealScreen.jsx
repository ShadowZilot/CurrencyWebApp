import React, {useEffect, useState} from 'react';
import '../styles/AddDealScreen.css';
import DealSelector from "../components/UI/deals_selector/DealSelector";
import PurchaseAddDeal from "../components/UI/add_deals/purchases/PurchaseAddDeal";
import SaleAddDeal from "../components/UI/add_deals/sales/SaleAddDeal";

const AddDealScreen = () => {
    const [dealType, setDealType] = useState(0)
    useEffect(() => {
        Telegram.WebApp.MainButton.show()
    }, [])

    return (
        <div>
            <h3 className="add_deal_title">Запись сделки</h3>
            <DealSelector selectorChanged={(selection) => {
                setDealType(selection)
            }}/>
            {
                dealType === 0 ? <PurchaseAddDeal/> : <div/>
            }
            {
                dealType === 1 ? <SaleAddDeal/> : <div/>
            }
            {
                dealType === 2 ? <PurchaseAddDeal/> : <div/>
            }
        </div>
    );
};

export default AddDealScreen;