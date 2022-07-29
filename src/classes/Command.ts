import { SlashCommandBuilder } from "discord.js";

export default class Command {
    public data : SlashCommandBuilder
    public execute : Function

    constructor(name : string, description : string, execute : Function) {
        this.data = new SlashCommandBuilder().setName(name).setDescription(description)
        this.execute = execute
    }
}