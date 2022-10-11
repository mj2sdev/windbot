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
const config_json_1 = __importDefault(require("../config.json"));
const client = new discord_js_1.Client({ intents: discord_js_1.GatewayIntentBits.Guilds });
client.once('ready', (client) => { var _a; return console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.username}봇이 준비되었어요.`); });
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    const buttons = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('RED')
        .setLabel('1팀')
        .setStyle(discord_js_1.ButtonStyle.Danger))
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('BLUE')
        .setLabel('2팀')
        .setStyle(discord_js_1.ButtonStyle.Primary))
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('DONE')
        .setLabel('시작')
        .setStyle(discord_js_1.ButtonStyle.Success));
    const content = '팀을 선택하세요';
    yield interaction.reply({ content, components: [buttons] });
}));
const blue = new Map();
const red = new Map();
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton())
        return;
    blue.delete(interaction.user.id);
    red.delete(interaction.user.id);
    const team = interaction.customId === 'RED' ? red : blue;
    team.set(interaction.user.id, interaction.user);
    const team_red = new discord_js_1.EmbedBuilder()
        .setTitle('1팀')
        .setColor(0xe54344);
    const team_blue = new discord_js_1.EmbedBuilder()
        .setTitle('2팀')
        .setColor(0x5461e7);
    let users = blue[Symbol.iterator]();
    let blue_team_list = `👥`;
    for (const user of users) {
        blue_team_list += `\n${user[1]}`;
    }
    team_blue.setDescription(blue_team_list);
    users = red[Symbol.iterator]();
    let red_team_list = `👥`;
    for (const user of users) {
        red_team_list += `\n${user[1]}`;
    }
    team_red.setDescription(red_team_list);
    interaction.message.edit({ embeds: [team_red, team_blue] });
    interaction.deferUpdate();
}));
client.login(config_json_1.default.token);
