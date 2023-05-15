import { Sequelize, DataTypes } from "sequelize"
import { dirname } from 'path'
import path from "path"
import { fileURLToPath } from "url"
import PromptSync from "prompt-sync"
import chalk from "chalk"
import passwordHandler from "./passwordHandler.cjs"

const prompt = PromptSync()
const log = console.log

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, "/db/personalCS.db"),
    logging: false
})

// Models
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    screenName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    resetPassword: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    passwordCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    administrator: {
        type: DataTypes.STRING,
        allowNull: false
    },
    host: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
})

const dbHandler = {
    seqConnect: async () => {
        try {
            await sequelize.authenticate()
            log(chalk.bgBlack(chalk.green('\nConnection has been established successfully to the local database.')))
        } catch (error) {
            error(chalk.bgBlack(chalk.red('\n\nUnabled to connect to the database: ', error)))
        }
    },
    checkAdmin: async () => {
        await sequelize.sync({ force: false })
        const users = await User.findAll()
        if (users[0]) {
            log(chalk.bgBlack(chalk.greenBright("\n\nAdministrator account found...\nAwaiting connections.")))
        }
        else {
            log(chalk.bgBlack(chalk.yellow("\n\n*********************************\nNo administrator account found...\nStarting inital admin creation.  \n*********************************")))
            dbHandler.createAdmin()
        }
    },
    createAdmin: () => {
        log(chalk.bgBlack(chalk.redBright("\n\nBEWARE:"), chalk.white("You are creating the inital administrator account. Double-check your information to make sure that it is set up properly!\n")))
        const firstName = prompt(chalk.bgBlack("What is the first name: " + chalk.greenBright("> ")))
        log("")
        const lastName = prompt(chalk.bgBlack("What is the last name: " + chalk.greenBright("> ")))
        log("")
        const screenName = prompt(chalk.bgBlack("What is the screen name (nickname): " + chalk.greenBright("> ")))
        log("")
        const email = prompt(chalk.bgBlack("What is the email: " + chalk.greenBright("> ")))
        log("")
        dbHandler.validatePassword(firstName, lastName, screenName, email)
    },
    validatePassword: (firstName, lastName, screenName, email) => {
        const password = prompt.hide(chalk.bgBlack("Please enter your password: " + chalk.greenBright("> ")))
        log("")
        const validatePassword = prompt.hide(chalk.bgBlack("Please validate your password: " + chalk.greenBright("> ")))
        log("")
        if (password === validatePassword) {
            log(chalk.greenBright("Passwords matched..."))
            let hash = passwordHandler.hashPassword(password)
            dbHandler.createNewAdmin(firstName, lastName, screenName, email, hash, true, true)
        }
        else {
            log(chalk.red("Passwords did not match...\n"), "Please retry entering it.\n")
            dbHandler.validatePassword()
        }
    },
    createNewAdmin: async (firstName, lastName, screenName, email, password, admin, host) => {
        try {
            const newAdmin = await User.create({ firstName: firstName, lastName: lastName, screenName: screenName, email: email, password: password, administrator: admin, host: host })
            log(chalk.bgBlack(chalk.cyan("\n\n============================================================\n\nAdmin account for " + screenName + " has been created.")))
            log(chalk.bgBlack(chalk.greenBright("\n\n\nThe server is online, and your administrator account has been created.")))
        } catch(err) {
            log(chalk.red("ERROR: ") + err)
        }
    },
    getHost: async() => {
        try{
            const hostName = await User.findOne({
                where: {
                    host: true
                }
            })
            return hostName.screenName
        } catch(err) {
            return {"Error: ": err}
        }
    },
    loginUser: async(email, password) => {
        try{
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            let verify = passwordHandler.checkHash(password, user.password)
            if(verify){
                return true
            }
            else{
                return false
            }
        } catch(err){
            return err
        }
    }
}

export default { dbHandler }