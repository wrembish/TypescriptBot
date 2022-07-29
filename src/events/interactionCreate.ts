import { Collection, Interaction } from "discord.js"
import Command from "../classes/Command"
import Event__c from "../classes/Event__c"

export const event : Event__c = new Event__c(
    'interactionCreate',
    false,
    async (interaction : Interaction, commands : Collection<string, Command>) : Promise<void> => {
        if((interaction.type !== 2)) return
        

        const command : Command | undefined = commands.get(interaction.commandName)

        if(command) {
            try {
                await command.execute(interaction)
            } catch(error : any) {
                await interaction.reply({ content : 'There was an error while executing this command!', ephemeral : true })
            }
        }
    }
)