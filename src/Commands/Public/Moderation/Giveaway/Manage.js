const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const DB = require('../../../../Schemas/GiveawayDB');
const { endGiveaway } = require('../../../../Utils/GiveawayFunctions');

module.exports = {
	subCommand: 'giveaway.manage',
	async autocomplete(interaction) {
		const dataFiles = await DB.find({
			GuildID: interaction.guild.id,
			Ended: false,
		});

		const focusedValue = interaction.options.getFocused();
		const choices = new Array();
		for (const i in dataFiles) {
			choices.push(dataFiles[i].MessageID);
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map((choice, i) => ({ name: dataFiles[i].Prize, value: choice })),
		);

	},
	async execute(interaction) {
		const embed = new EmbedBuilder();
		const toggle = interaction.options.getString('toggle');
		const messageId = interaction.options.getString('message_id');

		const data = await DB.findOne({
			GuildID: interaction.guild.id,
			MessageID: messageId,
		});

		if (!data) {
			const locales = { pl: 'Nie można znaleźć żadnego giveawayu o tym identyfikatorze wiadomości.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'Could not find any giveaway with that message ID.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		const message = (await interaction.guild.channels.cache.get(data.ChannelID).messages.fetch(messageId));
		if (!message) {
			const locales = { pl: 'Ten giveaway nie istnieje.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'This giveaway doesn\'t exist'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (['end', 'reroll'].includes(toggle)) {
			if (data.Ended === (toggle === 'end' ? true : false)) {
				const locales = { pl: `Ten giveaway ${toggle === 'end' ? 'jest już zakończony.' : 'nie został jeszcze zakończony.'}` };
				embed
					.setColor('#2f3136')
					.setFooter({ text: `${locales[interaction.locale] ?? `This giveaway has ${toggle === 'end' ? 'already ended.' : 'not ended.'}`}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			if (toggle === 'end' && data.Paused === true) {
				const locales = { pl: 'Ten giveaway jest wstrzymany. Wznów go przed zakończeniem giveawaya.' };
				embed
					.setColor('#2f3136')
					.setFooter({ text: `${locales[interaction.locale] ?? 'This giveaway is paused. Unpause it before ending the giveaway'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			endGiveaway(message, (toggle === 'end' ? false : true));

			const locales = { pl: `Ten giveaway ${toggle === 'end' ? 'dobiegł końca.' : 'został ponownie zrolowany.'}` };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? `The giveaway has ${toggle === 'end' ? 'ended.' : 'been rerolled.'}`}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (['pause', 'unpause'].includes(toggle)) {
			if (data.Ended) {
				const locales = { pl: 'Ten giveaway już się zakończył.' };
				embed
					.setColor('#2f3136')
					.setFooter({ text: `${locales[interaction.locale] ?? 'This giveaway has already ended.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			if (data.Paused === (toggle === 'pause' ? true : false)) {
				const locales = { pl: `Ten giveaway ${toggle === 'pause' ? 'jest już wstrzymany.' : 'nie jest wstrzymany.'}` };
				embed
					.setColor('#2f3136')
					.setFooter({ text: `${locales[interaction.locale] ?? `This giveaway is already ${toggle === 'pause' ? 'paused.' : 'unpaused.'}`}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			const button = ActionRowBuilder.from(message.components[0]).setComponents(ButtonBuilder.from(message.components[0].components[0]).setDisabled(toggle === 'pause' ? true : false));

			const giveawayEmbed = EmbedBuilder.from(message.embeds[0]).setColor(toggle === 'pause' ? 'Yellow' : '#156789');

			await DB.findOneAndUpdate({
				GuildID: interaction.guild.id,
				MessageID: message.id,
			}, { Paused: toggle === 'pause' ? true : false });

			await message.edit({ content: `🎉 **Giveaway ${toggle === 'pause' ? 'Paused' : 'Started'}** 🎉`, embeds: [giveawayEmbed], components: [button] });

			const locales = { pl: `Ten giveaway został ${toggle === 'pause' ? 'wstrzymany.' : 'wznowiony.'}` };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? `The giveaway has been ${toggle === 'pause' ? 'paused.' : 'unpaused.'}`}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });
			interaction.reply({ embeds: [embed], ephemeral: true });

			if (toggle === 'unpause' && (data.EndTime * 1000) < Date.now()) endGiveaway(message);
		}

		if (toggle === 'delete') {
			await DB.deleteOne({
				GuildID: interaction.guild.id,
				MessageID: message.id,
			});

			await message.delete();
			const locales = { pl: 'Giveaway został usunięty.' };
			embed
				.setColor('#2f3136')
				.setFooter({ text: `${locales[interaction.locale] ?? 'The giveaway has been deleted.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
	},
};