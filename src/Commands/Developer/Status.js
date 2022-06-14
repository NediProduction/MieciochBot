const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Uzyskaj informacje o statusie bota.'),
	async execute(interaction, client) {
		const embed = new MessageEmbed()
			.setColor('#2f3136')
			.setTitle('Status Klienta')
			.addFields({
				name: 'GŁÓWNE:',
				value:
					`
				**\`•\` Client**: <:icon_online:970322600930721802> ONLINE
                **\`•\` Ping**: ${client.ws.ping}ms
                **\`•\` Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>
				ㅤ
				`,
				inline: false,
			}, {
				name: 'BAZA DANYCH:',
				value:
					`
                **\`•\` Połączenie**: UNDEFINED
				ㅤ
                `,
				inline: true,
			}, {
				name: 'KOMPUTER:',
				value:
					`
                **\`•\` Średnie użycie pamięci RAM**: UNDEFINED MB
				ㅤ
                `,
				inline: false,
			});

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};