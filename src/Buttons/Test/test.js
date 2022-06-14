module.exports = {
	id: 'test button',
	async execute(interaction) {
		await interaction.reply({ content: `Wciśnięto przycisk ${interaction.customId}`, ephemeral: true });
	},
};