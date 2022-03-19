import { MessageEmbed, CommandInteraction } from "discord.js";
import { Command } from "../types";
// import * as mongoose from "mongoose";
// import { UserModel } from "../models/User";
import { getUserData } from "../utils";

const command: Command = {
	name: "stats",

	execute: async (interaction, data) => {
		let u = await getUserData(interaction.user.id);

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`Stats for ${interaction.user.username}`)
					.setColor(`#${data.config.color}`)
					.addField("Coins :coin:", u.coins.toString())
			]
		});
	}
};

export default command;