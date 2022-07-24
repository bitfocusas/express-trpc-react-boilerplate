import logger from "../core/log";
import test from "../model/test";

interface Response {
	payload: string;
}

export default async function (req: Express.Request): Promise<Response> {
	logger.info("TestSet");

	test.set("jaja" + Date.now());

	return {
		payload: test.get(),
	};
}
