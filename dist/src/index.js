"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const config_json_1 = require("../config.json");
const client = new discord_js_1.Client({ intents: discord_js_1.GatewayIntentBits.Guilds });
const commands = new discord_js_1.Collection();
const commandsPath = node_path_1.default.join(__dirname, 'commands');
const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
// commands폴더의 명령어 로딩
for (const file of commandFiles) {
    const filePath = node_path_1.default.join(commandsPath, file);
    const command = require(filePath).default;
    if (!command.data || !command.execute) {
        console.log(`[경고] ${filePath} 에서 data 또는 execute속성을 찾을 수 없습니다.`);
        continue;
    }
    commands.set(command.data.name, command);
}
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    const command = commands.get(interaction.commandName);
    if (!command) {
        return console.error(`[${interaction.commandName}] 명령어를 찾을 수 없음`);
    }
    try {
        yield command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        yield interaction.reply({ content: `명령어 실행 중 오류가 발생했어요` });
    }
}));
// 명령어 등록 부분
const rest = new discord_js_1.REST({ version: '10' }).setToken(config_json_1.token);
rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.clientId, config_json_1.guildId), {
    body: commands.map((command) => command.data.toJSON())
});
client.once('ready', (client) => { var _a; return console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.username}봇이 준비되었어요.`); });
client.login(config_json_1.token);
