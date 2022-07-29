import { Collection, Message } from "discord.js"
import sfAuth from "src/classes/sfAuth"

module.exports = {
    name : 'messageCreate',
    async execute(message : Message, commands : Collection<string, any>, _sf : sfAuth) : Promise<void> {
        if(message.client.user && message.author.id === message.client.user.id) return

        const content : string = message.content

        if(content == 'ping') {
            await message.channel.send('Pong!')
        }

        if(content == 'list slash') {
            let reply : string = ''
            commands.each((_value : any, key : string) : void => { reply += '/' + key + '\n' })
            await message.channel.send(reply)
        }
    },
}