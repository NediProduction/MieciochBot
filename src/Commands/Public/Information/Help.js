const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setNameLocalizations({
			pl: 'pomoc',
		})
		.setDescription('Get help with bot.')
		.setDescriptionLocalizations({
			pl: 'Uzyskaj pomoc związaną z botem.',
		}),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};