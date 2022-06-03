const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Uzyskaj informacje o statusie bota.'),
	async execute(interaction, client) {
		const embed = new MessageEmbed()
			.setColor('#2f3136')
			.addFields(
				{ name: 'Client:', value: `\`🟢 ONLINE\` - \`${client.ws.ping}ms\`` },
				{ name: 'Uptime:', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>` },
				{ name: 'Database:', value: '`UNDEFINED`' },
			);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};