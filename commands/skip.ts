import { CommandInteraction } from "discord.js";
import { GlobalData } from "../types";

export default {
	name: "skip",
	type: "music",

	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		let q = data.musicPlayer.getQueue(interaction.guild);
		let member = interaction.guild.members.cache.get(interaction.user.id);

		if (!interaction.inGuild() || !member.voice || !q)
			return interaction.reply("No worky papa");

		let num = interaction.options.getInteger("position");
		if (!num || num < 1 || num > q.tracks.length) q.skip();
		else {
			console.log("What the hell");
			q.skipTo(num - 1);
		}

		// q.play();

		// console.log(q.nowPlaying());
		await interaction.reply("Skipped");
	}
};
