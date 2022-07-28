import { SlashCommandBuilder } from '@discordjs/builders'
import { ModalSubmitInteraction } from 'discord.js'

/**
 * @description Example slash command of getting different information about the command user
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(interaction : ModalSubmitInteraction) : Promise<void> {
        if(interaction.user) {
            await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
        }
    },
}