import { ColorResolvable, EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { AnimeImage } from '../classes/AnimeImage'
import Command from '../classes/Command'

export const command : Command = new Command(
    'steal',
    'Flex you stealing abilities with a stealing anime gif!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const EMBEDCOLOR : ColorResolvable = 'LuminousVividPink'
        const animeAPI : AnimeImage = new AnimeImage()
        await animeAPI.get('STEAL')
        const replyContent : string = `${interaction.user}`
        const replyEmbed : EmbedBuilder = new EmbedBuilder().setImage(animeAPI.image_url).setColor(EMBEDCOLOR)
        await interaction.reply({ content : replyContent , embeds : [replyEmbed] })
        
    }
)