import { Context, Meta, createContext } from "./context";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";
import express from "express";
import { TRPCError } from "@trpc/server";

// Controllers
import ControllerTest from "./controllers/Test";

export const api = express();

const apiRouter = trpc
	.router<Context, Meta>()
	.middleware(async ({ meta, next, ctx }) => {
		if (meta?.auth && !ctx.user) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}
		return next();
	})

	// Endpoints
	.query("test", { resolve: ControllerTest, meta: { auth: true } });

export type API = typeof apiRouter;

api.use(
	"/",
	trpcExpress.createExpressMiddleware({
		router: apiRouter,
		createContext,
	})
);
