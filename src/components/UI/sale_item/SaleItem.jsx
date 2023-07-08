import React from 'react';
import cl from "./SaleItem.module.css";
import CurrencyLabel from "../../../helpers/CurrencyLabel";
import DateLabel from "../../../helpers/DateLabel";

const SaleItem = (props) => {
    return (
        <div>
            <div className={cl.main_sale_container}>
                <div className={cl.inner_sale_container}>
                    <div className={cl.sale_container}>
                        <h4 className={cl.sale_item_text}>{props.sale.amount} {CurrencyLabel.labelForCurrency(props.sale.currency)}</h4>
                        <p className={cl.sale_bottom_text}>{Intl.NumberFormat("ru-RU").format(props.sale.amount_ruble)} ₽</p>
                    </div>
                </div>
                <p className={cl.rate_text}>{`${props.sale.rate} (${props.sale.profit_rate}) = ${Intl.NumberFormat("ru-RU").format(props.sale.profit)}`}</p>
                <p className={cl.date_text}>{DateLabel.dateLabel(props.sale.transaction_date)}</p>
            </div>
        </div>
    );
};

export default SaleItem;