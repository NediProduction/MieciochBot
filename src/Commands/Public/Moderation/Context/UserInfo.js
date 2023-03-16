const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContextMenuCommandBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const { profileImage } = require('../../../../Utils/Canvas/ProfileImage');

module.exports = {
	contextMenus: 'User Info',
	data: new ContextMenuCommandBuilder()
		.setName('User Info')
		.setType(ApplicationCommandType.User)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const target = await interaction.guild.members.fetch(interaction.targetId);
		const { user, presence, roles } = target;

		const statusType = {
			idle: '1FJj7pX.png',
			dnd: 'fbLqSYv.png',
			online: 'JhW7v9d.png',
			invisible: 'dibKqth.png',
		};

		const activityType = [
			'`🕹` *Playing*',
			'`🎙` *Streaming*',
			'`🎧` *Listening to*',
			'`📺` *Watching*',
			'`🤹🏻‍♀️` *Custom*',
			'`🏆` *Competing in*',
		];

		const clientType = [
			{ name: 'desktop', text: 'Computer', emoji: '`💻`' },
			{ name: 'mobile', text: 'Phone', emoji: '`🤳🏻`' },
			{ name: 'web', text: 'Website', emoji: '`🌍`' },
			{ name: 'offline', text: 'Offline', emoji: '`💤`' },
		];

		const maxDisplayRoles = (rolesGuild, maxFieldLength = 1024) => {
			let totalLength = 0;
			const result = [];

			for (const role of rolesGuild) {
				const roleString = `<@&${role.id}>`;

				if (roleString.length + totalLength > maxFieldLength) { break; }

				totalLength += roleString.length + 1;
				result.push(roleString);
			}

			return result.length;
		};

		const guildRoles = target.guild.roles.cache.map(role => role.toString()).slice(0, -1).length;

		const sortedRoles = roles.cache.map(role => role).sort((a, b) => b.position - a.position).slice(0, roles.cache.size - 1);

		const clientStatus = presence?.clientStatus instanceof Object ? Object.keys(presence.clientStatus) : 'offline';

		const deviceFilter = clientType.filter(device => clientStatus.includes(device.name));
		const devices = !Array.isArray(deviceFilter) ? new Array(deviceFilter) : deviceFilter;

		const bufferImg = await profileImage(target);
		await interaction.deferReply({ ephemeral: true });

		const userEmbed = new EmbedBuilder()
			.setColor('#2f3136')
			.setAuthor({
				name: user.tag,
				iconURL: `https://i.imgur.com/${statusType[presence?.status || 'invisible']}`,
			})
			.setImage('attachment://banner.png')
			.addFields(
				{ name: 'ID', value: `\`💳\` ${user.id}` },
				{ name: 'Activities', value: presence?.activities.map(activity => `${activityType[activity.type]} ${activity.type === 4 ? `"${activity.emoji} ${activity.state}"` : `"${activity.name}"`}`).join('\n') || 'None' },
				{ name: 'Joined Server', value: `\`🤝🏻\` <t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
				{ name: 'Account Created', value: `\`📆\` <t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true },
				{ name: 'Nickname', value: `\`🦸🏻‍♀️\` ${target.nickname || 'None'}`, inline: true },
				{
					name: `Roles (${maxDisplayRoles(sortedRoles)} of ${guildRoles})`,
					value: `${sortedRoles.slice(0, maxDisplayRoles(sortedRoles)).join(' ') || 'None'}`,
				},
				{ name: 'Devices', value: devices.map(device => `${device.emoji} ${device.text}`).join('\n'), inline: true },
				{ name: 'Profile Colour', value: `\`🎨\` ${user.hexAccentColor || 'None'}`, inline: true },
				{ name: 'Boosting Server', value: `\`🏋🏻‍♀️\` ${roles.premiumSubscriberRole ? `Since <t:${parseInt(target.premiumSinceTimestamp / 1000)}:R>` : 'No'}`, inline: true },
			)
			.setTimestamp();

		const Row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL(user.avatarURL({ format: 'png', dynamic: true, size: 4096 }))
				.setLabel('Avatar')
				.setStyle(ButtonStyle.Link)
				.setEmoji('🖼️'));

		const Attachment = new AttachmentBuilder(bufferImg, { name: 'banner.png' });

		await interaction.editReply({ embeds: [userEmbed], components: [Row], files: [Attachment], ephemeral: true });
	},
};