import axios from "axios";
import {base_url} from "./APIBase";

export default class TransactionSingle {
    static async purchaseById(purchaseId) {
        const response = await axios.post(
            `${base_url}/transactions/purchase/id`,
            {
                id: purchaseId
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data
    }
}