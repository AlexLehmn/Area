const { Octokit } = require('octokit');
const { github_token } = require('./config.json');
const { sendMessage, isChannelManagedByBot } = require('./discord-bot.js');
const { sendMail } = require('./mail.js');
const db = require('../db.js');
const octokit = new Octokit({
    auth: github_token
});

async function githubConfig(req, res, data) {
    const owner = req.body.owner;
    const repos = req.body.repos;
    var endpoint;
    switch (data.action) {
        case "newPullRequest":
            endpoint = "pulls";
            break;
        case "newIssue":
            endpoint = "issues";
            break;
        case "newPush":
            endpoint = "commits";
            break;
        default:
            break;
    }
    try {
        const result = await octokit.request("GET /repos/{owner}/{repos}/"+endpoint, {
            owner: owner,
            repos: repos
        });
        if (data.reaction == "sendMail") {
            return ({
                "lastUrl": (result.data.length == 0) ? "NULL" : result.data[0].html_url,
                "owner": owner,
                "repos": repos,
                "receiver": req.body.receiver
            })
        } else if (data.reaction == "messageDiscord") {
            return ({
                "lastUrl": (result.data.length == 0) ? "NULL" : result.data[0].html_url,
                "owner": owner,
                "repos": repos,
                "channelID": req.body.channelID
            })
        }
    } catch (err) {
        return ({ error: err })
    }
}

async function githubRun(serviceData) {
    var config = JSON.parse(serviceData.config);
    var endpoint;
    switch (serviceData.action) {
        case "newPullRequest":
            endpoint = "pulls";
            break;
        case "newIssue":
            endpoint = "issues";
            break;
        case "newPush":
            endpoint = "commits";
            break;
        default:
            break;
    }
    const owner = config.owner;
    const repos = config.repos;
    try {
        const result = await octokit.request("GET /repos/{owner}/{repos}/"+endpoint, {
            owner: owner,
            repos: repos
        });
        const new_url = (result.data.length == 0) ? "NULL" : result.data[0].html_url;
        if (result.data.length != 0 && new_url != config.lastUrl) {
            if (serviceData.reaction === "messageDiscord" &&
                isChannelManagedByBot(config.channelID) === "KO") {
                return;
            }
            config.lastUrl = new_url;
            const query = "UPDATE services SET config=? WHERE service_id=?";
            db.query(query, [JSON.stringify(config), serviceData.service_id], (err) => {
                if (err) {
                    console.log(err);
                } else {
                    const content = {
                        "newPullRequest": "pull request",
                        "newPush": "push",
                        "newIssue": "issue"
                    }
                    const message = "There is a new "+content[serviceData.action]+" on repository "+config.owner+"/"+config.repos+"!\n"+config.lastUrl;
                    if (serviceData.reaction === "messageDiscord") {
                        sendMessage(message, config.channelID);
                    } else if (serviceData.reaction === "sendMail") {
                        sendMail(serviceData.receiver, "Github AREA update", message);
                    }
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { githubConfig, githubRun }