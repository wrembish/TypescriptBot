import { ModalSubmitInteraction } from "discord.js"
import Command from '../classes/Command'

export const command : Command = new Command(
    'server', 
    'Replies with server infor!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        if(interaction.guild) {
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
        }
    }
)