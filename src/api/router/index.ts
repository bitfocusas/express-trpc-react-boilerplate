import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Context, Meta } from "../context";
import routerTest from "./test";
import routerUser from "./user";

export const router = trpc
	.router<Context, Meta>()

	// Middleware for checking if the user is authenticated (if required to by meta)
	.middleware(async ({ meta, next, ctx }) => {
		if (meta?.auth && !ctx.user) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}
		return next();
	})
	// API Routers

	.merge("user.", routerUser)
	.merge("test.", routerTest);

export type API = typeof router;
