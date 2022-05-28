const chalk = require('chalk');

module.exports = {
	name: 'error',
	async execute(error) {
		console.log(chalk.red.bold(error));
	},
};