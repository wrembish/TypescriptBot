import { salesforce } from '../index'

export default class Markov {
    public static async addToMap(str : string, userId : string) : Promise<void> {
        await salesforce.checkAuth()
        const body : any = {
            'message'   : str,
            'UserId'    : userId
        }
        await salesforce.doPost('services/apexrest/InsertMessage', body)
    }
}