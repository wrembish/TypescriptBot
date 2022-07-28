import { Collection, Interaction } from "discord.js"

module.exports = {
    name : 'interactionCreate',
    async execute(interaction : Interaction, commands : Collection<string, any>) : Promise<void> {
        if((interaction.type !== 2)) return

        const command : any = commands.get(interaction.commandName)
    
        if(!command) return

        try {
            await command.execute(interaction)
        } catch(error) {
            await interaction.reply({ content : 'There was an error while executing this command!', ephemeral : true })
        }
    },
}