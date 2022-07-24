class Test {
	public test: string = "jaja";
	set(value: string) {
		this.test = value;
	}
	get() {
		return this.test;
	}
}

export default new Test();
