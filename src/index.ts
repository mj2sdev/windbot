import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, GatewayIntentBits, Interaction } from "discord.js";
import config from '../config.json';

const client = new Client({ intents: GatewayIntentBits.Guilds });

client.once('ready', (client: Client) => console.log(`${client.user?.username}봇이 준비되었어요.`));

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const buttons = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('RED')
        .setLabel('1팀')
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('BLUE')
        .setLabel('2팀')
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('DONE')
        .setLabel('시작')
        .setStyle(ButtonStyle.Success)
    )
  
  const content = '팀을 선택하세요';

  await interaction.reply({ content, components: [buttons] });
})

const blue = new Map();
const red  = new Map();

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isButton()) return;

  blue.delete(interaction.user.id);
  red.delete(interaction.user.id);

  const team = interaction.customId === 'RED' ? red : blue;

  team.set(interaction.user.id, interaction.user);
 
  const team_red = new EmbedBuilder()
    .setTitle('1팀')
    .setColor(0xe54344)
   

  const team_blue = new EmbedBuilder()
    .setTitle('2팀')  
    .setColor(0x5461e7)
    

  let users = blue[Symbol.iterator]();

  let blue_team_list = `👥`;
  for (const user of users) {
    blue_team_list += `\n${user[1]}`;
  }

  team_blue.setDescription(blue_team_list);

  users = red[Symbol.iterator]();

  let red_team_list = `👥`;
  for (const user of users) {
    red_team_list += `\n${user[1]}`
  }
  team_red.setDescription(red_team_list);

  interaction.message.edit({ embeds: [team_red, team_blue] });

  interaction.deferUpdate();
})

client.login(config.token);