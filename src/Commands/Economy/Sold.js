const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sold')
		.setDescription('Uzyskaj stan swojego konta.'),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};