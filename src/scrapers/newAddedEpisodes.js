const { default: axios } = require("axios");
const cheerio = require("cheerio");
const url = require("../utils/Base_V5");
const headers = require("../configs/headers");

const newAddedScraper = async () => {
    try {
        const { data } = await axios.get(`${url}/home/`, {
            headers: headers
        });

        const $ = cheerio.load(data);
        const results = [];

        $(".post-lst li").each((_, el) => {

            const episodeCode = $(el).find(".num-epi").text().trim();
            if (!episodeCode) return;

            const [season, episode] = episodeCode.split("x");

            const fullTitle = $(el).find(".entry-title").text().trim();
            const title = fullTitle.replace(/\s\d+x\d+$/, "");

            const href = $(el).find("a.lnk-blk").attr("href");

            let anime_id = href
                ?.replace(`${url}/episode/`, "")
                ?.replace("/", "");

            anime_id = anime_id?.replace(/[-]?\d+x\d+$/, "");

            const imgTag = $(el).find("img");

            let poster =
                imgTag.attr("data-src") ||
                imgTag.attr("data-lazy-src") ||
                imgTag.attr("data-original") ||
                imgTag.attr("src");

            if (poster && poster.startsWith("data:image")) {
                poster = null;
            }

            if (poster && poster.startsWith("//")) {
                poster = "https:" + poster;
            }

            results.push({
                title,
                anime_id,
                season,
                episode,
                poster
            });
        });

        return results;

    } catch (err) {
        console.error("Scraper Error:", err.message);
    }
};

module.exports = newAddedScraper;