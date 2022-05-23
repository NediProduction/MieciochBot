const chalk = require('chalk');

module.exports = {
	name: 'error',
	async execute(error) {
		console.log(chalk.hex('#96FB6D').bold(error));
	},
};