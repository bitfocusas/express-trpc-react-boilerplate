import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpcNodeHttp from "@trpc/server/adapters/node-http";
import { TRPCError } from "@trpc/server";
import * as jwt from "jsonwebtoken";
import logger from "./core/log";
import { IncomingMessage, ServerResponse } from 'http';
import { NodeHTTPCreateContextFnOptions, NodeHTTPCreateContextOption } from "@trpc/server/adapters/node-http";
import * as ws from 'ws';

export async function createContext(
	opts?: NodeHTTPCreateContextFnOptions<IncomingMessage, ws.WebSocket | ServerResponse>
) {
	async function getUserFromHeader() {
		if (opts?.req.headers.authorization) {
			logger.debug("Inbound authorization", opts?.req.headers);
			let user = null;
			try {
				const user = jwt.decode(
					opts?.req.headers.authorization.split(" ")[1]
				);
			} catch (e) {
				logger.error("JWT Decode error", {
					e,
					headers: opts?.req.headers,
				});
				throw new TRPCError({ code: "PARSE_ERROR" });
			} finally {
				return user;
			}
		} else {
			logger.debug("Missing authorization", opts?.req.headers);
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
	auth?: boolean;
}
