import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
// import { prettyDOM } from "@testing-library/react"
import Note from "./Note"

test("renders content", () => {
	const note = {
		content: "this is a test",
		important: true,
	}

	const component = render(<Note note={note} />)

	// const li = component.container.querySelector("li")
	// console.log(prettyDOM(li))

	component.getByText("this is a test")
	component.getByText("make not important")

	// expect(component.container).toHaveTextContent("test")
	// component.debug()
})

test("clicking the buttom calls event handler once", () => {
	const note = {
		content: "this is a test",
		important: true,
	}

	const mockHandler = jest.fn()

	const component = render(<Note note={note} toggleImportance={mockHandler} />)

	const button = component.getByText("make not important")
	fireEvent.click(button)

	// expect(mockHandler.mock.calls).toHaveLength(1)
	expect(mockHandler).toHaveBeenCalledTimes(1)
})
