const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Uzyskaj informacje o aktualnym opóźnieniu bota.'),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor('#2f3136')
			.setDescription('**Pingowanie...**');
		const sent = await interaction.reply({ embeds: [embed], fetchReply: true, ephemeral: true });
		interaction.editReply({ embeds: [embed.setDescription(`**Opóźnienie bota**: ${sent.createdTimestamp - interaction.createdTimestamp}ms`)] });
	},
};