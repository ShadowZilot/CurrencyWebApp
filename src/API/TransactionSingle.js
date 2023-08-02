import axios from "axios";
import {base_url} from "./APIBase";

export default class TransactionSingle {
    static async rubleById(rubleId) {
        const response = await axios.post(
            `${base_url}/transactions/ruble`,
            {
                id: rubleId
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data
    }

    static async saleById(saleId) {
        const response = await axios.post(
            `${base_url}/transactions/sale/id`,
            {
                id: saleId
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
        return response.data
    }

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

    static async mixingById(mixingId) {
        const response = await axios.post(
            `${base_url}/transactions/mixing/id`,
            {
                id: mixingId
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