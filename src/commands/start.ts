import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const start: Command = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('테스트 입니다.'),
  
  async execute(interaction: ChatInputCommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('red')
        .setLabel('레드팀')
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('blue')
        .setLabel('블루팀')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('done')
        .setLabel('완료')
        .setStyle(ButtonStyle.Success)
    )

    await interaction.reply({ content: '참가할 팀을 선택하세요', components: [ row ] });
  }
}

export default start;