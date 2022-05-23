const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Uzyskaj pomoc związaną z botem.'),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};