import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import DealLists from "../../API/DealLists";
import cl from "./DealsList.module.css"
import BuyItem from "../UI/buy_item/BuyItem";
import SaleItem from "../UI/sale_item/SaleItem";
import MixingItem from "../UI/mixing_item/MixingItem";

const DealsList = (props) => {
    const [dealList, setDealList] = useState([])
    const [loadDealList, isLoadingList, errorList] = useFetching(async () => {
        let response = []
        if (props.selectedType === 0) {
            response = await DealLists.buyList(Date.now())
        } else if (props.selectedType === 1) {
            response = await DealLists.salesList(Date.now())
        } else if (props.selectedType === 2) {
            response = await DealLists.mixingList(Date.now())
        }
        setDealList(response)
    })

    useEffect(() => {
        loadDealList()
    }, [props.selectedType])

    return (
        <div className={cl.list_container}>
            {
                isLoadingList ? <h4>Загрузка...</h4> : <div>
                    {dealList.length === 0 ? <h4>Сделок не было</h4> :
                        <div>
                            {
                                props.selectedType === 0 ? dealList.map((item) =>
                                    <BuyItem key={item.id} purchase={item}/>
                                ) : <div></div>
                            }
                            {
                                props.selectedType === 1 ? dealList.map((item) =>
                                    <SaleItem key={item.id} sale={item}/>
                                ) : <div></div>
                            }
                            {
                                props.selectedType === 2 ? dealList.map((item) =>
                                    <MixingItem key={item.id} mixing={item}/>
                                ) : <div></div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default DealsList;