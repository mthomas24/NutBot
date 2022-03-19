import { CommandInteraction } from "discord.js";
import { GlobalData } from "../types";

export default {
	name: "squeanut",
	hidden: true,

	execute: (interaction: CommandInteraction, data: GlobalData) => {
		const subcommand = interaction.options.getSubcommand();
		if (data.cardCommands.has(subcommand))
			data.cardCommands.get(subcommand).execute(
				interaction,
				data
			);
		else interaction.reply("Something went very wrong...");
	}
};
