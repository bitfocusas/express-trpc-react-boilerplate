import { TRPCError } from "@trpc/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_VALID_SECONDS } from "../../core/constants";

type LoginRequest = {
	input: {
		username: string;
		password: string;
	};
};

type LoginResponse = {
	jwt: string | null;
	success: boolean;
};

export const authLogin = {
	// Meta information
	meta: {
		auth: false,
	},

	// Request validation schema
	input: z.object({
		username: z.string().email(),
		password: z
			.string()
			.min(1, "passwords can't be shorter than 8 characters."),
	}),

	async resolve({ input }: LoginRequest): Promise<LoginResponse> {
		if (
			input.username === "william@trippelm.no" &&
			input.password === "admin"
		) {
			return {
				jwt: jwt.sign(
					{
						exp: Math.floor(Date.now() / 1000) + JWT_VALID_SECONDS,
						data: "foobar",
					},
					JWT_SECRET
				),
				success: true,
			};
		}
		return {
			jwt: null,
			success: false,
		};
	},
};
