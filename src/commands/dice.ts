import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const dice: Command = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('dice'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('dice');
  }
}

export default dice;