const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ms = require('ms');
const DB = require('../../../Schemas/GiveawayDB');
const { endGiveaway } = require('../../../Utils/GiveawayFunctions');

module.exports = {
	id: 'Modals/Giveaway/Create',
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isModalSubmit()) return;
		if (interaction.customId !== 'GiveawayCreate') return;

		const embed = new EmbedBuilder();

		const prize = interaction.fields.getTextInputValue('giveaway-prize').slice(0, 256);
		const winners = Math.round(parseFloat(interaction.fields.getTextInputValue('giveaway-winners')));
		const duration = ms(interaction.fields.getTextInputValue('giveaway-duration'));

		if (isNaN(winners) || !isFinite(winners) || winners < 1) {
			const locales = { pl: 'Podaj prawidłową liczbę zwycięzców.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'Please provide a valid winner count.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (duration === undefined) {
			const locales = { pl: 'Podaj prawidłowy czas trwania.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'Please provide a valid duration.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		const formattedDuration = parseInt((Date.now() + duration) / 1000);

		const giveawayEmbed = new EmbedBuilder()
			.setColor('#E37FA1')
			.setTitle(prize)
			.setDescription(`**Hosted By**: ${interaction.member}\n**Winners**: ${winners}\n**Ends In**: <t:${formattedDuration}:R> (<t:${formattedDuration}>)`)
			.setTimestamp(parseInt(Date.now() + duration));

		const button = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('GiveawayJoin')
				.setEmoji('🎉')
				.setStyle(ButtonStyle.Success)
				.setLabel('Join Here'),
		);

		await interaction.channel.send({ content: '🎉 **Giveaway Started** 🎉', embeds: [giveawayEmbed], components: [button], fetchReply: true }).then(async (message) => {
			await DB.create({
				GuildID: interaction.guild.id,
				ChannelID: interaction.channel.id,
				EndTime: formattedDuration,
				Ended: false,
				HostedBy: interaction.user.id,
				Prize: prize,
				Winners: winners,
				Paused: false,
				MessageID: message.id,
				Entered: [],
			}).then((data) => {
				setTimeout(async () => {
					if (!data.Ended) endGiveaway(message);
				}, duration);
			});
		});

		const locales = { pl: 'Utworzono giveaway.' };
		embed
			.setColor('#2f3136')
			.setFooter({ text: `${locales[interaction.locale] ?? 'Created giveaway.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};