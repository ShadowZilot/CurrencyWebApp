import axios from "axios";
import {base_url} from "./APIBase";

export default class AddService {
    static async addMixingDeal(mixingObj) {
        await axios.post(
            `${base_url}/mixing/add`,
            mixingObj,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }

    static async addPurchaseDeal(purchaseObj) {
        await axios.post(
            `${base_url}/transactions/buy`,
            purchaseObj,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }

    static async addSaleDeal(saleObj) {
        await axios.post(
            `${base_url}/transactions/sell`,
            saleObj,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }

    static async addRubleTransaction(rubleObj) {
        await axios.post(
            `${base_url}/transaction/add/ruble`,
            rubleObj,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }
        )
    }
}