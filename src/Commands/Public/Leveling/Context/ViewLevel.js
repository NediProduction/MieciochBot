const { ApplicationCommandType, ContextMenuCommandBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const { Rank } = require('canvacord');

const DB = require('../../../../Schemas/UserDB');

module.exports = {
	contextMenus: 'View Level',
	data: new ContextMenuCommandBuilder()
		.setName('View Level')
		.setType(ApplicationCommandType.User)
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setDMPermission(false),
	async execute(interaction) {
		const Member = await interaction.targetMember;
		const { id, user, guild, presence } = Member;

		let userXP;

		const GuildID = guild.id;
		const UserID = id;

		userXP = await DB.findOne({ GuildID, UserID });

		if (!userXP) {
			userXP = {
				Level: 1,
				XP: 0,
			};
		}

		const rank = new Rank()
			.setAvatar(Member.displayAvatarURL())
			.setCurrentXP(userXP.XP)
			.setLevel(userXP.Level)
			.setRank(0, 0, false)
			.setRequiredXP(userXP.Level * 100)
			.setStatus(presence?.status || 'offline')
			.setProgressBar('#e37fa1', 'COLOR')
			.setUsername(user.username)
			.setDiscriminator(user.discriminator);

		rank.build().then((data) => {
			interaction.reply({ files: [new AttachmentBuilder(data, { name: 'rank.png' })], ephemeral: true });
		});

	},
};