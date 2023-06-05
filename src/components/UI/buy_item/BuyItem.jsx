import React from 'react';
import cl from "./BuyItem.module.css"

const BuyItem = (props) => {
    return (
        <div className={cl.main_purchase_container}>
            <div className={cl.purchase_container}>
                <h4>{props.purchase.amount}</h4>
                <hr/>
                <h4>{props.purchase.amount_ruble}</h4>
            </div>
            <h4>{props.purchase.rate}</h4>
        </div>
    );
};

export default BuyItem;