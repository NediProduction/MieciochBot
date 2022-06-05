const { Client, Collection, Intents } = require('discord.js');
const { readdirSync } = require('node:fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

require('dotenv').config();

const functions = readdirSync(__dirname + '/Functions').filter(file => file.endsWith('.js'));
const eventFolders = readdirSync(__dirname + '/Events');
const commandFolders = readdirSync(__dirname + '/Commands');

(async () => {
	for (const file of functions) {
		require(__dirname + `/Functions/${file}`)(client);
	}
	await client.handleEvents(eventFolders, __dirname + '/Events');
	await client.handleCommands(commandFolders, __dirname + '/Commands');
	await client.dbConnect();
	await client.login(process.env.DISCORD_TOKEN);
})();