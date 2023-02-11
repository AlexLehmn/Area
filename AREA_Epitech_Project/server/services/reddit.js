const axios = require('axios');
const { sendMessage, isChannelManagedByBot } = require('./discord-bot.js');
const { sendMail } = require('./mail.js');
const db = require('../db.js');

async function getPageJson(url) {
    try {
        const response = await axios.get(url)
        return (response);
    } catch (error) {
        return ({ "error": error });
    }
}

async function getConfig(req, res, data, jsonLink) {
    const subreddit = req.body.subreddit;
    const url = "https://www.reddit.com/r/" + subreddit + "/" + jsonLink;
    const pageJson = await getPageJson(url);
    if (pageJson.error) {
        return ({ "error": pageJson.error });
    } else {
        const permaLink = pageJson.data.data.children[0].data.permalink;
        const permaUrl = "https://www.reddit.com" + permaLink;
        if (data.reaction == "sendMail") {
            return ({
                actualUrl: permaUrl,
                subreddit: subreddit,
                receiver: req.body.receiver
            })
        } else if (data.reaction == "messageDiscord") {
            return ({
                actualUrl: permaUrl,
                subreddit: subreddit,
                channelID: req.body.channelID
            })
        }
    }
}

async function redditConfig(req, res, data) {
    var jsonUrl = "NULL";
    if (data.action == "newPost") {
        jsonUrl = "new.json";
    } else if (data.action == "topPostToday") {
        jsonUrl = "top.json";
    } else if (data.action == "topPost") {
        jsonUrl = "top.json?t=all";
    }
    const config = await getConfig(req, res, data, jsonUrl);
    return (config);
}

async function redditCompare(serviceData, config) {
    var jsonUrl = "NULL";
    if (serviceData.action == "newPost") {
        jsonUrl = "new.json";
    } else if (serviceData.action == "topPostToday") {
        jsonUrl = "top.json";
    } else if (serviceData.action == "topPost") {
        jsonUrl = "top.json?t=all";
    }
    const subreddit = config["subreddit"];
    const url = "https://www.reddit.com/r/" + subreddit + "/" + jsonUrl;
    const pageJson = await getPageJson(url);
    if (pageJson.error) {
        return ({ error: "Couldn't retrieve reddit page." });
    } else {
        const permaLink = pageJson.data.data.children[0].data.permalink;
        const permaUrl = "https://www.reddit.com" + permaLink;
        if (permaUrl === config["actualUrl"]) {
            return ({
                result: "OK"
            })
        } else {
            return ({
                result: "KO",
                url: permaUrl
            })
        }
    }
}

async function redditRun(serviceData) {
    var config = JSON.parse(serviceData.config);
    const comparison = await redditCompare(serviceData, config);
    if (comparison.result === "KO") {
        if (serviceData.reaction == "messageDiscord" &&
            isChannelManagedByBot(config.channelID).result === "KO") {
                return;
            }
        config.actualUrl = comparison.url;
        const query = "UPDATE services SET config=? WHERE service_id=?";
        db.query(query, [JSON.stringify(config), serviceData.service_id], (err) => {
            if (err) {
                console.log(err);
            } else {
                const message = "There is a new post on r/"+config.subreddit+"!\n"+config.actualUrl;
                if (serviceData.reaction === "messageDiscord") {
                    sendMessage(message, config.channelID);
                } else if (serviceData.reaction === "sendMail") {
                    sendMail(serviceData.receiver, "Reddit AREA update", message);
                }
            }
        })
    }
}

module.exports = { redditConfig, redditRun }