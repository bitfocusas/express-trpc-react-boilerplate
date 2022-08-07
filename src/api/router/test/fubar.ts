import { z } from "zod";

type Request = {
	input: { info: string };
};

type Response = {
	greeting: string;
};

export const fubar = {
	// Meta information
	meta: {
		auth: false,
	},

	// Request schema
	input: z.object({
		info: z.string(),
	}),

	async resolve({ input }: Request): Promise<Response> {
		return {
			greeting: input.info,
		};
	},
};
