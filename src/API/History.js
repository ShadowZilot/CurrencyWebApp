import axios from "axios";
import {base_url} from "./APIBase";

export default class History {

    static async isCanAdd(dayTime) {
        return (await axios.post(
            `${base_url}/transactions/add/check`,
            {
                time: dayTime
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )).data
    }

    static async getHistory(year) {
        const response = await axios.post(
            `${base_url}/transactions/history`,
            {
                year: year
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data.history
    }
}