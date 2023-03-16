const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const DB = require('../../../../../Schemas/GiveawayDB');
const { successEmbeds } = require('../../../../../Utils/Embed/SuccessEmbed');
const { errorEmbeds } = require('../../../../../Utils/Embed/errorEmbed');

module.exports = {
	contextMenus: 'Pause Giveaway',
	data: new ContextMenuCommandBuilder()
		.setName('Pause Giveaway')
		.setType(ApplicationCommandType.Message)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const Message = interaction.targetMessage;
		const { id, guildId } = Message;

		const data = await DB.findOne({
			GuildID: guildId,
			MessageID: id,
		});

		if (!data) {
			const locales = { pl: 'Nie można znaleźć żadnego giveawayu o tym identyfikatorze wiadomości.' };
			const textEmbed = `${locales[interaction.locale] ?? 'Could not find any giveaway with that message ID.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		if (data.Ended === true) {
			const locales = { pl: 'Ten giveaway już się zakończył.' };
			const textEmbed = `${locales[interaction.locale] ?? 'This giveaway has already ended.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		if (data.Paused === true) {
			const locales = { pl: 'Ten giveaway jest już wstrzymany.' };
			const textEmbed = `${locales[interaction.locale] ?? 'This giveaway is already paused.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		const Button = ActionRowBuilder.from(Message.components[0]).setComponents(ButtonBuilder.from(Message.components[0].components[0]).setDisabled(true));

		const giveawayEmbed = EmbedBuilder.from(Message.embeds[0]).setColor('Yellow');

		await DB.findOneAndUpdate({
			GuildID: guildId,
			MessageID: id,
		}, { Paused: true });

		await Message.edit({ content: '🎉 **Giveaway Paused** 🎉', embeds: [giveawayEmbed], components: [Button] });

		const locales = { pl: 'Ten giveaway został wstrzymany.' };
		const textEmbed = `${locales[interaction.locale] ?? 'The giveaway has been paused.'}`;
		const successEmbed = await successEmbeds(textEmbed);
		return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
	},
};