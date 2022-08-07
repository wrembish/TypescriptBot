import { Interaction } from 'discord.js'
import { COMMANDS } from '../index'
import Command from '../classes/Command'
import Event__c from '../classes/Event__c'

export const event : Event__c = new Event__c(
    'interactionCreate',
    false,
    async (interaction : Interaction) : Promise<void> => {
        if((interaction.type !== 2)) return
        

        const command : Command | undefined = COMMANDS.get(interaction.commandName)

        if(command) {
            try {
                await command.execute(interaction)
            } catch(error : any) {
                console.error('Error: ', error)
                await interaction.reply({ content : 'There was an error while executing this command!', ephemeral : true })
            }
        }
    }
)