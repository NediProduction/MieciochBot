const chalk = require('chalk');

module.exports = {
	id: 'Database/Error',
	name: 'error',
	async execute(error) {
		console.log(chalk.red.bold(error));
	},
};