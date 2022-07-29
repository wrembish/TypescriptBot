import { Client } from "discord.js"
import Event__c from "../classes/Event__c"

export const event : Event__c = new Event__c(
    'ready',
    true,
    (client : Client) : void => {
        if(client.user) {
            console.log(`Ready! Logged in as ${client.user.tag}`)
        } else {
            console.error('Something went wrong')
        }
    }
)