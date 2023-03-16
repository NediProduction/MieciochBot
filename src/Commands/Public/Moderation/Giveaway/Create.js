const { TextInputBuilder, ActionRowBuilder, ModalBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	subCommand: 'giveaway.create',
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('GiveawayCreate')
			.setTitle('Create a Giveaway');

		const durationInput = new TextInputBuilder()
			.setCustomId('giveaway-duration')
			.setLabel('Duration')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('Ex: 10 minutes')
			.setValue('1 day')
			.setMinLength(3)
			.setRequired(true);

		const winnersCountInput = new TextInputBuilder()
			.setCustomId('giveaway-winners')
			.setLabel('Number of Winners')
			.setStyle(TextInputStyle.Short)
			.setValue('1')
			.setMinLength(1)
			.setMaxLength(2)
			.setRequired(true);

		const prizeInput = new TextInputBuilder()
			.setCustomId('giveaway-prize')
			.setLabel('Prize')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('Ex: PSC 50PLN')
			.setMinLength(1)
			.setMaxLength(128)
			.setRequired(true);

		const firstActionRow = new ActionRowBuilder().addComponents(durationInput);
		const secondActionRow = new ActionRowBuilder().addComponents(winnersCountInput);
		const thirdActionRow = new ActionRowBuilder().addComponents(prizeInput);

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		await interaction.showModal(modal);
	},
};