import { CommandInteraction, Permissions, MessageEmbed } from "discord.js";
import { Command, GlobalData } from "../types";
import { interactionHasPerms } from "../utils";

const command: Command = {
	name: "kick",
	type: "admin",
	
	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		if (!interactionHasPerms(interaction, Permissions.FLAGS.KICK_MEMBERS))
			return await interaction.reply("You don't have that permission");
		
		let reason = interaction.options.getString("reason");
		let target = interaction.options.getUser("target");
		let embed = new MessageEmbed().setColor(`#${data.config.color}`);
		if (reason) embed.addField("Reason", reason);

		if (target.id == interaction.user.id)
			return await interaction.reply(
				"lmao I just stopped you from kicking yourself"
			);

		// console.log(interaction.guild);
		interaction.guild.members.kick(target, reason).then(async (user: any) => {
			// console.log(user);
			if (typeof user === "string")
				user = interaction.client.users.cache.get(user);
			await interaction.reply({
				embeds: [embed.setTitle(`Kicked ${user.tag}`)]
			});
		});
	}
};

export default command;
