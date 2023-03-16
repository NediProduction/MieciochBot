const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setNameLocalizations({
			pl: 'kup',
		})
		.setDescription('Buy item.')
		.setDescriptionLocalizations({
			pl: 'Kup przedmiot.',
		})
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};