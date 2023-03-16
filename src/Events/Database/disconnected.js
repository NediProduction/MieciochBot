const chalk = require('chalk');
const dayjs = require('dayjs');

module.exports = {
	id: 'Database/Disconnected',
	name: 'disconnected',
	async execute() {
		console.log(chalk.red.bold(`${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Disconnected from the database.`));
	},
};