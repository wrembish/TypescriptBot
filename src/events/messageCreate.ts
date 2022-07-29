import { Collection, Message } from "discord.js"
import Command from "../classes/Command"
import sfAuth from "../classes/sfAuth"
import Event__c from "../classes/Event__c"

export const event : Event__c = new Event__c (
    'messageCreate',
    false,
    async (message : Message, commands : Collection<string, Command>, _sf : sfAuth) : Promise<void> => {
        if(message.client.user && message.author.id === message.client.user.id) return

        const content : string = message.content

        if(content == 'ping' && commands.size > 0) {
            await message.channel.send('Pong!')
        } else if(content == 'list slash') {
            let reply : string = ''
            commands.each((command) : void => { reply += `/${command.data.name} : ${command.data.description}\n` })
            await message.channel.send(reply)
        }
    }
)