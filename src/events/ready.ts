import { Client } from "discord.js"

module.exports = {
    name : 'ready',
    once : true,
    execute(client : Client) : void {
        if(client.user) {
            console.log(`Ready! Logged in as ${client.user.tag}`)
        } else {
            console.error('Something went wrong')
        }
    },
}