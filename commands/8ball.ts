import { randElem } from "../utils";

export default {
	name: "8ball",
	execute: async (interaction, data) => {
		const replies = [
			"Maybe.",
			"Certainly not.",
			"I hope so.",
			"Not in your wildest dreams.",
			{
				content: "idk but im on crack rn",
				attachments: [
					"https://c.tenor.com/NNTeMV9b_bkAAAAC/chevy-chase-excited.gif"
				]
			},
			"There is a good chance.",
			"Quite likely. 🙂",
			"I think so.",
			"I hope not.",
			"I hope so.",
			"Never!",
			"Pfft. 😤",
			"Sorry, bucko.",
			"Hell, yes.",
			"Hell to the no. mad 😈",
			"The future is bleak. 😵",
			"The future is uncertain.",
			"I would rather not say.",
			"Who cares?",
			"Possibly.",
			"Never, ever, ever.",
			"There is a small chance.",
			"Yes!",
			"lol no.",
			"There is a high probability.",
			"What difference does it makes?",
			"Not my problem.",
			"Ask someone else.",
			"Of course papi! 😉"
		];
		interaction.reply(randElem(replies));
	}
};
