import { useRef, useState } from "react"
import Toggable from "./Toggable"

const NoteForm = ({ addNote, handleLogOut }) => {
	const [newNote, setNewNote] = useState("")
	const toggableRef = useRef()

	const handleChange = ({ target }) => {
		setNewNote(target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const noteObject = {
			content: newNote,
			important: false,
		}

		addNote(noteObject)
		setNewNote("")
		toggableRef.current.toggleVisibility()
	}

	return (
		<Toggable buttonLabel='New Note' ref={toggableRef}>
			<h3>Create a new note</h3>

			<form onSubmit={handleSubmit}>
				<input
					value={newNote}
					onChange={handleChange}
					placeholder='Write your own note'
				/>
				<button type='submit'>save</button>
			</form>
			<div>
				<button onClick={handleLogOut}>Logout</button>
			</div>
		</Toggable>
	)
}

export default NoteForm
