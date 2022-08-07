import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'ping',
    'Replies with Pong!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        await interaction.reply('Pong!')
    }
)