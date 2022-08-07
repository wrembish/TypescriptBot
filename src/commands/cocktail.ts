import { ColorResolvable, EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'cocktail',
    'Get a random cocktail recipe',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const EMBEDCOLOR : ColorResolvable = 'LuminousVividPink'
        let result : any
        await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then((response : Response) : any => response.json())
            .then((data : any) : void => { result = data })
            .catch((error : any) : void => { console.error('Error: ', error) })

        if(!result.drinks || result.drinks.length == 0) {
            await interaction.reply('I\'m sorry, something must have gone wrong')
            console.error('Error: ', result)
            return
        }
        const drink : any = result.drinks[0]
        const replyContent : string = `**${interaction.user} Why not give this drink a try?**`
        let embedDescription : string = '**__Ingredients List__**\n'
        for(let i : number = 0; i < 15; ++i) {
            if(drink[`strIngredient${i+1}`] != null) {
                embedDescription += drink[`strIngredient${i+1}`]
                if(drink[`strMeasure${i+1}`] != null) embedDescription += ` : ${drink[`strMeasure${i+1}`]}\n`
                else embedDescription += '\n'
            } else break
        }
        embedDescription += `\n**__Instructions__**\n${drink.strInstructions}`
        const replyEmbed : EmbedBuilder = new EmbedBuilder()
            .setTitle(`**${drink.strDrink}**`)
            .setImage(drink.strDrinkThumb)
            .setColor(EMBEDCOLOR)
            .setDescription(embedDescription)
        await interaction.reply({ content : replyContent , embeds : [replyEmbed] })
    }
)