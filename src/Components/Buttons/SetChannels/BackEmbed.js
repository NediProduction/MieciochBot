const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	id: 'BackEmbed',
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setTitle('Ustawienia')
			.setDescription('Wygląda na to, że nadal nie skończyłeś konfigurować bota :eyes: \n\nCzemu nie zaczniesz od wybrania kanału, na który mam witać użytkowników?');

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('SetChannels')
				.setLabel('Set channels')
				.setStyle(ButtonStyle.Primary)
				.setEmoji('<:HASH:1043582961209049138>'),
			new ButtonBuilder()
				.setCustomId('More')
				.setLabel('More')
				.setStyle(ButtonStyle.Secondary),
		);

		await interaction.deferUpdate();
		await interaction.editReply({ embeds: [embed], components: [row], ephemeral: true, fetchReply: true });

	},
};