const { EmbedBuilder } = require('discord.js');
const chalk = require('chalk');
const DB = require('../../Schemas/WelcomeDB');

module.exports = {
	id: 'Guild/MemberAdd',
	name: 'guildMemberAdd',
	async execute(member) {
		const { user, guild } = member;
		const botCount = guild.members.cache.filter(m => m.user.bot).size;

		DB.findOne({ GuildID: guild.id }, async (err, data) => {
			if (!data) return;

			const welcomeChannel = guild.channels.cache.get(data.ChannelID);

			const Welcome = new EmbedBuilder()
				.setColor('#2f3136')
				.setTitle('WITAMY')
				.setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 512 }))
				.setDescription(`Hej ${member}! Witamy na **${guild.name}**!\nZapoznaj się z <#938069808971399188>.`)
				.setFooter({ text: `ID: ${user.id}` })
				.setTimestamp();

			await welcomeChannel.send({ embeds: [Welcome] });

			return console.log(chalk.green.bold(`[${(guild.name).toUpperCase()}]: User ${user.tag} joined the server. (${guild.memberCount - botCount})`));
		});
	},
};