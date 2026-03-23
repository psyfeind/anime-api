const episodeScraper = require("../scrapers/episodes")
const redis = require("../configs/redis")

const episodeController = async(req,res,next)=>{
    try{
        const slug = req.query.id
    const season = req.query.season || 1
    const key = `${slug}x${season}`
    const cachedData = await redis.get(key)
    if(cachedData){
        res.json({
            success: true,
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
        results
    })
    }catch(err){
        next(err)
    }
}

module.exports = episodeController