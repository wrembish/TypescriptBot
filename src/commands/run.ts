import { ColorResolvable, EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { AnimeImage } from '../classes/AnimeImage'
import Command from '../classes/Command'

export const command : Command = new Command(
    'run',
    'Somebody say something completely out of pocket? Need to get away? Try a running anime gif TODAY!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const EMBEDCOLOR : ColorResolvable = 'LuminousVividPink'
        const animeAPI : AnimeImage = new AnimeImage()
        await animeAPI.get('RUN')
        const replyContent : string = `${interaction.user}`
        const replyEmbed : EmbedBuilder = new EmbedBuilder().setImage(animeAPI.image_url).setColor(EMBEDCOLOR)
        await interaction.reply({ content : replyContent , embeds : [replyEmbed] })
        
    }
)