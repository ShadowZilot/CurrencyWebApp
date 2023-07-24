import axios from "axios";
import {base_url} from "./APIBase";

export default class EditTransaction {
    static async deleteDeal(dealId, dealType) {
        await axios.post(
            `${base_url}/transactions/delete`,
            {
                id: dealId,
                deal_type: dealType
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }

    static async isCanEdit(transactionTime) {
        return (await axios.post(
            `${base_url}/transactions/edit/check`,
            {
                transaction_time: transactionTime
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )).data
    }

    static async editSale(sale) {
        await axios.post(
            `${base_url}/transactions/sales/edit`,
            sale,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }

    static async editPurchase(purchase) {
        await axios.post(
            `${base_url}/transactions/purchases/edit`,
            purchase,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }

    static async editMixing(mixing) {
        await axios.post(
            `${base_url}/transactions/mixing/edit`,
            mixing,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }
}