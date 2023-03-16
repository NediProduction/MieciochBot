const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Write suggestions.')
		.setDescriptionLocalizations({ pl: 'Napisz sugestie.' })
		.setDMPermission(false),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('suggest-modal')
			.setTitle('Opowiedz o swojej sugestii.')
			.addComponents(
				new ActionRowBuilder().addComponents(
					new TextInputBuilder()
						.setCustomId('suggest-modal')
						.setLabel('Opowiedz o swojej sugestii.')
						.setStyle(TextInputStyle.Paragraph)
						.setMinLength(1)
						.setMaxLength(1012)
						.setPlaceholder('Podaj swoją sugestie.')
						.setRequired(true),
				),
			);

		await interaction.showModal(modal);
	},
};