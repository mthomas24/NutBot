import { Player, QueueRepeatMode } from "discord-player";
import { CommandInteraction } from "discord.js";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "loop",

	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		let q = data.musicPlayer.getQueue(interaction.guild);
		if (!q) return interaction.reply("No active queue");
		let member = interaction.guild.members.cache.get(interaction.user.id);
		if (!member?.voice?.channel || member.voice.channelId !== q.connection.channel.id)
			return interaction.reply("You must be in my voice channel");

		if (q.repeatMode !== QueueRepeatMode.TRACK) {
			q.setRepeatMode(QueueRepeatMode.TRACK);
			return interaction.reply("Looping is now **ON**");
		}

		q.setRepeatMode(QueueRepeatMode.QUEUE);
		interaction.reply("Looping is now **OFF**");
	}
};

export default command;