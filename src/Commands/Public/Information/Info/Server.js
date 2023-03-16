const { EmbedBuilder } = require('discord.js');

module.exports = {
	subCommand: 'info.server',
	async execute(interaction) {
		const owner = `<@${interaction.guild.ownerId}>`;
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
			.setThumbnail(interaction.guild.iconURL())
			.addFields(
				{ name: 'Właściciel:', value: `${owner}` },
				{ name: 'Serwer utworzony:', value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:f>` },
			)
			.setFooter({ text: `ID: ${interaction.guild.id}` });
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};