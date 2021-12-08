// variable to avoid lint errors while writting ¡¡¡coment when finsh!!!
const cy = {}

describe("Note App", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000")

		cy.request("POST", "http://localhost:3001/api/testing/reset")

		const user = {
			username: "PokerRoot",
			name: "PatricioRoot",
			password: "12test",
		}

		cy.request("POST", "http://localhost:3001/api/users", user)
	})

	it("frontpage can be opened", () => {
		cy.contains("Notes")
	})

	it("user can login", () => {
		cy.contains("Show Login").click()
		cy.get("[placeholder='Username']").type("PokerRoot")
		cy.get("input").last().type("12test")
		cy.get("#form-login-button").click()
	})

	it("login fails with wrong password", () => {
		cy.contains("Show Login").click()
		cy.get("[placeholder='Username']").type("PokerRoot")
		cy.get("input").last().type("password-incorrecta")
		cy.get("#form-login-button").click()

		cy.get(".error")
			.should("contain", "Wrong credentials")
			.should("have.css", "color", "rgb(255, 0, 0)")
			.should("have.css", "border-style", "solid")
	})

	describe("When logged in", () => {
		beforeEach(() => {
			cy.login({ username: "PokerRoot", password: "12test" })
		})

		it("a new note can be created", () => {
			cy.contains("New Note").click()
			cy.get("input").type("a note created by cypress")
			cy.contains("save").click()
			cy.contains("a note created by cypress")
		})

		describe("and a note exists", () => {
			beforeEach(() => {
				cy.createNote("This is de first note")
				cy.createNote("This is de sencond note")
				cy.createNote("This is de third note")
			})

			it("can be made important", () => {
				cy.contains("This is de first note").as("firstNote")

				cy.get("@firstNote").contains("make important").click()
				cy.get("@firstNote").contains("make not important")
			})
		})
	})
})
