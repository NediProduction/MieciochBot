module.exports = {
	subCommand: 'leaderboard.chat',
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda c nie jest jeszcze gotowa.', ephemeral: true });
	},
};