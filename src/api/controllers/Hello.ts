interface Response {
	payload: number;
}

export default async function (req: Express.Request): Promise<Response> {
	return {
		payload: 2,
	};
}
