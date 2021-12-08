const mongoose = require("mongoose")
const { server } = require("../index")

const Note = require("../models/Note")
const { initialNotes, api, getAllContentFromNotes } = require("./helpers")

beforeEach(async () => {
	await Note.deleteMany({})

	const notesObjects = initialNotes.map((note) => new Note(note))
	const promises = notesObjects.map((note) => note.save())
	await Promise.all(promises)
})

describe("GET all notes", () => {
	test("notes are returned as json", async () => {
		await api
			.get("/api/notes")
			.expect(200)
			.expect("Content-Type", /application\/json/)
	})

	test("there are two notes", async () => {
		const response = await api.get("/api/notes")

		expect(response.body).toHaveLength(initialNotes.length)
	})

	test("the first note have the number 1 in its content", async () => {
		const response = await api.get("/api/notes")
		expect(response.body[0].content).toContain("1")
	})
})

describe("POST /api/notes", () => {
	test("is possible with a valid note", async () => {
		const newNote = {
			content: "test note 1",
			important: true,
		}

		await api
			.post("/api/notes")
			.send(newNote)
			.expect(200)
			.expect("Content-Type", /application\/json/)

		const { contents, response } = await getAllContentFromNotes()

		expect(response.body).toHaveLength(initialNotes.length + 1)
		expect(contents).toContain(newNote.content)
	})

	test("is not possible with an invalid note", async () => {
		const newNote = {
			content: "",
			important: true,
		}

		await api.post("/api/notes").send(newNote).expect(400)

		const response = await api.get("/api/notes")

		expect(response.body).toHaveLength(initialNotes.length)
	})
})

describe("DELETE a note", () => {
	test("a note can be deleted", async () => {
		const { response: firstResponse } = await getAllContentFromNotes()
		const { body: notes } = firstResponse
		const noteToDelete = notes[0]

		await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

		const { contents, response: secondResponse } =
			await getAllContentFromNotes()

		expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
		expect(contents).not.toContain(noteToDelete.content)
	})

	test("a note that do not exist can not be deleted", async () => {
		await api.delete(`/api/notes/1234`).expect(400)

		const { response } = await getAllContentFromNotes()

		expect(response.body).toHaveLength(initialNotes.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})
