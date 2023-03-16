const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Returns statistics based on the input data.')
		.setDescriptionLocalizations({
			pl: 'Zwraca statystyki na podstawie danych wejściowych.',
		})
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand
				.setName('voice-chat')
				.setDescription('Get leaderboards of the 25 most active users on voice channels.')
				.setDescriptionLocalizations({
					pl: 'Uzyskaj tabele wyników 25 najaktywniejszych użytkowników na kanałach głosowych.',
				}))
		.addSubcommand(subcommand =>
			subcommand
				.setName('chat')
				.setDescription('Get leaderboards of the 25 most active users on text channels.')
				.setDescriptionLocalizations({
					pl: 'Uzyskaj tabele wyników 25 najaktywniejszych użytkowników na kanałach tekstowych.',
				})),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'voice-chat') {
			await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
		} else if (interaction.options.getSubcommand() === 'chat') {
			await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
		}
	},
};