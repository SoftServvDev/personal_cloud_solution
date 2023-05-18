import db_functions from "./db_functions.js"
import express from "express"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import sessions from 'express-session'
import cookieParser from "cookie-parser"

dotenv.config()

const PORT = process.env.PORT
const app = express()


// Session configs (4hr)

var session
const oneTerm = 1000 * 60 * 60 * 4
app.use(sessions({
    secret: process.env.SESSION_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneTerm },
    resave: false
}))

app.use(cookieParser())

const jsonParser = bodyParser.json()

app.get("/hostname", async(req, res) => {
    const hostname = await db_functions.dbHandler.getHost()
    return res.json({host: hostname})
})

app.post("/login", jsonParser, async(req, res) => {
    let result = await db_functions.dbHandler.loginUser(req.body.email, req.body.password)
    if(result.verify===true){
        session = req.session
        session.userid = result.user.id
        console.log(req.session)
        return res.json({"StatusMessage": 200})
    }
    else{
        res.send("Invalid username or password")
    }
})

app.get("/folders", async(req, res) => {
    if(req.session){
        return res.json({"StatusMessage":"Made it"})
    }
    else{
        return res.json({"StatusMessage":"Didnt make it"})
    }
})

app.get("/logout", (req,res) => {
    req.session.destroy()
    res.redirect('/')
})

app.listen(PORT, () => {
    db_functions.dbHandler.seqConnect()
    db_functions.dbHandler.checkAdmin()
    console.log(`Server listening on ${PORT}`)
})