import {
	CommandInteraction,
	MessageActionRow,
	MessageButton
} from "discord.js";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "nut",
	execute: (interaction: CommandInteraction, data: GlobalData) => {
		interaction.reply({
			content:
				"https://cdn.shopify.com/s/files/1/0071/5387/7044/files/nut_gif_1200x1200.gif?v=1552174180",
			components: [
				new MessageActionRow().addComponents(
					new MessageButton()
						.setLabel("Click to nut")
						.setEmoji("🥜")
						.setStyle("PRIMARY")
						.setCustomId("nutBtn")
				)
			]
		});
	}
};

export default command;