const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Kup przedmiot.'),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};