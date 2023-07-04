import axios from "axios";
import {base_url} from "./APIBase";

export default class AverageRate {

    static async rate(pCurrency) {
        const response = await axios.post(
            `${base_url}/cash/average`,
            {
                date: Date.now(),
                currency: pCurrency
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data.average
    }
}