const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('equipment')
		.setNameLocalizations({
			pl: 'ekwipunek',
		})
		.setDescription('Check your inventory.')
		.setDescriptionLocalizations({
			pl: 'Sprawdź swój ekwipunek.',
		})
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};