import { expect, it } from "vitest";
import { sortByField, toTitle } from "../string";

it("UTIL: convert string to titled string", () => {
	const resultTest = toTitle("Test");
	const resultEmpty = toTitle("");
	const resultNumber = toTitle("123");

	expect(resultTest).toBe("Test");
	expect(resultEmpty).toBe("");
	expect(resultNumber).toBe("123");
});

it("UTIL: sort objects by field", () => {
	const data = [
		{
			first: "a",
			second: "b",
		},
		{
			first: "b",
			second: "a",
		},
	];

	const sortByFirstFn = sortByField<(typeof data)[0]>("first");
	const resultByFirst = data.toSorted(sortByFirstFn);

	const sortBySecondFn = sortByField<(typeof data)[0]>("second");
	const resultBySecond = data.toSorted(sortBySecondFn);

	expect(resultByFirst).toEqual([
		{
			first: "a",
			second: "b",
		},
		{
			first: "b",
			second: "a",
		},
	]);

	expect(resultBySecond).toEqual([
		{
			first: "b",
			second: "a",
		},
		{
			first: "a",
			second: "b",
		},
	]);
});
