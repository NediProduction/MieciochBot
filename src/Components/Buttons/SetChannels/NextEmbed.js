const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const DB = require('../../../Schemas/LogDB');

module.exports = {
	id: 'NextEmbed',
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setTitle('Ustaw kanał Logowania')
			.setDescription('Poniżej znajdziesz listę wszystkich swoich kanałów. Wybierz jeden, na którym mam zapisywać logi! \n\n*Wybrany kanał się nie wyświetla? Uruchom to polecenie na kanale, o którym myślisz, aby zobaczyć go na liście!*');

		const SelectMenu = new ActionRowBuilder().addComponents(
			new SelectMenuBuilder()
				.setCustomId('LogChannel'));

		const textChannels = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildText);

		DB.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
			if (!data) {
				SelectMenu.components[0].addOptions([
					{
						label: 'No Channel',
						description: 'Disable welcome users feed',
						value: 'NoChannel',
						emoji: '<:CANCEL:1044209376090652772>',
						default: true,
					},
					{
						label: `${interaction.channel.name} (here)`,
						description: `Missing "${interaction.channel.commands}" Permission`,
						value: `${interaction.channel.id}`,
						emoji: '<:GREEN_HASH:1044209374803013643>',
					},
				]);

				textChannels.first(23).forEach((channel) => {
					if (channel.id === interaction.channel.id) return;
					SelectMenu.components[0].addOptions([
						{
							label: `${channel.name}`,
							description: `Missing "${channel.commands}" Permission`,
							value: `${channel.id}`,
							emoji: '<:HASH:1043582961209049138>',
						},
					]);
				});
			} else {
				const Channel = interaction.guild.channels.cache.get(data.ChannelID);
				if (interaction.channel.id === Channel.id) {
					SelectMenu.components[0].addOptions([
						{
							label: 'No Channel',
							description: 'Disable welcome users feed',
							value: 'NoChannel',
							emoji: '<:CANCEL:1044209376090652772>',
						},
						{
							label: `${Channel.name} (here)`,
							description: `Missing "${Channel.id}" Permission`,
							value: `${Channel.id}`,
							emoji: '<:GREEN_HASH:1044209374803013643>',
							default: true,
						},
					]);
				} else {
					SelectMenu.components[0].addOptions([
						{
							label: 'No Channel',
							description: 'Disable welcome users feed',
							value: 'NoChannel',
							emoji: '<:CANCEL:1044209376090652772>',
						},
						{
							label: `${interaction.channel.name} (here)`,
							description: `Missing "${interaction.channel.commands}" Permission`,
							value: `${interaction.channel.id}`,
							emoji: '<:GREEN_HASH:1044209374803013643>',
						},
						{
							label: `${Channel.name}`,
							description: `Missing "${Channel.id}" Permission`,
							value: `${Channel.id}`,
							emoji: '<:HASH:1043582961209049138>',
							default: true,
						},
					]);
				}

				textChannels.first(22).forEach((channel) => {
					if (channel.id === data.ChannelID || channel.id === interaction.channel.id) return;
					SelectMenu.components[0].addOptions([
						{
							label: `${channel.name}`,
							description: `Missing "${channel.commands}" Permission`,
							value: `${channel.id}`,
							emoji: '<:HASH:1043582961209049138>',
						},
					]);
				});
			}
		});


		const ButtonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Back')
					.setCustomId('SetChannels')
					.setStyle(ButtonStyle.Danger)
					.setEmoji('<:LEFT_ARROW:1043631023826682017>'),
				new ButtonBuilder()
					.setLabel('Made Changes? Reload List')
					.setCustomId('ReloadList')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Next')
					.setCustomId('next_embed')
					.setStyle(ButtonStyle.Success),
			);

		await interaction.deferUpdate();
		await interaction.editReply({ embeds: [embed], components: [SelectMenu, ButtonRow], ephemeral: true, fetchReply: true });
	},
};