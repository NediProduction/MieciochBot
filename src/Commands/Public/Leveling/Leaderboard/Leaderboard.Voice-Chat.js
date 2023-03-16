module.exports = {
	subCommand: 'leaderboard.voice-chat',
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda vc nie jest jeszcze gotowa.', ephemeral: true });
	},
};