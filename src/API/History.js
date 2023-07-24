import axios from "axios";
import {base_url} from "./APIBase";

export default class History {

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