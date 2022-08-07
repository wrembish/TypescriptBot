import { Collection, Message, User } from 'discord.js'
import Command from '../classes/Command'
import Event__c from '../classes/Event__c'
import Markov from '../classes/Markov'
import { COMMANDS } from '../index'
import MessageCommand from '../classes/MessageCommands'

const COMMANDCHAR : string = './'

export const event : Event__c = new Event__c (
    'messageCreate',
    false,
    async (message : Message) : Promise<void> => {
        if(message.client.user && message.author.id === message.client.user.id) return
        
        const { salesforce } = require('../index.ts')
        const content : string = message.content
        const userMentions : Collection<string, User> = message.mentions.users
        // const roleMentions : Collection<string, Role> = message.mentions.roles
        // const repliedUser : User | null = message.mentions.repliedUser

        if(content == 'ping') {
            await message.channel.send('Pong!')
        } else if(content == 'list slash' && COMMANDS.size > 0) {
            let reply : string = ''
            COMMANDS.each((command : Command) : void => { reply += `/${command.data.name} : ${command.data.description}\n` })
            await message.channel.send(reply)
        } else if(content == `${COMMANDCHAR}test`) {
            console.log('wat')
        } else if(userMentions.size > 0) {
            userMentions.each(async (value : User) : Promise<any> => {
                if(message.client.user) {
                    const response : any = await MessageCommand.CheckAnime(
                        content, 
                        message.author.username,
                        message.client.user.username,
                        value.username
                    )
                    if(response) await message.channel.send(response)
                }
            })
        } else {
            let response : any = await MessageCommand.CheckBudget(content, message.author)
            if(response) { await message.channel.send(response); return }
            response = await MessageCommand.checkGamble(content, message.author)
            if(response && typeof response == 'string') { await message.channel.send(response); return }
            else if(response) { response.forEach(async (msg : string) : Promise<void> => { await message.channel.send(msg) }) }

            if(!message.author.bot && content.split(' ').length >= 3) {
                await salesforce.checkAuth()
                const userExists : any = await salesforce.query(`SELECT+Id+from+UserId__c+WHERE+Name='${message.author.id}'`)
                if(userExists && userExists.totalSize < 1) {
                    const body : any = {
                        'Name'              : message.author.id,
                        'Mean_Words__c'     : 0,
                        'Median_words__c'   : 0,
                        'Mode_Words__c'     : 0
                    }
                    await salesforce.insert('UserId__c', body)
                    console.log('did it work')
                }
                await Markov.addToMap(content, message.author.id)
            }
        }
    }
)