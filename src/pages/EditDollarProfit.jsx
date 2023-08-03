import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import CashService from "../API/CashService";
import MyInput from "../components/UI/input/MyInput";
import Button from "../components/UI/button/Button";

const EditDollarProfit = () => {
    const router = useNavigate()
    const {time} = useParams()
    const [dollarProfit, setDollarProfit] = useState(0)

    const [loadProfit, isLoading, error] = useFetching(async () => {
        const response = await CashService.dollarProfit(time)
        setDollarProfit(response)
    })

    async function saveProfit() {
        await CashService.saveDollarProfit(
            +dollarProfit,
            +time
        ).then((r) => {
            Telegram.WebApp.showAlert("Прибыль отредактирована")
            router(-1)
        })
    }

    useEffect(() => {
        Telegram.WebApp.MainButton.hide()
        loadProfit()
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h4 style={{margin: "2em", marginTop: "2em"}}>Прибыль в долларе</h4>
            <MyInput style={{marginLeft: "2em", marginRight: "2em"}} inputMode="numeric"
                     value={dollarProfit} onChange={(e) => setDollarProfit(e.target.value)}/>

            <Button style={{marginLeft: "2em", marginRight: "2em",
             marginTop: "1.5em"}}
                    onClick={(e) => saveProfit()}>Сохранить</Button>
        </div>
    );
};

export default EditDollarProfit;