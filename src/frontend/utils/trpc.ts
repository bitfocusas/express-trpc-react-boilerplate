import { createReactQueryHooks } from "@trpc/react";
import type { API } from "../../api/router";
export const trpc = createReactQueryHooks<API>();
