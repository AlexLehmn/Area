const bcrypt = require('bcrypt');
const { redditConfig } = require('./services/reddit.js');
const { githubConfig } = require('./services/github.js');
const { twitterConfig } = require('./services/twitter.js');
const { isChannelManagedByBot } = require('./services/discord-bot.js');
const express = require('express');
const db = require('./db.js');
const router = express.Router();

router.post('/register', (req, res) => {
    const saltRounds = 10
    const username = (req.body.username) ? req.body.username : req.params.username
    const query = "SELECT * FROM users WHERE name=?"
    db.query(query, username, (err, result) => {
        if (err) {
            res.send({ error: "An error occured." })
        } else if (result.length > 0) {
            res.send({ error: "An account with this username already exist." })
        } else {
            const password = (req.body.password) ? req.body.password : req.params.password;
            const email = "NULL";
            const query = "INSERT INTO users (name, password, email) VALUES (?, ?, ?)"
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    res.send({ error: "An error occured. Please try again." })
                } else {
                    db.query(query, [username, hash, email], (err) => {
                        if (err) {
                            res.send({ error: "An error occured. Please try again." })
                        } else {
                            res.send({ message: "User successfully created." })
                        }
                    })
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = "SELECT * FROM users WHERE name=?";
    db.query(query, username, (err, result) => {
        if (err) {
            res.send({ error: "An error occured." });
        } else if (!result || result.length == 0) {
            res.send({ error: "Incorrect username or password." });
        } else {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err) {
                    res.send({ error: "Incorrect username or password." });
                } else if (response) {
                    res.send({ message: "User connected." });
                } else {
                    res.send({ error: "Incorrect username or password." });
                }
            })
        }
    })
})

const createReaction_sendMail = (req, res, data, config) => {
    const query = "INSERT INTO services (user_id, service, action, reaction, config) VALUES (?, ?, ?, ?, ?)";
    data.db.query(query, [data.userid, data.service, data.action, data.reaction, JSON.stringify(config)], (err, result) => {
        if (err) {
            res.send({ error: "An error occured.", code: 302 })
            console.log(err)
        } else {
            res.send({ message: "AREA was created." })
        }
    })
}

const createReaction_messageDiscord = (req, res, data, config) => {
    if (isChannelManagedByBot(req.body.channelID).result == "KO") {
        res.send({ error: "This channel ID does not exist or the bot is not installed on your server." })
    } else {
        const query = "INSERT INTO services (user_id, service, action, reaction, config) VALUES (?, ?, ?, ?, ?)";
        data.db.query(query, [data.userid, data.service, data.action, data.reaction, JSON.stringify(config)], (err, result) => {
            if (err) {
                res.send({ error: "An error occured.", code: 302 })
            } else {
                res.send({ message: "AREA was created." })
            }
        })
    }
}

router.post('/setup-area', async function (req, res) {
    if (!req.body.service) {
        res.send({ error: "Service parameter is missing in request body." })
    }
    const query = "SELECT id FROM users WHERE name=?";
    const result = db.query(query, req.body.username, async function (err, result) {
        if (err) {
            res.send({ error: "An error occured.", code: 301 })
        } else {
            const data = {
                "db": db,
                "service": req.body.service,
                "action": req.body.action,
                "reaction": req.body.reaction,
                "userid": result[0].id
            }
            const mapConfigs = {
                "reddit": redditConfig,
                "github": githubConfig,
                "twitter": twitterConfig
            }
            const config = await mapConfigs[data.service](req, res, data);
            const mapReactions = {
                "sendMail": createReaction_sendMail,
                "messageDiscord": createReaction_messageDiscord
            }
            mapReactions[data.reaction](req, res, data, config);
        }
    })
})

router.get('/getUserServices', (req, res) => {
    var query = "SELECT id FROM users WHERE name=?";
    var result = db.query(query, req.body.username)
    query = "SELECT * FROM services WHERE user_id=?";
    db.query(query, result.id, (err, result) => {
        if (err) {
            res.send({ error: "Couldn't retrieve user services." });
        } else {
            res.send(result);
        }
    })
})

module.exports = router