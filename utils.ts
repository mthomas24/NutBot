import { CommandInteraction } from "discord.js";
import { UserModel } from "./models/User";
import { readFileSync } from "fs";
import { Card } from "./types";
import { GuildModel } from "./models/Guild";

// const shopItemIDs = shopItems.filter(i => !i.nonStorable).map(i => i.id);
// let defaultInv = {};
// for (const id of shopItemIDs) defaultInv[id] = 0;

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randElem<T>(arr: T[]): T {
  return arr[randInt(0, arr.length)];
}

// Might need to fix permissions not being checked correctly
export function interactionHasPerms(interaction: CommandInteraction, ...permFlags: bigint[]): boolean {
	let member = interaction.guild.members.cache.get(interaction.user.id);
  return permFlags.every(perm => member.permissions.has(perm));
}

export async function fetchCardInfo(): Promise<Card[]> {
	let data: string;
  // data = await fetch("https://sheetdb.io/api/v1/6qj769b4u2o9q");
	data = readFileSync("./cardsCache.json", { encoding: "utf-8" });
	let parsed: any[] = JSON.parse(data);
	let result: Card[] = parsed.map(c => {
		["Level", "ATK", "DEF", "Coins", "Total"].forEach(prop => c[prop] = parseInt(c[prop]));
		return c;
	});
	return result;
}

export async function getUserData(id: string) {
  let u = await UserModel.findOne({ userID: id });

  if (!u) {
    u = new UserModel({ userID: id });
    u.save();
  }

  // if (!u.inventory) {
  // 	u.inventory = defaultInv;
  // 	u.save();
  // }

  return u;
}

export async function getGuildData(id: string) {
	let g = await GuildModel.findOne({ guildID: id });
	if (!g) {
		g = new GuildModel({ guildID: id });
		g.save();
	}

	return g;
}

export function isURL(s: string) {
  return s.startsWith("https://") || s.startsWith("http://");
}

export function toMS(minutes: number) {
  return minutes * 60000;
}

export function makePlural(str: string) {
  return str + "s";
}

export function getProperty<T, K extends keyof T>(obj: T, propertyName: K): T[K] {
	return obj[propertyName]; // o[propertyName] is of type T[K]
}

export const coinEmoji = "<:xp_coin_nutt:941635688149942332>";

// module.exports = {
//   timeString: (date: Date) => {
//   	let ms = date.valueOf();
//   	let result = [];
//   	if (ms > 3600000) {
//   		let n = result % 3600000;
//   		result.push(`${n} hours(s)`);
//   		ms -= n;
//   	}
//   	if (ms > 60000) {
//   		let n = result % 60000;
//   		result.push(`${n} minutes(s)`);
//   		ms -= n;
//   	}
//   	if (ms > 1000) {
//   		let n = result % 1000;
//   		result.push(`${n} seconds(s)`);
//   		ms -= n;
//   	}
//   	return result.join(", ");
//   },
// };
