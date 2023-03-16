const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { Rank } = require('canvacord');

const User = require('../../../Schemas/UserDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Get your or another member\'s rank')
		.addUserOption((option) =>
			option
				.setName('member')
				.setDescription('Target @member')
				.setRequired(false),
		),
	async execute(interaction) {
		const member = interaction.options.getMember('member') || interaction.member;

		let user;

		const GuildID = member.guild.id;
		const UserID = member.user.id;

		user = await User.findOne({ GuildID, UserID });

		if (!user) {
			user = {
				Level: 1,
				XP: 0,
			};
		}

		const rank = new Rank()
			.setAvatar(member.user.displayAvatarURL())
			.setCurrentXP(user.XP)
			.setLevel(user.Level)
			.setRank(0, 0, false)
			.setRequiredXP(user.Level * 100)
			.setStatus(member.presence?.status || 'offline')
			.setProgressBar('#FFFFFF', 'COLOR')
			.setUsername(member.user.username)
			.setDiscriminator(member.user.discriminator);

		rank.build().then((data) => {
			interaction.reply({ files: [new AttachmentBuilder(data, { name: 'rank.png' })], ephemeral: true });
		});
	},
};