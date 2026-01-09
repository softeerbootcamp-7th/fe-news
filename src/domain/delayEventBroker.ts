type BrokerState = "idle" | "paused" | "first_wait" | "wait";

export type BrokerEventStatusInfo = {
	is_fine: boolean;
};

type Task = {
	cb: () => BrokerEventStatusInfo;
};

type BrokerParams = {
	unitTime?: number;
	interval?: number;
	tasks?: Task[];
};

export class DelayEventBroker {
	private currentEventIndex: number = 0;
	private state: BrokerState = "idle";
	private timerId: ReturnType<typeof setTimeout> | null = null;

	private unitTime: number;
	private interval: number;
	private tasks: Task[];

	constructor({
		unitTime = 5000,
		interval = 1000,
		tasks = [],
	}: BrokerParams) {
		this.unitTime = unitTime;
		this.interval = interval;
		this.tasks = tasks;
	}

	public start() {
		if (this.state !== "idle") {
			return;
		}

		this._run();
	}

	public pause() {
		if (this.state === "paused" || this.state === "idle") {
			return;
		}

		this.state = "paused";
		if (this.timerId) {
			clearTimeout(this.timerId);
			this.timerId = null;
		}
	}

	public resume() {
		if (this.state !== "paused") {
			return;
		}

		this.currentEventIndex = 0;
		this.state = "idle";
		this._run();
	}

	private _run() {
		if (this.state === "paused") {
			return;
		}

		this.state = this.currentEventIndex === 0 ? "first_wait" : "wait";

		const delay =
			this.state === "first_wait" ? this.unitTime : this.interval;

		this.timerId = setTimeout(() => {
			if (this.state === "paused") {
				return;
			}

			if (this.currentEventIndex >= this.tasks.length) {
				return;
			}

			const currentTask = this.tasks[this.currentEventIndex];

			if (!currentTask) {
				return;
			}

			const statusInfo = currentTask.cb();

			if (statusInfo.is_fine) {
				this.currentEventIndex =
					(this.currentEventIndex + 1) % this.tasks.length;
				this._run();
			} else {
				this.state = "idle";
				this.currentEventIndex = 0;
			}
		}, delay);
	}
}
