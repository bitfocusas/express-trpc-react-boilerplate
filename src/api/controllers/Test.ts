interface Response {
	payload: string;
}

export default async function (req: Express.Request): Promise<Response> {
	return {
		payload: "Hi test!!",
	};
}
