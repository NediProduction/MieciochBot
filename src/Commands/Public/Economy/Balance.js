const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setNameLocalizations({
			pl: 'saldo',
		})
		.setDescription('Get your account balance.')
		.setDescriptionLocalizations({
			pl: 'Uzyskaj stan swojego konta.',
		})
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};