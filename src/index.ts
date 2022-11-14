import { Client, Collection, Events, GatewayIntentBits, Interaction, REST, Routes } from "discord.js";
import path from 'node:path';
import fs from 'node:fs';
import { token, clientId, guildId } from '../config.json';
import { Command } from "./@types";

const client   = new Client({ intents: GatewayIntentBits.Guilds });
const commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js'));

// commands폴더의 명령어 로딩
for (const file of commandFiles){
  const filePath: string = path.join(commandsPath, file);
  const command: Command = require(filePath).default;

  if (!command.data || !command.execute) {
    console.log(`[경고] ${filePath} 에서 data 또는 execute속성을 찾을 수 없습니다.`);
    continue;
  }
  commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command: any = commands.get(interaction.commandName);

  if (!command) {
    return console.error(`[${interaction.commandName}] 명령어를 찾을 수 없음`)
  }

  try { await command.execute(interaction); }
  catch(error){
    console.error(error);
    await interaction.reply({ content: `명령어 실행 중 오류가 발생했어요` })
  }
})









// 명령어 등록 부분
const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {
  body: commands.map((command: any) => command.data.toJSON())
})

client.once('ready', (client: Client) => console.log(`${client.user?.username}봇이 준비되었어요.`));
client.login(token);