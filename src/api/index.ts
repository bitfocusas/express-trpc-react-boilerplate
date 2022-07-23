import { Context, Meta, createContext } from "./context";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";
import express from "express";
import { TRPCError } from "@trpc/server";

// Controllers
import ControllerHello from "./controllers/Hello";
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
	.query("hello", { resolve: ControllerHello, meta: { auth: false } })
	.query("test", { resolve: ControllerTest, meta: { auth: false } })
	.mutation("test", { resolve: ControllerTest });

export type API = typeof apiRouter;

api.use(
	"/",
	trpcExpress.createExpressMiddleware({
		router: apiRouter,
		createContext,
	})
);
