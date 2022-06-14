const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('node:fs');
const chalk = require('chalk');
const config = require(__dirname + '/../Config/config.json');

module.exports = (client) => {
	client.handleCommands = async (commandFolders, path) => {
		client.commandArray = [];
		for (const folder of commandFolders) {
			const commandFiles = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(__dirname + `/../Commands/${folder}/${file}`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

		(async () => {
			try {
				console.log(chalk.yellow.bold('[CLIENT]: Started refreshing application (/) commands.'));
				await rest.put(Routes.applicationGuildCommands(config.client.id, config.guild.id), {
					body: client.commandArray,
				});
				console.log(chalk.green.bold('[CLIENT]: Successfully reloaded application (/) commands.'));
			} catch (error) {
				console.error(error);
			}
		})();
	};
};
