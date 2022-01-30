import express from 'express'

const routes = express.Router()
routes.get('/healthcheck', async (req, res) => res.status(200).json({ message: "Health is OK" }))

export default routes