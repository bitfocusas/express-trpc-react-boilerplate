import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { TRPCError } from "@trpc/server";
import * as jwt from "jsonwebtoken";

export async function createContext(
	opts?: trpcExpress.CreateExpressContextOptions
) {
	async function getUserFromHeader() {
		console.log("wut");
		if (opts?.req.headers.authorization) {
			//const user = jwt.decode(opts?.req.headers.authorization.split(" ")[1]);
			return {};
		}
		return null;
	}

	const user = await getUserFromHeader();

	return {
		user,
	};
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export interface Meta {
	auth: boolean;
}
