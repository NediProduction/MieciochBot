const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sell')
		.setNameLocalizations({
			pl: 'sprzedaj',
		})
		.setDescription('Sell item.')
		.setDescriptionLocalizations({
			pl: 'Sprzedaj przedmiot.',
		})
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};