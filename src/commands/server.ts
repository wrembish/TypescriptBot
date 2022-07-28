import { SlashCommandBuilder } from '@discordjs/builders'
import { ModalSubmitInteraction } from "discord.js"

/**
 * @description Example slash command of getting different information about a server
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(interaction : ModalSubmitInteraction) : Promise<void> {
        if(interaction.guild) await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
    },
}