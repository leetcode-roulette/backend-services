import cron, { ScheduledTask } from "node-cron";

export class Cronjob {
	public scheduledTask : ScheduledTask;

	constructor(cronExpression: string, job: () => void) {
		this.scheduledTask = this.startJob(cronExpression, job);
	}

	private startJob(cronExpression: string, job: () => void) : ScheduledTask {
		return cron.schedule(cronExpression, job, {
			timezone: process.env.TIMEZONE || "UTC",
			scheduled: process.env.SCHEDULED !== "false"
		});
	}
}
