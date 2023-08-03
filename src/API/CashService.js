import axios from "axios";
import {base_url} from "./APIBase";

export default class CashService {

    static async saveCashInfo(cashData) {
        const response = await axios.post(
            `${base_url}/cash/edit`,
            cashData,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }

    static async currentCashInfo(currentDate) {
        const response = await axios.post(
            `${base_url}/cash`,
            {
                date: currentDate
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data
    }

    static async dollarProfit(currentDate) {
        const response = await axios.post(
            `${base_url}/dollar_profit`,
            {
                dollar_date: currentDate
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        ).catch((error) => {
        })
        return response.data.profit
    }

    static async saveDollarProfit(profit, currentDate) {
        await axios.post(
            `${base_url}/dollar_profit/update`,
            {
                profit: profit,
                dollar_date: currentDate
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        ).catch((error) => {
        })
    }

    static async cashInfo(currentDate) {
        const response = await axios.post(
            `${base_url}/cash`,
            {
                date: currentDate
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        ).catch((error) => {
        })
        return response.data
    }

    static async profit(currentDate) {
        const response = await axios.post(
            `${base_url}/profit`,
            {
                date: currentDate
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data.total_profit
    }
}