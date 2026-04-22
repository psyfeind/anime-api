const { default: axios } = require("axios");
const cheerio = require("cheerio")
const url = require("../../utils/Base_V5")
const header = require("../../configs/headers")
const helper = require("./helper")

const infiScraper = async (anime_id) => {
    try {
        const { data } = await axios.get(`${url}/movies/${anime_id}/`, { headers: header })
        const $ = await cheerio.load(data)
        const title = $(".fg1 .entry-title").text().trim()
        const descriptionDiv = $(".description");

        // First <p> = Story
        const overview = descriptionDiv.find("p").first().text().trim();

        // Remaining <p> tags
        const details = descriptionDiv.find("p").slice(1);

        const languages = [];
        $('#menu-item-4819 a').each((i, el) => {
            languages.push($(el).text().trim());
        });
        const run_time = $(".duration").text().trim()
        const genres = $(".genres a").map((i, el) => $(el).text().trim()).get();
        const year = $(".year").text().trim()
        const seasons = $(".seasons").text().trim().replace("Seasons", "").trim()
        const episodes = $(".entry-meta .episodes").text().trim().replace("Episodes", "").trim()
        const rating = $(".vote-cn .vote").text().replace("TMDB", "").trim()
        const poster = "https:" + $(".dfxb img").attr("src")
        const stream = await helper(anime_id)
        const results = {
            title,
            anime_id,
            poster,
            overview,
            languages,
            run_time,
            genres,
            year,
            rating,
            stream
        }
        console.log(results)
        return results
    } catch (err) {
        console.log(err)
    }
}
infiScraper("miraculous-world-shanghai-the-legend-of-ladydragon")
module.exports = infiScraper