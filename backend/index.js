import db_functions from "./db_functions.js"
import express from "express"
import bodyParser from "body-parser"

const PORT = process.env.PORT || 3001
const app = express()

const jsonParser = bodyParser.json()

app.get("/hostname", async(req, res) => {
    const hostname = await db_functions.dbHandler.getHost()
    return res.json({host: hostname})
})

app.post("/login", jsonParser, async(req, res) => {
    let result = await db_functions.dbHandler.loginUser(req.body.email, req.body.password)
    console.log(result)
    if(result === true){
        return res.json({statusMessage: 200})
    }
    else{
        return res.json({statusMessage: "Error"})
    }
})

app.listen(PORT, () => {
    db_functions.dbHandler.seqConnect()
    db_functions.dbHandler.checkAdmin()
    console.log(`Server listening on ${PORT}`)
})