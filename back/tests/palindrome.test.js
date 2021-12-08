const { palindrome } = require("../utils/for_testing")

test.skip("palindrome of poker", () => {
	const result = palindrome("poker")

	expect(result).toBe("rekop")
})

test.skip("palindrome of empty string", () => {
	const result = palindrome("")

	expect(result).toBe("")
})

test.skip("palindrome of undefined", () => {
	const result = palindrome()

	expect(result).toBeUndefined()
})
// https://jestjs.io/docs/expect metodos de expect
