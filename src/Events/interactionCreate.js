const chalk = require('chalk');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			console.log(chalk.yellow.bold(`[CLIENT]: ${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`));
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};