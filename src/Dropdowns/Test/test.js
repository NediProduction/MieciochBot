module.exports = {
	id: 'test',
	async execute(interaction) {
		await interaction.reply({ content: `Wciśnięto przycisk ${interaction.values}`, ephemeral: true });
	},
};