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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const start = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('start')
        .setDescription('테스트 입니다.'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId('red')
                .setLabel('레드팀')
                .setStyle(discord_js_1.ButtonStyle.Danger), new discord_js_1.ButtonBuilder()
                .setCustomId('blue')
                .setLabel('블루팀')
                .setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
                .setCustomId('done')
                .setLabel('완료')
                .setStyle(discord_js_1.ButtonStyle.Success));
            yield interaction.reply({ content: '참가할 팀을 선택하세요', components: [row] });
        });
    }
};
exports.default = start;
