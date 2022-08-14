import React, { useEffect, useState } from "react";
import { trpc } from "./utils/trpc";

export default function Login() {
	const auth = trpc.useMutation(["user.auth.login"]);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = async () => {
		auth.mutate({ username, password });
	};

	// Store the jwt for future API queries.
	useEffect(() => {
		if (auth.data !== undefined && auth.data !== null) {
			localStorage.setItem("jwt", auth.data);
		}
	}, [auth]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleLogin();
			}}
		>
			<input
				type="email"
				value={username}
				placeholder="Email"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				value={password}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button onClick={handleLogin} disabled={auth.isLoading}>
				Login
			</button>

			{auth.error && <p>Error</p>}
		</form>
	);
}
