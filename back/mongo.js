const mongoose = require("mongoose")

const { mongo_db_uri, mongo_bd_uri_test, NODE_ENV } = process.env

const connectionString = NODE_ENV === "test" ? mongo_bd_uri_test : mongo_db_uri

mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
		// useCreateIndex: true,
	})
	.then(() => {
		console.log("DataBase Connected")
	})
	.catch((err) => {
		console.error(err)
	})

process.on("uncaughtException", (error) => {
	console.error(error)
	mongoose.disconnect()
})
