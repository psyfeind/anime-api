const infoScraper = require("../scrapers/info")

const infoController = async(req,res,next)=>{
    try{
    const anime_id = req.query.id
    const results = await infoScraper(anime_id)
    var data
    if((results.title || results.poster) == ""){
        data = {
            success: false,
            message: "Data Not Found !!",
            results
        }
    }
    else{
        data = {
            success: true,
            message: "Data Found !!",
            results
        }
    }

    res.json(data)
    }catch(err){
        next(err)
    }
}

module.exports = infoController