import { Player } from "discord-player";
import { CommandInteraction } from "discord.js";

export interface ConfigData {
  clientID: string;
  nutGuild: string;
  color: string;
  botAdmins: string[];
  oldColor: string;
  commandsPerPage: number;
  testGuild: string;
}

export interface Card {
	Name: string;
	ID: string;
	Color: string;
	Art: string;
	Description: string;
	Level: number;
	ATK: number;
	DEF: number;
	Total?: number;
	Coins: number;
}

export interface GlobalData {
  cards: Card[];
  config: ConfigData;
  musicPlayer: Player;
  cooldowns: {
    nut: Set<string>;
  };
	commands: Map<string, Command>;
	cardCommands: Map<string, Command>;
	dev: boolean;
}

export interface Command {
	name: string;
	type?: "admin" | "music" | "squeanut" | "general";
	botAdmin?: boolean;
	hidden?: boolean;
	execute: (inter: CommandInteraction, data: GlobalData) => any;
}
