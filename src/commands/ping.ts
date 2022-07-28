import { SlashCommandBuilder } from '@discordjs/builders'
import { ModalSubmitInteraction } from "discord.js"

/**
 * @description Generic Slash Command, kind of the "Hello World" of Discord Bots
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction : ModalSubmitInteraction) : Promise<void> {
        await interaction.reply('Pong!')
    },
}