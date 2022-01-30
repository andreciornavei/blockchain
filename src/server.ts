import http from 'http'
import { app } from "./app"
require("dotenv").config({ path: ".env" })

const server = new http.Server(app)
server.listen(process.env.HTTP_PORT || 1337, () => {
    console.log(`Server started on http://localhost:${process.env.HTTP_PORT || 1337}`)

})