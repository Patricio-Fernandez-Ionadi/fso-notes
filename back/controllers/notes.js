const notesRouter = require("express").Router()
const userExtractor = require("../middlewares/userExtractor")

const Note = require("../models/Note")
const User = require("../models/User")

notesRouter.get("/", async (req, res) => {
	const notes = await Note.find({}).populate(
		"user",
		{ username: 1, name: 1 },
		User
	)
	res.json(notes)
})
/* notesRouter.get("/", (req, res) => {
	Note.find({})
		.then((notes) => {
			res.json(notes)
		})
}) */

notesRouter.post("/", userExtractor, async (req, res, next) => {
	const { content, important = false } = req.body
	const { userId } = req

	const user = await User.findById(userId)

	if (!content) {
		return res.status(400).json({
			error: 'required "content" field is missing',
		})
	}

	const newNote = new Note({
		content,
		important,
		date: new Date(),
		user: user._id,
	})

	try {
		const savedNote = await newNote.save()

		user.notes = user.notes.concat(newNote._id)
		await user.save()

		res.json(savedNote)
	} catch (err) {
		next(err)
	}
})
/* app.post("/api/notes", (req, res, next) => {
	const note = req.body

	if (!note || !note.content) {
		return res.status(400).json({
			error: 'required "content" field is missing',
		})
	}

	const newNote = new Note({
		content: note.content,
		important: typeof note.important !== "undefined" ? note.important : false,
		date: new Date(),
	})

	newNote
		.save()
		.then((savedNote) => {
			res.json(savedNote)
		})
		.catch((err) => next(err))
}) */

notesRouter.put("/:id", userExtractor, (req, res, next) => {
	const { id } = req.params
	const note = req.body

	const newNoteInfo = {
		content: note.content,
		important: note.important,
	}

	Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
		.then((note) => {
			res.status(200).json(note).end()
		})
		.catch((err) => next(err))
})

notesRouter.delete("/:id", userExtractor, async (req, res, next) => {
	const { id } = req.params
	try {
		await Note.findByIdAndDelete(id)
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})
/* app.delete("/api/notes/:id", (req, res, next) => {
	const { id } = req.params
	Note.findByIdAndDelete(id)
		.then((note) => {
			res.status(204).end()
		})
		.catch((err) => next(err))
}) */

notesRouter.get("/:id", (req, res, next) => {
	const { id } = req.params
	Note.findById(id)
		.then((note) => {
			if (note) return res.json(note)
			res.status(404).end()
		})
		.catch((err) => next(err))
})

module.exports = notesRouter
