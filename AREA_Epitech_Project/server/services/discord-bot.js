const { discord_token, github_token, discord_client_id } = require('./config.json');
const Discord = require('discord.js');
const { Octokit } = require('octokit');
const octokit = new Octokit({
    auth: github_token
});
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });

const deployDiscordCommands = () => {
    const rest = new Discord.REST({ version: '10' }).setToken(discord_token);
    rest.get(Discord.Routes.applicationCommands(discord_client_id))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${(Discord.Routes.applicationCommands(discord_client_id))}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return (Promise.all(promises));
        });
    const commands = [
        new Discord.SlashCommandBuilder()
            .setName('newpush')
            .setDescription('Start notifying new pushs on a github user repo in this channel.')
            .addStringOption(option =>
                option.setName('user')
                    .setDescription('Name of the owner of the repo (user repo only).')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('repo')
                    .setDescription('Name of the repo (user repo only).')
                    .setRequired(true)),
        new Discord.SlashCommandBuilder()
            .setName('newredditpost')
            .setDescription('Start notifying new reddit posts from a specific subreddit in this chat.')
            .addStringOption(option =>
                option.setName('subreddit')
                    .setDescription('Name of the subreddit.')
                    .setRequired(true)),
        new Discord.SlashCommandBuilder()
            .setName('newtweet')
            .setDescription('Start notifying new tweets from a specific user in this chat.')
            .addStringOption(option =>
                option.setName('username')
                    .setDescription('Name of the user to track.')
                    .setRequired(true))
    ].map(command => command.toJSON());
    (async () => {
        try {
            const data = await rest.put(
                Discord.Routes.applicationCommands(discord_client_id),
                { body: commands }
            );
        } catch (error) {
            console.error(error);
        }
    })();
}

const createGithubWebhook = async (repoOwner, repoName, payloadURL) => {
    await octokit.request('POST /repos/' + repoOwner + '/' + repoName + '/hooks', {
        owner: repoOwner,
        repo: repoName,
        name: 'web',
        active: true,
        events: [
            'push'
        ],
        config: {
            url: payloadURL+'/github',
            content_type: 'json',
            insecure_ssl: '0'
        }
    }).then((res) => {
        return (res.data.id);
    }).catch(console.error)
}

const startDiscordBot = () => {
    client.once('ready', () => {
        console.log('Discord bot is on!');
        //const test = client.channels.cache.get("1028");
        //if (!test)
        //    client.channels.cache.get("1028322115079917688").send("test");
    });
    client.on('interactionCreate', async interaction => {
        const { commandName } = interaction;

        if (!interaction.isChatInputCommand()) return;
        if (commandName === 'newpush') {
            const user = interaction.options.getString('user');
            const repo = interaction.options.getString('repo');

            interaction.channel.createWebhook({
                name: 'Github-Push-Notif'
            })
                .then(webhook => {
                    createGithubWebhook(user, repo, webhook.url);
                    console.log('Connected webhook '+webhook.id+'\nTo repository '+user+'/'+repo);
                }).catch(console.error)
            await (interaction.reply('Connection created with repository '+user+'/'+repo));
        }
    });
    client.login(discord_token);
}

function sendMessage(message, channelID) {
    client.channels.cache.get(channelID).send(message);
}

function isChannelManagedByBot(channelID) {
    if (!client.channels.cache.get(channelID)) {
        return ({ result: "KO" })
    }
    return ({ result: "OK" })
}

module.exports = { startDiscordBot, sendMessage, isChannelManagedByBot }
deployDiscordCommands()