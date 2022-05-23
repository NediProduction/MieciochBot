const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unwarn')
		.setDescription('Usuń upominienie użytkownika serwera.')
		.addStringOption(option => option.setName('id').setDescription('Wybierz użytkownika.').setRequired(true)),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};