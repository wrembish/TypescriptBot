import { Message } from "discord.js"

module.exports = {
    name : 'messageCreate',
    async execute(message : Message) : Promise<void> {
        if(message.client.user && message.author.id === message.client.user.id) return

        const content : string = message.content

        if(content == 'ping') {
            await message.channel.send('Pong!')
        }
    },
}