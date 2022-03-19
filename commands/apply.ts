import { MessageEmbed } from "discord.js";
import { Command } from "../types";

const command: Command = {
	name: "apply",
	execute: async (interaction, data) => {
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(`#${data.config.color}`)
					.setTitle("Becoming a mod 💪")
					.setDescription(
						"Use this link to fill out a form to apply for the moderation team. We would love to see you join the team and help moderate this server.\n\nhttps://forms.gle/imLf2rKj35JRQZzn8\n\n*We will Message you on Discord via Private Message more details after your application*"
					)
					.setImage("https://i.imgur.com/h9mboF3.png")
			]
		});
	}
};

export default command;