import React from "react";
import { trpc } from "./utils/trpc";

export default function Home() {
	//const hello = trpc.useQuery(["test.fubar", { info: "kul" }]);
	// This can either be a tuple ['login'] or string 'login'

	const auth = trpc.useMutation(["user.auth.login"]);

	const handleLogin = async () => {
		console.log("login");
		auth.mutate({ username: "william@trippelm.no", password: "warp242" });
	};

	return (
		<div>
			<h1>Login Form</h1>
			<button onClick={handleLogin} disabled={auth.isLoading}>
				Login
			</button>

			{auth.data?.jwt}

			{auth.error && <p>Something went wrong! {auth.error.message}</p>}
		</div>
	);
}
