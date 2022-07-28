require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

const commands : string[] = []
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const command : any = require(filePath)
    commands.push(command.data.toJSON())
}

const rest : REST = new REST({ version : '10' }).setToken(process.env.TOKEN ? process.env.TOKEN : '')
if(process.env.CLIENT_ID && process.env.GUILD_ID) {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                                            { body : commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch((error : any) => console.error('Error: ', error))
} else {
    console.error('Missing the Client Id or Guild Id environment variable')
}