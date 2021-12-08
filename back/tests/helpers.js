const supertest = require("supertest")
const { app } = require("../index")
const api = supertest(app)

const User = require("../models/User")

const initialNotes = [
	{ content: "Contenido de nota 1", important: true, date: new Date() },
	{ content: "Contenido de nota 2", important: true, date: new Date() },
	{ content: "Contenido de nota 3", important: true, date: new Date() },
]

const getAllContentFromNotes = async () => {
	const response = await api.get("/api/notes")
	return {
		contents: response.body.map((note) => note.content),
		response,
	}
}

const getUsers = async () => {
	const usersDB = await User.find({})
	return usersDB.map((user) => user.toJSON())
}

module.exports = { initialNotes, api, getAllContentFromNotes, getUsers }
