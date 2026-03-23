<<<<<<< HEAD
const episodesScrapers = require("../scrapers/episodes")
const redis = require("../configs/redis")


const episodeControllers = async(req,res,next)=>{
    try{
        const {id,season} = req.query;
        const key = `${id}-${season}`
=======
const episodeScraper = require("../scrapers/episodes")
const redis = require("../configs/redis")

const episodeController = async(req,res,next)=>{
    try{
        const slug = req.query.id
    const season = req.query.season || 1
    const key = `${slug}x${season}`
>>>>>>> recovery-branch
    const cachedData = await redis.get(key)
    if(cachedData){
        res.json({
            success: true,
<<<<<<< HEAD
            message: "Redis Found!!",
            results: cachedData
        })
    }
    const results = await episodesScrapers(id,season)
    await redis.set(key,results,{
        ex: 86400
    })
    res.json({
        success:true,
        message: "Data scraped!!",
=======
            message: "redis found",
            results: cachedData
        })
    }
    const results = await episodeScraper(slug,season)
    await redis.set(key,results,{
        ex: 86000
    })
    res.json({
        success:true,
        message: "data scraped!!",
>>>>>>> recovery-branch
        results
    })
    }catch(err){
        next(err)
    }
}

<<<<<<< HEAD

module.exports = episodeControllers
=======
module.exports = episodeController
>>>>>>> recovery-branch
