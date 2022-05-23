const { Client, Collection, Intents } = require('discord.js');
const { readdirSync } = require('node:fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

require('dotenv').config();

const functions = readdirSync(__dirname + '/Functions').filter(file => file.endsWith('.js'));
const eventFiles = readdirSync(__dirname + '/Events').filter(file => file.endsWith('.js'));
const commandFolders = readdirSync(__dirname + '/SlashCommands');

(async () => {
	for (const file of functions) {
		require(__dirname + `/Functions/${file}`)(client);
	}
	client.handleEvents(eventFiles, __dirname + '/Events');
	client.handleCommands(commandFolders, __dirname + '/SlashCommands');
	client.dbConnect();
	client.login(process.env.DISCORD_TOKEN);
})();