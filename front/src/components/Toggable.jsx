import { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"

const Toggable = forwardRef(({ children, buttonLabel = "Button" }, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? "none" : "inherit" }
	const showWhenVisible = { display: visible ? "inherit" : "none" }

	const toggleVisibility = () => setVisible(!visible)

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	)
})
Toggable.displayName = "Toggable"

Toggable.propTypes = {
	buttonLabel: PropTypes.string,
}

export default Toggable
