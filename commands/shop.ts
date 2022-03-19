import { MessageEmbed, MessageSelectMenu, MessageActionRow, CommandInteraction } from "discord.js";
import { randElem, coinEmoji } from "../utils";
import items from "../shopItems";
import { Command, GlobalData } from "../types";

const command: Command = {
  name: "shop",
	
  execute: async (interaction: CommandInteraction, data: GlobalData) => {
    const itemStr = item =>
      `${item.name} — ${!item.owned(member) ? `${item.price}${coinEmoji}` : "owned ✅"}`;

    let member = interaction.guild.members.cache.get(interaction.user.id);

    let embed = new MessageEmbed()
      .setColor(`#${data.config.color}`)
      .setThumbnail(
        "https://media.discordapp.net/attachments/820732860142190613/928707140552654868/xp_coin_nutt.png?width=630&height=630"
      )
      .setTitle(
        randElem([
          "Nut n' Shop",
          "Nut Shop",
          "Nutmart",
          "You Nut In It, You Buy It",
          "Nut Cream Now 50% Off",
          "Ye Olde Scratch n' Sniff",
          "Nut's Totally Not Overpriced Shop"
        ])
      )
      .addField(
        "Server Stuff",
        items
          .filter(i => i.cat === "server")
          .map(itemStr)
          .join("\n")
      )
      .addField(
        "Other",
        items
          .filter(i => !i.cat)
          .map(itemStr)
          .join("\n")
      );
    // .setDescription(
    // 	items
    // 		.map(
    // 			i =>
    // 				`${i.name} — ${
    // 					!i.owned ? `${i.price}${coinEmoji}` : "owned ✅"
    // 				}`
    // 		)
    // 		.join("\n")
    // );

    let select = new MessageSelectMenu()
      .setCustomId("buySelect")
      .setPlaceholder("Select an item to buy")
      .addOptions(
        items
          .filter(i => !i.owned(member))
          .map(i => ({ label: i.name, description: i.desc, value: i.id }))
      );

    await interaction.reply({
      embeds: [embed],
      components: [new MessageActionRow().addComponents(select)]
    });
  }
};

export default command;