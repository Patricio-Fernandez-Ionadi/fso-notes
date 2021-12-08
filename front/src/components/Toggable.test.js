import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
// import { prettyDOM } from "@testing-library/react"
import Toggable from "./Toggable"

describe("<Toggable />", () => {
	let component
	let buttonLabel = "show"

	beforeEach(() => {
		component = render(
			<Toggable buttonLabel={buttonLabel}>
				<div className='testDiv'>testDivContent</div>
			</Toggable>
		)
	})

	test("render its children", () => {
		expect(component.container.querySelector(".testDiv")).toBeDefined()
		component.getByText("testDivContent")
	})

	test("render its children but they are not visible", () => {
		const el = component.getByText("testDivContent")
		expect(el.parentNode).toHaveStyle("display: none;")
	})

	// test("after clicking its children must be shown", () => {
	// 	const el = component.getByText("testDivContent")
	// 	expect(el.parentNode).toHaveStyle("display: none;")

	// 	const button = component.getByText(buttonLabel)
	// 	fireEvent.click(button)

	// 	expect(el.parentNode).not.toHaveStyle("display: none;")
	// })

	test("after clicking its children must be shown", () => {
		const button = component.getByText(buttonLabel)
		fireEvent.click(button)

		const el = component.getByText("testDivContent")
		expect(el.parentNode).not.toHaveStyle("display: none;")
	})

	test("toggled content can be closed", () => {
		const button = component.getByText(buttonLabel)
		fireEvent.click(button)

		const el = component.getByText("testDivContent")
		expect(el.parentNode).not.toHaveStyle("display: none;")

		const cancelButton = component.getByText("Cancel")
		fireEvent.click(cancelButton)

		expect(el.parentNode).toHaveStyle("display: none;")
	})
})
