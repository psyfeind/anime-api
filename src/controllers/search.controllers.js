const searchScraper = require("../scrapers/search")

const searchScraper = async(req,res)=>{
    const keyword = req.query.keyword
    const page = req.query.page
    const results = await searchScraper(keyword,page)
    
}