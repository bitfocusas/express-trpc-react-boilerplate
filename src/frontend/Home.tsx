import React, { useState } from "react";
import { createTRPCClient } from "@trpc/client";
import type { API } from "../api";

const client = createTRPCClient<API>({
	url: "api",
});

const Home: React.FC<{}> = () => {
	const [data, setData] = useState<null | { message: string }>(null);

	const handleLoad = () => {
		client.query("test").then((res) => {
			setData({ message: res.payload });
		});
	};

	return (
		<>
			<button onClick={handleLoad}>Load Data</button>
			{!!data && <pre>Data: {data.message}</pre>}
		</>
	);
};

export default Home;
