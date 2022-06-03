const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Ustaw preferecje bota na serwerze.'),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};