import { z } from "zod";

type Request = {
	input: { info: string };
};

export const fubarQuery = {
	// Meta information
	meta: {
		auth: false,
	},

	// Request schema
	input: z.object({
		info: z.string(),
	}),

	// Response schema
	output: z.object({
		greeting: z.string(),
	}),

	async resolve({ input }: Request) {
		return {
			greeting: input.info,
			meh: "cool",
		};
	},
};
