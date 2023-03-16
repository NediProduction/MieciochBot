const { SlashCommandBuilder, EmbedBuilder, ChannelType, UserFlags, version, PermissionFlagsBits } = require('discord.js');

const { connection } = require('mongoose');
const os = require('os');

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Get information about bot status. (Developer)')
		.setDescriptionLocalizations({
			pl: 'Uzyskaj informacje o statusie bota. (Developer)',
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });
		const formatter = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

		const status = [
			'Disconnected',
			'Connected',
			'Connecting',
			'Disconnecting',
		];

		await client.user.fetch();
		await client.application.fetch();

		const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;

		interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(interaction.guild.members.me.roles.highest.hexColor)
					.setTitle(`${client.user.username}'s Status`)
					.setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
					.addFields(
						{ name: 'Description', value: `\`\`\`📝 ${client.application.description || 'None'}\`\`\`` },
						{
							name: 'General',
							value: [
								`\`👩🏻‍🔧\` **Client** ${client.user.tag}`,
								`\`💳\` **ID** ${client.user.id}`,
								`\`📆\` **Created** <t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
								`\`👑\` **Owner** ${client.application.owner ? `<@${client.application.owner.owner.id}> (${client.application.owner.owner.user.tag})` : 'None'}`,
								`\`✅\` **Verified** ${client.user.flags & UserFlags.VerifiedBot ? 'Yes' : 'No'}`,
								`\`🏷️\` **Tags** ${client.application.tags.length ? formatter.format(client.application.tags.map(tag => `*${tag}*`)) : 'None'}`,
								`\`👨‍💻\` **Commands** ${client.commands.size}`,
							].join('\n'),
						},
						{
							name: 'System',
							value: [
								`\`🖥\` **Operating System** ${os.type().replace('Windows_NT', 'Windows').replace('Darwin', 'macOS')}`,
								`\`⏰\` **Up Since** <t:${parseInt(client.readyTimestamp / 1000)}:R>`,
								`\`🏓\` **Ping** ${client.ws.ping}ms`,
								`\`🧠\` **CPU Model** ${os.cpus()[0].model}`,
								`\`💾\` **CPU Usage** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`,
								`\`📚\` **Database** ${status[connection.readyState]}`,
								`\`👩🏻‍🔧\` **Node.js** ${process.version}`,
								`\`🛠\` **Discord.js** ${version}`,
							].join('\n'),
							inline: true,
						},
						{
							// Using the caches for some of these isn't always reliable, but it would be a waste of resources to loop through all servers every single time someone used this command.
							name: 'Statistics',
							value: [
								`\`🌍\` **Servers** ${client.guilds.cache.size}`,
								`\`👨‍👩‍👧‍👦\` **Users** ${client.users.cache.size}`,
								`\`😏\` **Emojis** ${client.emojis.cache.size}`,
								`\`💬\` **Text Channels** ${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])}`,
								`\`🎙\` **Voice Channels** ${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`,
								`\`🧵\` **Threads** ${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`,
							].join('\n'),
							inline: true,
						},
					),
			], ephemeral: true,
		});
	},
};