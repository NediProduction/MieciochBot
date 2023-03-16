const { EmbedBuilder } = require('discord.js');
const DB = require('../../../Schemas/GiveawayDB');

module.exports = {
	id: 'GiveawayJoin',
	async execute(interaction) {
		const embed = new EmbedBuilder();
		const data = await DB.findOne({
			GuildID: interaction.guild.id,
			ChannelID: interaction.channel.id,
			MessageID: interaction.message.id,
		});

		if (!data) {
			const locales = { pl: 'Brak danych w bazie danych.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'There is no data in the database.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (data.Entered.includes(interaction.user.id)) {
			const locales = { pl: 'Dołączyłeś już do giveawaya.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'You have already joined the giveaway.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (data.Paused === true) {
			const locales = { pl: 'Ten giveaway jest wstrzymany.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'This giveaway is paused.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (data.Ended === true) {
			const locales = { pl: 'Ten giveaway dobiegł końca.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'This giveaway has ended.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		await DB.findOneAndUpdate({
			GuildID: interaction.guild.id,
			ChannelID: interaction.channel.id,
			MessageID: interaction.message.id,
		}, {
			$push: { Entered: interaction.user.id },
		}).then(() => {
			const locales = { pl: 'Dołączyłeś do giveawaya.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'You have joined the giveaway.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		});
	},
};