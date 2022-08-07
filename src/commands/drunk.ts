import { ColorResolvable, EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { AnimeImage } from '../classes/AnimeImage'
import Command from '../classes/Command'

export const command : Command = new Command(
    'drunk',
    'Are you drunk and want everyone to know it? Let them know with a drunk anime gif!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const EMBEDCOLOR : ColorResolvable = 'LuminousVividPink'
        const animeAPI : AnimeImage = new AnimeImage()
        await animeAPI.get('DRUNK')
        const replyContent : string = `${interaction.user}`
        const replyEmbed : EmbedBuilder = new EmbedBuilder().setImage(animeAPI.image_url).setColor(EMBEDCOLOR)
        await interaction.reply({ content : replyContent , embeds : [replyEmbed] })
        
    }
)