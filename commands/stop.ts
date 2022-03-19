import { Player } from "discord-player";
import { CommandInteraction } from "discord.js";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "stop",
	type: "music",

	execute: async (interaction: CommandInteraction, data: GlobalData) => {}
};

export default command;