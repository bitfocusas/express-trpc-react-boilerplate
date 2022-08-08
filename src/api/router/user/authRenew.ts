import { TRPCError } from "@trpc/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_VALID_SECONDS } from "../../core/constants";

type RenewRequest = {
	input: {};
};

type RenewResponse = {
	jwt: string;
};

export type JwtData = {
	username: string;
};

export const authRenew = {
	// Meta information
	meta: {
		auth: true,
	},

	async resolve(): Promise<RenewResponse> {
		const data: JwtData = {
			username: "admin",
		};

		return {
			jwt: jwt.sign(
				{
					exp: Math.floor(Date.now() / 1000) + JWT_VALID_SECONDS,
					data: JSON.stringify(data),
				},
				JWT_SECRET
			),
		};
	},
};
