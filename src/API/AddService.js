import axios from "axios";
import {base_url} from "./APIBase";

export default class AddService {

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
}