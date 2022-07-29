require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import sfAuth from './classes/sfAuth'
import Command from './classes/Command'
import Event__c from './classes/Event__c'

// Create the client instance
const client : Client = new Client({ intents : [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

// Connect to Salesforce
const sf : sfAuth = new sfAuth()

// Create commands Collection
const commands : Collection<string, Command> = new Collection<string, Command>()
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const command : Command = require(filePath).command
    commands.set(command.data.name, command)
}

// handle events
const eventsPath : fs.PathLike = path.join(__dirname, 'events')
const eventFiles : string[] = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'))

for(const file of eventFiles) {
    const filePath : string = path.join(eventsPath, file)
    const event : Event__c = require(filePath).event
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands, sf))
    }
}

// Login to Discord with the Client Token
client.login(process.env.TOKEN)