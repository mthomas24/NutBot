import { CommandInteraction, MessageEmbed } from "discord.js";
import { Command, GlobalData } from "../types";

// use https://www.npmjs.com/package/discord-player

const command: Command = {
	name: "play",
	type: "music",

	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		if (!interaction.inGuild())
			return await interaction.reply(
				"Playing music only works in servers man. Idk what ur doing."
			);

		let member = interaction.guild.members.cache.get(interaction.user.id);
		if (!member.voice.channel)
			return await interaction.reply("You gotta join a vc first dawg");

		if (!member.voice.channel.joinable)
			return await interaction.reply(
				"I'm not able to join that channel. Try checking permissions."
			);

		let songParam = interaction.options.getString("song");
		let q = data.musicPlayer.createQueue(interaction.guild, {
			metadata: { channel: interaction.channel }
			// leaveOnEnd: true,
			// leaveOnEmpty: true,
			// leaveOnStop: true
		});
		// await q.setFilters({ nightcore: "yes" });

		if (q.connection && q.connection.channel.id !== member.voice.channel.id)
			return await interaction.reply("You gotta be in the same vc as me dawg");

		if (!songParam) {
			if (q.connection?.paused) {
				q.setPaused(false);
				return interaction.reply("Resumed");
			}
			return interaction.reply("You must specify a song");
		}

		let firstSong = false;

		await interaction.deferReply();

		const song = (
			await data.musicPlayer.search(songParam, {
				requestedBy: interaction.user
			})
		).tracks[0];

		if (!song) return await interaction.editReply("No results found");

		// q.setRepeatMode(QueueRepeatMode.QUEUE); // Makes bot autoplay other songs in queue

		if (!q.connection) {
			await q.connect(member.voice.channel);
			firstSong = true;
		}

		q.addTrack(song);
		if (firstSong || !q.nowPlaying()) await q.play();

		// console.log(q);
		// console.log(q.nowPlaying());

		interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setTitle(firstSong ? "Started Playing" : "Added to Queue")
					.setColor(`#${data.config.color}`)
					.setDescription(
						`${
							firstSong
								? `Now playing in <#${member.voice.channelId}>:`
								: "Song added to queue:"
						} **${song.title}**`
					)
					.setImage(song.thumbnail)
			]
		});
	}
};

export default command;