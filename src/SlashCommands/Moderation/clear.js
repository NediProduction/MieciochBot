const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Usuń określoną ilość wiadomości z kanału.')
		.addStringOption(option => option.setName('ilość').setDescription('Wybierz ilość wiadomośći do usunięcia.').setRequired(true)),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};