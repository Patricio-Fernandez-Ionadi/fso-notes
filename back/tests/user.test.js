const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { server } = require("../index")

const { api, getUsers } = require("./helpers")
const User = require("../models/User")

describe("POST user", (req, res) => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash("12test", 10)
		const user = new User({
			username: "PokerRoot",
			passwordHash,
			name: "PatricioRoot",
		})
		await user.save()
	})

	test("create a new fresh user", async () => {
		const usersAtStart = await getUsers()

		const newUser = {
			name: "nuevo usuario test",
			username: "testinguser",
			password: "test",
		}

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const usersAtEnd = await getUsers()

		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map((u) => u.username)

		expect(usernames).toContain(newUser.username)
	})

	test("creation fails with proper statuscode and message if username is already taken", async () => {
		const usersAtStart = await getUsers()

		const newUser = {
			username: "PokerRoot",
			name: "nombreRandom",
			password: "12test",
		}

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		expect(result.body.errors.username.message).toContain(
			"`username` to be unique"
		)

		const usersAtEnd = await getUsers()

		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	afterAll(() => {
		mongoose.connection.close()
		server.close()
	})
})
