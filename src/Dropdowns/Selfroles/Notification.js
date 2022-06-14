module.exports = {
	id: 'notification',
	async execute(interaction) {
		await interaction.reply({ content: `Wciśnięto przycisk ${interaction.values}`, ephemeral: true });
	},
};