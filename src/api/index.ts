import { createContext } from "./context";
import { router } from "./router";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

export const api = express();

api.use(
	"/",
	trpcExpress.createExpressMiddleware({
		router,
		createContext,
	})
);
