import * as mongoose from "mongoose";

interface Guild {
	guildID: string;
	memeChannel: string;
}

const guildSchema = new mongoose.Schema<Guild>({
	guildID: String,
	memeChannel: String
});

export const GuildModel = mongoose.model<Guild>("Guild", guildSchema);
