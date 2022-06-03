const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Dodaj sugestie.'),
	async execute(interaction, client) {
		const modal = new Modal()
			.setCustomId('suggest-modal')
			.setTitle('Opowiedz o swojej sugestii.')
			.addComponents(
				new TextInputComponent()
					.setCustomId('suggest-modal')
					.setLabel('Opowiedz o swojej sugestii.')
					.setStyle('SHORT')
					.setMinLength(1)
					.setMaxLength(1012)
					.setPlaceholder('Podaj swoją sugestie.')
					.setRequired(true),
			);

		showModal(modal, {
			client: client,
			interaction: interaction,
		});
	},
};