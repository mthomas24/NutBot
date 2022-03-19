import { Player } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "queue",
	type: "music",

	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		if (!interaction.guild) return interaction.reply("What you doin bruh");

		const q = data.musicPlayer.getQueue(interaction.guild);
		if (!q)
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(`#${data.config.color}`)
						.setTitle("No Active Queue")
						.setDescription(
							"There is currently no active queue for this server. Use `/play` to start one!"
						)
				]
			});

		const songs = [...q.tracks];
		const curr = q.nowPlaying();

		let embed = new MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Music Queue" + (q.connection.paused ? " (Paused)" : ""))
			.addField("Playing", `[${curr.title}](${curr.url}) — ${curr.duration}`)
			.addField(
				"Queued",
				songs.length
					? songs
							.map(
								(t, i) =>
									`(${i + 1}) [${t.title}](${t.url}) — ${t.duration}`
							)
							.join("\n")
					: "No songs in queue"
			);

		interaction.reply({
			embeds: [embed]
		});
	}
};

export default command;