const chalk = require('chalk');
const dayjs = require('dayjs');
const { ActivityType } = require('discord.js');
const { loadCommands } = require('../../Handlers/Commands');
const { loadButtons } = require('../../Handlers/Buttons');
const { loadSelectMenus } = require('../../Handlers/SelectMenus');
const { loadDatabase } = require('../../Handlers/Database');

module.exports = {
	id: 'Client/Ready',
	name: 'ready',
	once: true,
	async execute(client) {
		await loadCommands(client);
		await loadButtons(client);
		await loadSelectMenus(client);
		await loadDatabase(client);
		console.log(chalk.hex('#E37FA1').bold(`${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Logged in as ${client.user.tag}.`));
		await client.user.setPresence({ activities: [{ name: 'twitch.tv/kaaajka', type: ActivityType.Streaming, url: 'https://www.twitch.tv/kaaajka' }], status: 'dnd' });
	},
};