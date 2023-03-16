const { EmbedBuilder } = require('discord.js');
const chalk = require('chalk');
const DB = require('../../Schemas/WelcomeDB');

module.exports = {
	id: 'Guild/MemberRemove',
	name: 'guildMemberRemove',
	async execute(member) {
		const { user, guild } = member;
		const botCount = guild.members.cache.filter(m => m.user.bot).size;

		DB.findOne({ GuildID: guild.id }, async (err, data) => {
			if (!data) return;

			const GoodbyeChannel = guild.channels.cache.get(data.ChannelID);

			const Goodbye = new EmbedBuilder()
				.setColor('#2f3136')
				.setTitle('ŻEGNAMY')
				.setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 512 }))
				.setDescription(`Papa ${member}!\nPrzykro nam że opuszczasz **${guild.name}**!\nMamy nadzieje że wrócisz.`)
				.setFooter({ text: `ID: ${user.id}` })
				.setTimestamp();

			await GoodbyeChannel.send({ embeds: [Goodbye] });

			return console.log(chalk.red.bold(`[${(guild.name).toUpperCase()}]: User ${user.tag} left the server. (${guild.memberCount - botCount})`));
		});
	},
};