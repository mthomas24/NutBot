import { CommandInteraction, MessageEmbed } from "discord.js";
import { Command, GlobalData } from "../types";
import { getGuildData } from "../utils";

const command: Command = {
	name: "settings",
	type: "general",
	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		let gData = await getGuildData(interaction.guildId);

		let embed = new MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Nutbot Server Settings")
			.addField("Daily meme channel", gData.memeChannel ? `<#${gData.memeChannel}>` : "Not set")
			.setFooter({ text: "More Nutbot settings coming soon." });

		await interaction.reply({ embeds: [embed] });
	}
}

export default command;