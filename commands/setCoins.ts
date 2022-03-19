import { CommandInteraction } from "discord.js";
import { Command } from "../types";
import { getUserData, coinEmoji } from "../utils";

const command: Command = {
	name: "setcoins",
	botAdmin: true,
	hidden: true,
	
	execute: async (interaction, data) => {
		let amount = interaction.options.getInteger("amount");
		let target = interaction.options.getUser("user");
		let u = await getUserData(target.id);
		u.coins = amount;
		await u.save();
		await interaction.reply({
			content: `${target.tag} now has ${amount}${coinEmoji}`,
			ephemeral: true
		});
	}
};

export default command;