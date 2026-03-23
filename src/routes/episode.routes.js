const episodeController = require("../controllers/episode.controllers")
const express = require("express")

const episodeRouter = express.Router()

episodeRouter.get("/",episodeController)

module.exports = episodeRouter