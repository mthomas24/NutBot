import { CommandInteraction } from "discord.js";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "ping",

	execute: async (interaction: CommandInteraction, data: GlobalData) => {
		interaction.reply("Pong bitch");
	}
};

export default command;