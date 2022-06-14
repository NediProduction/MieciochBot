module.exports = {
	id: 'pronouns',
	async execute(interaction) {
		await interaction.reply({ content: `Wciśnięto przycisk ${interaction.values}`, ephemeral: true });
	},
};