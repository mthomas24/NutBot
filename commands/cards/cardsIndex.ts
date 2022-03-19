import { CommandInteraction, MessageEmbed } from "discord.js";
import Fuse from "fuse.js";
import { Command, GlobalData } from "../../types";

const command: Command = {
	name: "index",
	type: "squeanut",

	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		let query = interaction.options.getString("card");

		if (!query)
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(`#${data.config.color}`)
						.setTitle("Squeanut Cards Shop")
						.setDescription(
							data.cards
								.map(card => `${card.Name} — ${card.Coins} Coins`)
								.join("\n")
						)
						.setFooter({
							text: "To learn more about a card, use /squeanut index <name>"
						})
				]
			});

		const fuse = new Fuse(data.cards, { keys: ["Name"] });
		let results = fuse.search(query);
		if (!results.length)
			return await interaction.reply(
				`Hmm... I couldn't find any info about "${query}"`
			);

		let c = results[0].item;

		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(`#${c.Color}`)
					.setTitle(c.Name)
					.setImage(c.Art)
					.setDescription(c.Description)
					.addFields(
						...["ATK", "DEF", "Total", "Level", "Coins"].map(prop => ({
							name: prop,
							value: c[prop],
							inline: true
						}))
					)
			]
		});
	}
};

export default command;