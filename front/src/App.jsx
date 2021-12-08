import React, { useState, useEffect } from "react"

import Note from "./components/Note"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NoteForm from "./components/NoteForm"

import noteService from "./services/notes"
import loginService from "./services/login"

const App = () => {
	const [notes, setNotes] = useState([])
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	const [user, setUser] = useState(null)

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	const addNote = (noteObject) => {
		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote))
		})
	}

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id)
		const changedNote = { ...note, important: !note.important }
		console.log(note)
		console.log(changedNote)

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
	}

	const logUser = async ({ username, password }) => {
		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user))

			noteService.setToken(user.token)

			setUser(user)
		} catch (e) {
			setErrorMessage("Wrong credentials")

			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogOut = () => {
		setUser(null)
		noteService.setToken(null)
		window.localStorage.removeItem("loggedNoteAppUser")
	}

	const notesToShow = showAll ? notes : notes.filter((note) => note.important)

	return (
		<div>
			<h1>Notes</h1>

			<Notification message={errorMessage} />
			{user ? (
				<NoteForm addNote={addNote} handleLogOut={handleLogOut} />
			) : (
				<LoginForm logUser={logUser} />
			)}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note, i) => (
					<Note
						key={i}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
		</div>
	)
}

export default App

/* import { useEffect, useState } from "react"
import "./App.css"
import { Note } from "./Note"
import { create as createNote, getAll as getAllNotes } from "./services/notes"

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getAllNotes().then((res) => {
			setNotes(res)
			setLoading(false)
		})
	}, [])

	const handleChange = (e) => {
		setNewNote(e.target.value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()

		const noteToAddToState = {
			title: newNote,
			body: newNote,
			userId: 1,
		}

		createNote(noteToAddToState).then((newNote) => {
			setNotes((prevNotes) => prevNotes.concat(newNote))
		})

		setNewNote("")
		// setNotes(notes.concat(noteToAddToState))
		// setNotes([...notes, noteToAddToState])
	}

	return (
		<div>
			<h1>Notes</h1>
			{loading ? (
				"LOADING..."
			) : (
				<ol>
					{notes.map((note) => (
						<Note key={note.id} {...note} />
					))}
				</ol>
			)}

			<form onSubmit={handleSubmit}>
				<input type='text' onChange={handleChange} value={newNote} />
				<button>Crear nota</button>
			</form>
		</div>
	)
}

export default App */
