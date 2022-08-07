import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'createbudget',
    'Start a Budget for you to keep track of your spending!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { salesforce } = require('../index.ts')
        await salesforce.checkAuth()
        const exists : any = await salesforce.query(`SELECT+Id+FROM+Budget__c+WHERE+User_ID__c='${interaction.user.id}'`)
        if(exists.hasOwnProperty('totalSize')) {
            await interaction.reply(`**Hey there ${interaction.user.username}, you already _have_ a budget!**`)
            return
        }
        const body : any = {
            'Name'      : `${interaction.user.username}'s Budget`,
            'User_ID__c'   : `${interaction.user.id}`
        }
        const result : any = await salesforce.insert('Budget__c', body)
        if(result.hasOwnProperty('id')) await interaction.reply(`Successfully created your budget!`)
        else {
            await interaction.reply('I\'m sorry, something went wrong...')
            console.error('Error: ', result)
        }
    }
)