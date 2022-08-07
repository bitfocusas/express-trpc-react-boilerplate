import * as trpc from "@trpc/server";
import logger from "../../core/log";
import modelTest from "../../model/test";
import { Context, Meta } from "../../context";
import { z } from "zod";

import { fubar } from "./fubar";

const router = trpc
	.router<Context, Meta>()
	// Mutations & Queries
	.query("fubar", fubar);

export default router;
