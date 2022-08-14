import React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";

function getAuthCookie(): string {
	return localStorage.getItem("jwt") ?? "";
}

export default function TRPC({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() => {
		return trpc.createClient({
			url: "api",
			headers() {
				return {
					authorization: getAuthCookie(),
				};
			},
		});
	});
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}
