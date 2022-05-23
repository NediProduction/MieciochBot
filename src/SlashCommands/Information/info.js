const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { teamName } = require(__dirname + '/../../Config/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Zwraca informacje na podstawie danych wejściowych.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('bot')
				.setDescription('Uzyskaj informacje o bocie.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Uzyskaj informacje o użytkowniku.')
				.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika o którym chcesz dowiedzieć sie inforamcji.')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Uzyskaj informacje o serwerze.')),
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === 'bot') {
			const embed = new MessageEmbed()
				.setColor('#2f3136')
				.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
				.setDescription(`Bot stworzony z ❤ przez [${teamName}](https://github.com/${teamName.replace(/\s+/g, '')}).`)
				.setFooter({ text: `Copyright © ${new Date().getFullYear()} ${teamName}` });
			await interaction.reply({ embeds: [embed], ephemeral: true });
		} else if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('użytkownik');
			if (user) {
				const member = interaction.guild.members.cache.get(user.id);
				const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
				const embed = new MessageEmbed()
					.setColor('#2f3136')
					.setAuthor({ name: `${user.tag} - Informacje`, iconURL: user.displayAvatarURL() })
					.setThumbnail(user.displayAvatarURL())
					.addFields(
						{ name: 'Pseudonim:', value: `${member}` },
						{ name: `Rangi: [${roles.length}/${member.guild.roles.cache.size}]`, value: `${roles}` },
						{ name: 'Członek Serwera od:', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f>` },
						{ name: 'Użytkonik Discorda od:', value: `<t:${parseInt(user.createdTimestamp / 1000)}:f>` },
					)
					.setFooter({ text: `ID: ${user.id}` });
				await interaction.reply({ embeds: [embed], ephemeral: true });
			} else {
				const member = interaction.guild.members.cache.get(interaction.user.id);
				const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
				const embed = new MessageEmbed()
					.setColor('#2f3136')
					.setAuthor({ name: `${interaction.user.tag} - Informacje`, iconURL: interaction.user.displayAvatarURL() })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: 'Pseudonim:', value: `${member}` },
						{ name: `Rangi: [${roles.length}/${member.guild.roles.cache.size}]`, value: `${roles}` },
						{ name: 'Członek Serwera od:', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f>` },
						{ name: 'Użytkonik Discorda od:', value: `<t:${parseInt(interaction.user.createdTimestamp / 1000)}:f>` },
					)
					.setFooter({ text: `ID: ${interaction.user.id}` });
				await interaction.reply({ embeds: [embed], ephemeral: true });
			}
		} else if (interaction.options.getSubcommand() === 'server') {
			const owner = `<@${interaction.guild.ownerId}>`;
			const embed = new MessageEmbed()
				.setColor('#2f3136')
				.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
				.setThumbnail(interaction.guild.iconURL())
				.addFields(
					{ name: 'Właściciel:', value: `${owner}` },
					{ name: 'Serwer utworzony:', value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:f>` },
				)
				.setFooter({ text: `ID: ${interaction.guild.id}` });
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
	},
};