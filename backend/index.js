import db_functions from "./db_functions.js"
import express from "express"

const PORT = process.env.PORT || 3001
const app = express()

app.get("/hostname", async(req, res) => {
    const hostname = await db_functions.dbHandler.getHost()
    return res.json({host: hostname})
})

app.post("/login", async(req, res) => {
    return res.json({Message: "OK"})
})

app.listen(PORT, () => {
    db_functions.dbHandler.seqConnect()
    db_functions.dbHandler.checkAdmin()
    console.log(`Server listening on ${PORT}`)
})