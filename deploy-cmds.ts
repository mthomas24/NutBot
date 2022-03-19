import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as config from "./config.json";
import * as descriptions from "./descriptions.json";
// console.log(config, descriptions)

export function deployCommands() {
  // https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script
  let commands = [
    new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
    new SlashCommandBuilder()
      .setName("help")
      .addStringOption(opt =>
        opt
          .setName("category")
          .setDescription("Help menu category")
          .addChoice("commands", "commands")
          .addChoice("squeanut", "squeanut")
          .addChoice("admin", "admin")
          .addChoice("music", "music")
      ),
    new SlashCommandBuilder()
      .setName("8ball")
      .addStringOption(opt =>
        opt.setName("question").setDescription("The question").setRequired(true)
      ),
    new SlashCommandBuilder().setName("squeanut").addSubcommand(sub =>
      sub
        .setName("index")
        .setDescription("A list of all the available nutty cards")
        .addStringOption(opt =>
          opt
            .setName("card")
            .setDescription("Information about all the nutty cards")
            .setRequired(false)
        )
    ),
    new SlashCommandBuilder()
      .setName("play")
      .addStringOption(opt =>
        opt.setName("song").setDescription("Song name or URL").setRequired(false)
      ),
    new SlashCommandBuilder().setName("nut"),
    new SlashCommandBuilder().setName("purge").addIntegerOption(opt =>
      opt
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true)
        .setMinValue(1) // this does nothing apparently
        .setMaxValue(1000)
    ),
    new SlashCommandBuilder().setName("rage"),
    new SlashCommandBuilder().setName("apply"),
    new SlashCommandBuilder()
      .setName("kick")
      .addUserOption(opt =>
        opt.setName("target").setDescription("User to kick").setRequired(true)
      )
      .addStringOption(opt =>
        opt
          .setName("reason")
          .setDescription("Reason for kicking this user")
          .setRequired(false)
      ),
    new SlashCommandBuilder().setName("stats"),
    new SlashCommandBuilder().setName("shop"),
    new SlashCommandBuilder()
      .setName("setcoins")
      .addUserOption(opt =>
        opt.setName("user").setDescription("User to set coins of").setRequired(true)
      )
      .addIntegerOption(opt =>
        opt.setName("amount").setDescription("Amount of coins").setRequired(true)
      ),
    new SlashCommandBuilder().setName("queue"),
    new SlashCommandBuilder().setName("pause"),
    new SlashCommandBuilder()
      .setName("skip")
      .addIntegerOption(opt =>
        opt.setName("position").setDescription("The song number to skip to")
      ),
    new SlashCommandBuilder().setName("inventory"),
    new SlashCommandBuilder()
      .setName("use")
      .addStringOption(opt =>
        opt
          .setName("item")
          .setDescription("The name of the item to use")
          .setRequired(true)
      ),
    new SlashCommandBuilder().setName("loop"),
    new SlashCommandBuilder().setName("settings")
  ].map(command => command.setDescription(`${descriptions[command.name]}`).toJSON());

  // console.table(commands);

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

  rest
    .put(Routes.applicationGuildCommands(config.clientID, config.nutGuild), {
      body: commands
    })
    .then(() =>
      console.log(
        `Successfully registered application commands for guild ${config.nutGuild}.`
      )
    )
    .catch(console.error);
}
