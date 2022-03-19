import { CommandInteraction, Permissions, MessageEmbed } from "discord.js";
import { Command } from "../types";
import { interactionHasPerms } from "../utils";

const command: Command = {
	name: "purge",
	type: "admin",

	execute: async (interaction, data) => {
		if (!interaction.inGuild()) return interaction.reply("You can't purge a dm");
		if (!interactionHasPerms(interaction, Permissions.FLAGS.MANAGE_MESSAGES))
			return interaction.reply(
				"You must have the manage message permission to mass delete. smh"
			);

		let amount = interaction.options.getInteger("amount") || 1;
		if (amount > 1000) amount = 1000; // since max value doesnt work for slash commands :/
		interaction.channel.bulkDelete(amount, true).then(messages =>
			interaction
				.reply({
					embeds: [
						new MessageEmbed()
							.setColor(`#${data.config.color}`)
							.setTitle("Mass delete success")
							.setDescription(`${messages.size} messages were deleted.`)
							.setFooter({ text: "This message will delete itself." })
					],
					fetchReply: true
				})
				.then((msg: any) => setTimeout(() => msg.delete(), 5000))
		);
	}
};

export default command;