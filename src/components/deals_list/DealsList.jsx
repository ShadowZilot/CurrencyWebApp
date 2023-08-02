import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import DealLists from "../../API/DealLists";
import cl from "./DealsList.module.css"
import BuyItem from "../UI/buy_item/BuyItem";
import SaleItem from "../UI/sale_item/SaleItem";
import MixingItem from "../UI/mixing_item/MixingItem";
import RubleItem from "../UI/ruble_item/RubleItem";
import MySelect from "../UI/my_select/MySelect";

const DealsList = (props) => {
    const [dealList, setDealList] = useState([])
    const [elseType, setElseType] = useState("mixing")
    const [loadDealList, isLoadingList, errorList] = useFetching(async () => {
        let response = []
        if (props.selectedType === 0) {
            response = await DealLists.buyList(props.time)
        } else if (props.selectedType === 1) {
            response = await DealLists.salesList(props.time)
        } else if (props.selectedType === 2) {
            if (elseType === "mixing") {
                response.push(...(await DealLists.mixingList(props.time)))
            }
            if (elseType === "ruble") {
                response.push(...(await DealLists.rublesList(props.time)))
            }
        }
        setDealList(response)
    })

    useEffect(() => {
        loadDealList()
    }, [props.selectedType, elseType])

    return (
        <div className={cl.list_container}>
            {
                !isLoadingList && props.selectedType === 2 ? <div style={{
                        width: '100%', display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <MySelect style={{width: '7em', marginLeft: 'auto'}}
                                  value={elseType} onChange={(e) => setElseType(e.target.value)}>
                            <option value="mixing">Сделки</option>
                            <option value="ruble">Рубль</option>
                        </MySelect>
                    </div>
                    :
                    <div></div>
            }
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
                                props.selectedType === 2 ? dealList.map((item) => {
                                    console.log(item.currency)
                                    return item.currency !== undefined ?
                                        <MixingItem key={item.id} mixing={item}/> :
                                        <RubleItem key={item.id} ruble={item}/>
                                }) : <div></div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default DealsList;