import * as trpc from "@trpc/server";
import logger from "../../core/log";
import modelTest from "../../model/test";
import { Context, Meta } from "../../context";
import { z } from "zod";

import { authLogin } from "./authLogin";
import { authRenew } from "./authRenew";

const router = trpc
	.router<Context, Meta>()

	// Mutations & Queries
	.mutation("auth.login", authLogin)
	.mutation("auth.renew", authRenew);

export default router;
