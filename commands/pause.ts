import { CommandInteraction, MessageEmbed } from "discord.js";
import { Player } from "discord-player";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "pause",
	type: "music",
	execute: (interaction: CommandInteraction, data: GlobalData) => {
		if (!interaction.guild) return interaction.reply("What u doin papa");

		let q = data.musicPlayer.getQueue(interaction.guild);
		if (!q)
			return interaction.reply(
				"There is no active queue. Use `/play` to start one."
			);

		q.setPaused(true);

		interaction.reply(
			"Paused the queue. To resume, use `/play` with no song option."
		);
	}
};

export default command;