import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'points',
    'Get your current points you have',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { salesforce } = require('../index.ts')
        await salesforce.checkAuth()
        const userPoints : Number = await salesforce.doPost('services/apexrest/GetPoints', { 'UserID' : interaction.user.id , 'UpdatePoints' : null })
        await interaction.reply(`**${interaction.user}, you currently have _${userPoints}_ points!**`)
    }
)