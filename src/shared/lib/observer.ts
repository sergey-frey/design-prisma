type Sub<T> = (data: T) => void;
type SubsStore<T extends { action: string }> = Map<T["action"], Sub<T>[]>;

export class Observer<T extends { action: string }> {
	private subs: SubsStore<T> = new Map() as SubsStore<T>;

	public subscribe(sub: Sub<T>, action: T["action"]) {
		let newSubs: Sub<T>[];

		if (this.subs.has(action)) {
			newSubs = (this.subs.get(action) as Sub<T>[]).concat(sub);
		} else {
			newSubs = [sub];
		}

		this.subs.set(action, newSubs);
	}

	public unsubscribe(sub: Sub<T>, action: T["action"]) {
		if (!this.subs.has(action)) {
			return;
		}

		const newSubs = (this.subs.get(action) as Sub<T>[]).filter(
			(s) => s !== sub,
		);

		this.subs.set(action, newSubs);
	}

	public broadcast(data: T) {
		const action = data.action;

		if (!this.subs.has(action)) {
			return;
		}

		for (const sub of this.subs.get(action) as Sub<T>[]) {
			sub(data);
		}
	}
}
