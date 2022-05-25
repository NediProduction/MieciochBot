const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Dodaj sugestie.')
		.addStringOption(option => option.setName('treść').setDescription('Napisz swoją sugestię.').setRequired(true)),
	async execute(interaction) {
		await interaction.reply({ content: 'Komenda nie jest jeszcze gotowa.', ephemeral: true });
	},
};