import * as Discord from "discord.js";
import * as descriptions from "../descriptions.json";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "help",
	execute: async (interaction: Discord.CommandInteraction, data: GlobalData) => {
		// const messages = ["Your nuts are your most valuable asset"];

		const mainMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Nutbot Help Menu 🥜")
			.setThumbnail("https://i.imgur.com/2Gpe6Fi.png")
			.addFields(
				{
					name: "Main Commands",
					value: "`/help commands`",
					inline: false
				},
				{
					name: "Squeanut",
					value: "`/help squeanut`",
					inline: true
				},
				{ name: "Admin", value: "`/help admin`", inline: true },
				{ name: "Music", value: "`/help music`", inline: true }
			)
			.setFooter({
				text: "DM or ping Toasty#2710 if something isn't working"
			});

		const cmdMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("General Help")
			.addField(
				"Commands",
				[...data.commands.values()]
					.filter(cmd => (!cmd.type || cmd.type === "general") && !cmd.hidden)
					.map(cmd => `\`${cmd.name}\` — ${descriptions[cmd.name]}`)
					.sort()
					.join("\n")
			);

		const cardsMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Squeanut Help")
			.setThumbnail(
				"https://cdn.discordapp.com/attachments/743963204421681283/859197055363448842/ntermission_geef.gif"
			)
			.setDescription("Squeanut is a nutty card game (idk what to put here).")
			.addField(
				"Commands",
				[...data.cardCommands.values()]
					.sort()
					.map(
						cmd =>
							`\`/squeanut ${cmd.name}\` — ${
								descriptions[`squeanut ${cmd.name}`]
							}`
					)
					.join("\n")
			);

		const adminMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Admin/Moderation Help")
			.addField(
				"Commands",
				[...data.commands.values()]
					.filter(cmd => cmd.type === "admin")
					.map(cmd => `\`${cmd.name}\` — ${descriptions[cmd.name]}`)
					.sort()
					.join("\n")
			);

		const musicMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Music Help 🎵")
			.setDescription("Play songs/videos from YouTube in a voice channel.")
			.addField(
				"Commands",
				[...data.commands.values()]
					.filter(cmd => cmd.type === "music")
					.map(cmd => `\`${cmd.name}\` — ${descriptions[cmd.name]}`)
					.sort()
					.join("\n")
			);

		let helpType = interaction.options.getString("category");
		let embed;

		switch (helpType) {
			case "commands":
				embed = cmdMenu;
				break;
			case "squeanut":
				embed = cardsMenu;
				break;
			case "admin":
				embed = adminMenu;
				break;
			case "music":
				embed = musicMenu;
				break;
			default:
				embed = mainMenu;
				break;
		}
		await interaction.reply({
			embeds: [embed]
		});
	}
};

export default command;