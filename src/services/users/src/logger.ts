import { createLogger, format, Logger, transports } from "winston";
import { AbstractConfigSetLevels } from "winston/lib/winston/config";

const logLevels : AbstractConfigSetLevels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	trace: 5,
};

export const logger : Logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	levels: logLevels,
	transports: [new transports.Console()],
	exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
	rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
});
