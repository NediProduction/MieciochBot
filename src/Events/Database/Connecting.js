const chalk = require('chalk');
const dayjs = require('dayjs');

module.exports = {
	id: 'Database/Connecting',
	name: 'connecting',
	async execute() {
		console.log(chalk.yellow.bold(`${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Connecting to the database...`));
	},
};