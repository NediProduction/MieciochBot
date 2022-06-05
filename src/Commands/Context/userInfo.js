const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('User info')
		.setType(2),
	async execute(interaction) {
		const target = interaction.guild.members.cache.get(interaction.targetId);
		const roles = target.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
		const guildRoles = target.guild.roles.cache.map(role => role.toString()).slice(0, -1).length;
		const embed = new MessageEmbed()
			.setColor('#2f3136')
			.setAuthor({ name: `${target.user.tag} - Informacje`, iconURL: target.user.displayAvatarURL() })
			.setThumbnail(target.user.displayAvatarURL())
			.addFields(
				{ name: 'Pseudonim:', value: `${target}` },
				{ name: `Rangi: [${roles.length}/${guildRoles}]`, value: `${roles}` },
				{ name: 'Członek Serwera od:', value: `<t:${parseInt(target.joinedTimestamp / 1000)}:f>` },
				{ name: 'Użytkonik Discorda od:', value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:f>` },
			)
			.setFooter({ text: `ID: ${interaction.user.id}` });
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};