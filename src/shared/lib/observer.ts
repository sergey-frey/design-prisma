type Sub<T> = (data: T) => void;

export class Observer<T> {
	private subs: Sub<T>[] = [];

	public subscribe(sub: Sub<T>) {
		this.subs.push(sub);
	}

	public unsubscribe(sub: Sub<T>) {
		this.subs = this.subs.filter((s) => s !== sub);
	}

	public broadcast(data: T) {
		for (const sub of this.subs) {
			sub(data);
		}
	}
}
