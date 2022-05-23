const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Wycisz użytkownika serwera z określonego powodu.')
		.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika.').setRequired(true))
		.addUserOption(option => option.setName('powód').setDescription('Napisz powód z jakiego użytkownik ma iść na przerwę.')),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};