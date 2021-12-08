const ERROR_HANDLERS = {
	CastError: (res) => res.status(400).send({ error: "id used is malformed" }),
	ValidationError: (res, { message }) =>
		res.status(409).send({ error: message }),
	JsonWebTokenError: (res) => res.status(401).json({ error: "invalid token" }),
	defaultError: (res) => res.status(500),
	TokenExpiredError: (res) => res.status(404).json({ error: "token expired" }),
}

module.exports = (err, req, res, next) => {
	console.error(err.name)
	const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
	handler(res, err)
}
