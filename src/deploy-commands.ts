require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10'
import Command from './classes/Command'
import { REST } from 'discord.js'


const commands : RESTPostAPIApplicationCommandsJSONBody[] = []
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const command : Command = require(filePath).command
    commands.push(command.data.toJSON())
}
if(process.env.TOKEN && process.env.CLIENT_ID && process.env.GUILD_ID) {
    const rest : REST = new REST({ version : '10' }).setToken(process.env.TOKEN)

    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                                            { body : commands })
        .then(() : void => console.log('Successfully registered application commands.'))
        .catch((error : any) : void => console.error('Error: ', error))
} else {
    console.error('Missing the Client Id or Guild Id environment variable')
}