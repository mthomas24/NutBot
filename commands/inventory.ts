import { CommandInteraction, MessageEmbed } from "discord.js";
import shopItems from "../shopItems";
import { Command, GlobalData } from "../types";
import { getUserData, makePlural, coinEmoji } from "../utils";

const command: Command = {
	name: "inventory",
	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		let inv = (await getUserData(interaction.user.id)).inventory;
		// console.log(inv);
		let totalVal = 0;
		let items = [];
		for (const i of shopItems) {
			if (!inv[i.id]) continue;
			items.push({ name: i.name, value: inv[i.id].toString(), inline: true });
			totalVal += i.price * inv[i.id];
		}

		let embed = new MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle(`${interaction.user.username}'s Inventory`);

		if (items.length) {
			// embed.addFields(...items);
			embed.setDescription(
				items
					.map(
						i => `${i.value} ${i.value !== "1" ? makePlural(i.name) : i.name}`
					)
					.join("\n")
			);
			embed.addField("Total value", `${totalVal} ${coinEmoji}`);
		} else
			embed.setDescription(
				"It seems like you don't have anything in your inventory. Use `/shop` to buy something!"
			);

		interaction.reply({
			embeds: [embed]
		});
	}
};

export default command;