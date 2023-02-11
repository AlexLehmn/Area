const axios = require('axios');
const config = require('./config.json');
const { sendMessage, isChannelManagedByBot } = require('./discord-bot.js');
const { sendMail } = require('./mail.js');
const authorization = "Bearer " + config.twitter_bearer_token;
const db = require('../db.js');

async function getUserByUsername(username) {
    const getIdUrl = "https://api.twitter.com/2/users/by/username/" + username;
    try {
        const response = await axios.get(getIdUrl, {
            headers: {
                "User-Agent": "v2UserTweetsJS",
                "authorization": authorization
            }
        })
        return (response);
    } catch (error) {
        return ({ "error": error });
    }
}

// response.data.meta.newest_id
async function getUserTweets(username) {
    const user = await getUserByUsername(username);
    if (user.error) {
        return ({ "error": user.error });
    }
    const userId = user.data.data.id;
    const getTweetsUrl = "https://api.twitter.com/2/users/" + userId + "/tweets";
    try {
        const response = await axios.get(getTweetsUrl, {
            headers: {
                "User-Agent": "v2UserTweetsJS",
                "authorization": authorization
            }
        })
        return (response);
    } catch (error) {
        return ({ "error": error });
    }
}

// response.data.data.text
async function getTweetFromId(id) {
    const url = "https://api.twitter.com/2/tweets/" + id;
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "v2UserTweetsJS",
                "authorization": authorization
            }
        })
        return (response);
    } catch (error) {
        return ({ "error": error });
    }
}

async function twitterConfig(req, res, data) {
    const twitterUser = req.body.twitterUser;
    const userTweets = await getUserTweets(twitterUser);
    const newestID = userTweets.data.meta.newest_id;
    return ({
        "twitterUser": twitterUser,
        "newestID": (!newestID) ? "NULL" : newestID
    })
}

async function twitterRun(serviceData) {
    const reaction = serviceData.reaction;
    var config = JSON.parse(serviceData.config);
    if (reaction === "messageDiscord" &&
    isChannelManagedByBot(config.channelID).result === "KO") {
        return;
    }
    const userTweets = await getUserTweets(config.twitterUser);
    if (userTweets.err) {
        return;
    }
    const newestID = (!userTweets.data.meta.newest_id) ? "NULL" : userTweets.data.meta.newest_id;
    if (newestID != config.newestID) {
        const newTweet = await getTweetFromId(newestID);
        config.newestID = newestID;
        const query = "UPDATE services SET config=? WHERE service_id=?";
        db.query(query, [config, serviceData.service_id], (err) => {
            if (err) {
                console.log(err);
            } else {
                const message = "There is a new tweet by "+config.twitterUser+"!\n"+newTweet.data.data.text;
                if (serviceData.reaction === "messageDiscord") {
                    sendMessage(message, config.channelID);
                } else if (serviceData.reaction === "sendMail") {
                    sendMail(serviceData.receiver, "Twitter AREA update", message);
                }
            }
        })
    }
}

module.exports = { twitterConfig, twitterRun }