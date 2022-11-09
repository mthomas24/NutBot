import * as dotenv from "dotenv";
dotenv.config();

import * as Discord from "discord.js";
const IntentFlags = Discord.Intents.FLAGS;
import * as config from "./config.json";
import * as mongoose from "mongoose";
import * as fs from "fs";
import { randElem, fetchCardInfo, getUserData, coinEmoji, toMS, getProperty } from "./utils";
import { Player } from "discord-player";
import shopItems from "./shopItems";
// import { UserModel } from "./models/User";
import { Command, GlobalData } from "./types";
import { join } from "path";


const client = new Discord.Client({
  intents: [
    IntentFlags.GUILDS,
    IntentFlags.GUILD_VOICE_STATES,
    IntentFlags.GUILD_VOICE_STATES
  ]
});
mongoose.connect("mongodb://localhost/nutbot", () => console.log("Connected to db"));

const dev = process.env.NODE_ENV !== "production";

let globalData: GlobalData = {
  cards: [],
  config: config,
  musicPlayer: new Player(client),
  cooldowns: {
    nut: new Set()
  },
	commands: new Map(),
	cardCommands: new Map(),
	dev
};
fetchCardInfo().then(data => {
	globalData.cards = data;
	// console.table(data);
});

// require("./deploy-cmds");
import { deployCommands } from "./deploy-cmds";
import { Inventory } from "./models/User";
deployCommands();
if (dev) console.log("In dev mode");

// Load commands
fs.readdirSync(join(__dirname, "commands"))
  .filter(str => str.endsWith(dev ? ".ts" : ".js"))
  .forEach(async file => {
    const cmd: Command = (await import(`./commands/${file}`)).default;
		globalData.commands.set(cmd.name, cmd);
  });
// setTimeout(() => console.table(globalData.commands.values()), 100)
// Card commands
fs.readdirSync(join(__dirname, "commands/cards"))
  .filter(str => str.endsWith(dev ? ".ts" : ".js"))
  .forEach(async file => {
    const cmd: Command = (await import(`./commands/cards/${file}`)).default;
    globalData.cardCommands.set(cmd.name, cmd);
  });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: "With my nuts | /help", type: "PLAYING" }]
  });
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
	if (dev)
		console.log(`${interaction.user.tag} ran /${interaction.commandName}`);
  const cmd = globalData.commands.get(interaction.commandName);
  if (!cmd)
    return await interaction.reply(
      "Hmm... it seems like that command has not been implemented yet."
    );

  try {
    if (cmd.botAdmin && !config.botAdmins.includes(interaction.user.id))
      return interaction.reply("That command is only for the Nutbot owners");
    await cmd.execute(interaction, globalData);
  } catch (e) {
    await interaction.reply(
      "Sorry, there was an error executing that command.\n```" + e.toString() + "```"
    );
    console.error(e);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
  // console.log(interaction);
  switch (interaction.customId) {
    case "nutBtn":
      {
        const cooldowns = globalData.cooldowns.nut;
        if (cooldowns.has(interaction.user.id))
          return interaction.reply({
            content: "You don't have enough energy to nut again so quickly!",
            ephemeral: true
          });
        cooldowns.add(interaction.user.id);
        setTimeout(() => cooldowns.delete(interaction.user.id), toMS(60));
        await interaction.reply(
          `<@${interaction.user.id}> ${randElem(["nutted", "busted a nut"])} ${randElem([
            "🥜 🥜",
            "🙏",
            "😖 😫",
            "💦"
          ])}`
        );
      }
      break;
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isSelectMenu()) return;
  let member = interaction.guild.members.cache.get(interaction.user.id);
  let userData = await getUserData(interaction.user.id);

  if (interaction.customId === "buySelect") {
    const id = interaction.values[0];

    const item = shopItems.find(i => i.id === id);
    if (!item)
      return await interaction.reply(
        "Hmm... I couldn't find that item. Resending the shop command might fix this problem."
      );
    if (item.owned(member))
      return await interaction.reply({
        content: `<@${interaction.user.id}>, you already own this item!`,
        ephemeral: true
      });
    if (userData.coins < item.price)
      return await interaction.reply({
        content: `<@${interaction.user.id}>, you don't have enough coins for this item!`,
        ephemeral: true
      });

    userData.coins -= item.price;
    await userData.save();
    if (item.nonStorable) {
      try {
        item.onBuy(interaction, member);
      } catch (e) {
        return await interaction.reply(
          "Whoops... there was an error purchasing that item\n```" +
            e.toString() +
            "```\nAsk one of the mods for a refund if you did not receive the item"
        );
      }
    } else {
			let itemID: keyof Inventory;
			switch (item.id) {
				case "golden_nut":
					itemID = "golden_nut";
					break;
				case "nut_potion":
					itemID = "nut_potion";
					break;
				default:
					return interaction.reply("That item doesn't exist or something. Idrk what happened, but u just lost ur money and got nothing LMAO.");
			}
			console.log(item.id, itemID);
      userData.inventory[itemID] += 1;
			console.log(userData.inventory);
			await userData.save();
    }
    await interaction.reply(
      `<@${interaction.user.id}> purchased ${item.name} for ${item.price}${coinEmoji}`
    );
  }
});

// globalData.musicPlayer.on("botDisconnect", queue => {
// 	console.log("disconnected from vc");
// 	queue.clear();
// 	queue.destroy();
// });

globalData.musicPlayer.on("error", (q, err) => {
  console.error(err);
});

globalData.musicPlayer.on("connectionError", (q, err) => {
  console.error(err);
});

// globalData.musicPlayer.on("trackStart", (q, song) => {
// 	q.metadata.channel.send(
// 		new Discord.MessageEmbed()
// 			.setColor(globalData.config.color)
// 			.setTitle("Now playing")
// 			.setDescription(`[${song.title}](${song.url}) by ${song.author}`)
// 			.setThumbnail(song.thumbnail)
// 	);
// });

client.login(process.env.TOKEN);
