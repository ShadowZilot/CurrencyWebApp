import axios from "axios";
import {base_url} from "./APIBase";

export default class DealLists {

    static async buyList(currentDate) {
        const response = await axios.post(
            `${base_url}/transactions/purchases`,
            {
                date: currentDate
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data.purchases
    }
}