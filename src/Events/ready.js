const chalk = require('chalk');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.hex('#E37FA1').bold(`[CLIENT]: Logged in as ${client.user.tag}.`));
		client.user.setActivity('Ciąg dalszy nastąpi...');
	},
};