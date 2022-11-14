import { SlashCommandBuilder } from "discord.js"

declare type Command = {
  data: SlashCommandBuilder,
  execute: Function
}