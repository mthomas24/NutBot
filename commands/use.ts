import { CommandInteraction } from "discord.js";
// import * as mongoose from "mongoose";
import { getUserData } from "../utils";
import Fuse from "fuse.js";
import shopItems from "../shopItems";
import { Command } from "../types";

const command: Command = {
	name: "use",

	execute: async (interaction: CommandInteraction, data) => {
		
		let u = await getUserData(interaction.user.id);
		const fuse = new Fuse(shopItems, { keys: ["name"] });
		let result = fuse.search(interaction.options.getString("item"))[0];

		if (!result)
			return interaction.reply({ content: "Item not found", ephemeral: true });

		let item = result.item;
		
		if (!u.inventory[item.id])
			return interaction.reply({
				content: "You don't have that item",
				ephemeral: true
			});

		if (!item.onUse)
			return interaction.reply({ content: "Item is not usable", ephemeral: true });

		if (item.consumable) {
			u.inventory[item.id] -= 1;
			u.save();
		}
		await item.onUse(interaction, data);
	}
};

export default command;