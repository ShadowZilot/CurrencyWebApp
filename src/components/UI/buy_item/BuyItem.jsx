import React from 'react';
import cl from "./BuyItem.module.css"
import CurrencyLabel from "../../../helpers/CurrencyLabel";
import DateLabel from "../../../helpers/DateLabel";

const BuyItem = (props) => {
    return (
        <div>
            {
                props.purchase !== null ? <div className={cl.main_purchase_container}>
                    <div className={cl.inner_purchase_container}>
                        <div className={cl.purchase_container}>
                            <h4 className={cl.buy_item_text}>{props.purchase.amount} {CurrencyLabel.labelForCurrency(props.purchase.currency)}</h4>
                            <p className={cl.buy_bottom_text}>{Intl.NumberFormat("ru-RU").format(props.purchase.amount_ruble)} ₽</p>
                        </div>
                        <h4 className={cl.rate_text}>{props.purchase.rate}</h4>
                    </div>
                    <p className={cl.date_text}>{DateLabel.dateLabel(props.purchase.transaction_date)}</p>
                </div> : <div></div>
            }
        </div>
    );
};

export default BuyItem;