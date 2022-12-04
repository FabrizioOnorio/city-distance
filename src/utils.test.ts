import { queryRegex, capitaliseCity } from "./utils";

test("It capitalise the first letter of the string", () => {
	expect(capitaliseCity("oslo")).toBe("Oslo");
});
test("The query does not accept only one city", () => {
	expect(queryRegex("oslo")).toBe(false);
});
test("The query does not accept comma separator", () => {
	expect(queryRegex("oslo,rome")).toBe(false);
});
test("Passes when 2 cities are divided from a dash", () => {
	expect(queryRegex("oslo-rome")).toBe(true);
});
