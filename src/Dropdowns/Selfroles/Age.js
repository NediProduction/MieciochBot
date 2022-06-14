module.exports = {
	id: 'age',
	async execute(interaction) {
		await interaction.reply({ content: `Wciśnięto przycisk ${interaction.values}`, ephemeral: true });
	},
};