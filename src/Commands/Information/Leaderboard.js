const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Zwraca statystyki na podstawie danych wejściowych.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('voice-chat')
				.setDescription('Uzyskaj tabele wyników 25 najaktywniejszych użytkowników na kanałach głosowych.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('chat')
				.setDescription('Uzyskaj tabele wyników 25 najaktywniejszych użytkowników na kanałach tekstowych.')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'voice-chat') {
			await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
		} else if (interaction.options.getSubcommand() === 'chat') {
			await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
		}
	},
};