import { createContext } from "./context";
import { router, API } from "./router";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import ws from 'ws';
import * as http from 'http';
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { createHTTPServer } from "@trpc/server/dist/declarations/src/adapters/standalone";

export const api = express();
const { server, listen } = createHTTPServer({
	router,
	createContext
});
const wss = new ws.Server({ server });

api.use(
	"/",
	trpcExpress.createExpressMiddleware({
		router,
		createContext,
	})
);

const handler = applyWSSHandler<API>({ wss, router: router, createContext });

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

listen(3000);