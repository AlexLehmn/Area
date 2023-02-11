const express = require('express');
const cors = require('cors');
const { startDiscordBot } = require('./services/discord-bot.js');
const { redditRun } = require('./services/reddit.js');
const { githubRun } = require('./services/github.js');
const { twitterRun } = require('./services/twitter.js');
const router = require('./routes.js');
const db = require('./db.js');
const app = express();

async function getServices() {
    setInterval(() => {
        const query = "SELECT * FROM services";
        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (const row in result) {
                    switch (result[row].service) {
                        case "reddit":
                            redditRun(result[row])
                            break;
                        case "github":
                            githubRun(result[row])
                            break;
                        case "twitter":
                            twitterRun(result[row])
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    }, 2000)
}

const startServer = () => {
    app.use(express.json());
    app.use(cors());
    app.use('/', router);
    startDiscordBot()
    getServices()
    app.listen('8080', () => {
        console.log("Server listening on port 8080");
    })
}

startServer()