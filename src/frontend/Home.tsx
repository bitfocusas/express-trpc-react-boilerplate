import React from "react";
import { trpc } from "./utils/trpc";

export default function Home() {
	const hello = trpc.useQuery(["test.fubar", { info: "kul" }]);

	return (
		<div>
			lol
			<p>{hello.data?.greeting}</p>
		</div>
	);
}
