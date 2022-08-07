import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'gamble',
    'Try your luck!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const winningNum : number = Math.floor(Math.random() * 20)
        if(Math.floor(Math.random() * 20) == winningNum) {
            await interaction.reply(`**Congratulations ${interaction.user}! You won!!**`)
        } else {
            await interaction.reply('**Sorry :( Better luck next time**')
        }
    }
)