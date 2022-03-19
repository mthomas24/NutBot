import { GuildMember, CommandInteraction, SelectMenuInteraction } from "discord.js";
import { GlobalData } from "./types";

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const randElem = arr => arr[randInt(0, arr.length)];

interface ShopItem {
	name: string;
	price: number;
	id: string;
	owned?: (gm: GuildMember) => boolean;
	desc: string;
	cat?: "server" | "collectable";
	onBuy: (inter: SelectMenuInteraction, gm: GuildMember) => void;
	nonStorable?: boolean;
	consumable?: boolean;
	onUse?: (inter: CommandInteraction, data: GlobalData) => void;
}

const items: ShopItem[] = [
  {
    name: "Early Video Access",
    price: 500,
    id: "early_video_access",
    owned: guildMember => guildMember.roles.cache.has("753756840931885218"),
    desc: "Access to the early-video-access channel",
    cat: "server",
    /**
     * @param {CommandInteraction} interaction
     * @param {GuildMember} guildMember
     */
    onBuy: (interaction, guildMember) => {
      guildMember.roles.add("753756840931885218");
    },
    nonStorable: true
  },
  {
    name: "Nutbot Sneak Peeks",
    price: 100,
    id: "nutbot_sneak_peeks",
    owned: guildMember => guildMember.roles.cache.has("753756911861497996"),
    desc: "Access to the nutbot-sneak-peeks channel",
    cat: "server",
    /**
     * @param {CommandInteraction} interaction
     * @param {GuildMember} guildMember
     */
    onBuy: (interaction, guildMember) => {
      guildMember.roles.add("753756911861497996");
    },
    nonStorable: true
  },
  {
    name: "Golden Nut",
    price: 5000,
    id: "golden_nut",
    owned: () => false,
    desc: "It's golden, it's shiny, and it's nutty af",
    cat: "collectable",
    onBuy: interaction => {}
  },
  {
    name: "Nut Potion",
    price: 500,
    id: "nut_potion",
    owned: () => false,
    desc: "Instantly gain the energy to nut again",
    onBuy: interaction => {},
    onUse: async (interaction, data) => {
      data.cooldowns.nut.delete(interaction.user.id);
      await interaction.reply(
        `You ${randElem([
          "cheerfully chug",
          "sloppily slurp up",
          "drink"
        ])} your potion, and suddenly regain the energy to nut again!`
      );
    },
    consumable: true
  }
];

export default items;