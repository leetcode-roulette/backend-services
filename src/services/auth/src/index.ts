import { app } from "./app";
import { logger } from "./logger";

const serve = async () => {
	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		logger.info(`Server is listening on port ${PORT}`);
	});
};

serve();
