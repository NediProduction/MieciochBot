const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Pobierz zdjęcie profilowe użytkownika serwera.')
		.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika od któego chcesz pobrać zdjęcie profilowe.')),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};