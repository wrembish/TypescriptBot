import { ColorResolvable, EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { AnimeImage } from '../classes/AnimeImage'
import Command from '../classes/Command'

export const command : Command = new Command(
    'nomm',
    'Is it dinner time? You just like nom nom nomming? We got you with a nomming anime gif!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const EMBEDCOLOR : ColorResolvable = 'LuminousVividPink'
        const animeAPI : AnimeImage = new AnimeImage()
        await animeAPI.get('NOMM')
        const replyContent : string = `${interaction.user}`
        const replyEmbed : EmbedBuilder = new EmbedBuilder().setImage(animeAPI.image_url).setColor(EMBEDCOLOR)
        await interaction.reply({ content : replyContent , embeds : [replyEmbed] })
        
    }
)