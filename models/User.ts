import * as mongoose from "mongoose";
import shopItems from "../shopItems";

// let itemIDs = {};
// for (const item of shopItems) {
// 	if (item.nonStorable) continue;
// 	itemIDs[item.id] = {
// 		type: Number,
// 		default: 0
// 	};
// }
// console.log(itemIDs);

export interface Inventory {
	golden_nut?: number;
	nut_potion?: number;
}

export interface User {
	userID: string;
	coins: number;
	cards: string[];
	inventory: Inventory;
}

const inventorySchema = new mongoose.Schema<Inventory>({
	
});

const userSchema = new mongoose.Schema<User>({
	userID: {
		type: String,
		required: true,
		immutable: true
	},
	coins: {
		type: Number,
		required: true,
		default: 0
	},
	cards: {
		type: [String],
		default: []
	},
	inventory: {
		type: inventorySchema,
		required: true,
		default: () => ({})
	}
});

export const UserModel = mongoose.model("User", userSchema);
