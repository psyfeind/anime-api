<<<<<<< HEAD
const episodeControllers = require("../controllers/episode.controllers")
const express = require("express")

const episodeRoute = express.Router()

episodeRoute.get("/",episodeControllers)

module.exports = episodeRoute
=======
const episodeController = require("../controllers/episode.controllers")
const express = require("express")

const episodeRouter = express.Router()

episodeRouter.get("/",episodeController)

module.exports = episodeRouter
>>>>>>> recovery-branch
