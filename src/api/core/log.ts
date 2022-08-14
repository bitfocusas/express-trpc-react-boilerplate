import { createLogger, format, transports } from "winston";
const { combine, colorize, json, timestamp, label, printf } = format;
import _ from "lodash";
import os from "os";

const myFormat = printf(({ level, message, label, timestamp, ...more }) => {
	let obj: any = {};
	let num = 0;
	Object.keys(more).forEach((key) => {
		num++;
		obj[key] = more[key];
	});

	return `${timestamp} [${label}] ${level}: ${message} ${
		num ? JSON.stringify(obj, null, 2) : ""
	}`;
});
const logger = createLogger({
	transports: [
		new transports.Console({
			format: combine(
				colorize(),
				json(),
				label({
					label:
						process.env.NODE_ENV === "production"
							? process.pid + "@" + os.hostname()
							: "dev",
				}),
				timestamp(),
				myFormat
			),
		}),
	],
});

export default logger;
