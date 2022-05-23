const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Wyrzuć użytkownika serwera z określonego powodu.')
		.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika.').setRequired(true))
		.addUserOption(option => option.setName('powód').setDescription('Napisz powód z jakiego użytkownik ma zostać wyrzucony.')),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};