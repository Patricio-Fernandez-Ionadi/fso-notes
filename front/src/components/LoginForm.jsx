import { useState } from "react"
import Toggable from "./Toggable"
import PropTypes from "prop-types"

const LoginForm = ({ logUser }) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		logUser({ username, password })
		setUsername("")
		setPassword("")
	}

	return (
		<Toggable buttonLabel='Show Login'>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						value={username}
						name='username'
						placeholder='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<input
						type='password'
						value={password}
						name='password'
						placeholder='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id='form-login-button'>Login</button>
			</form>
		</Toggable>
	)
}

LoginForm.propTypes = {
	logUser: PropTypes.func.isRequired,
}

export default LoginForm
