const chalk = require('chalk');
const dayjs = require('dayjs');

module.exports = {
	id: 'Database/Connected',
	name: 'connected',
	async execute() {
		console.log(chalk.green.bold(`${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Connected to the database.`));
	},
};