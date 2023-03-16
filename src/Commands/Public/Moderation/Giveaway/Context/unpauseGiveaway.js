const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const DB = require('../../../../../Schemas/GiveawayDB');
const { endGiveaway } = require('../../../../../Utils/GiveawayFunctions');
const { successEmbeds } = require('../../../../../Utils/Embed/SuccessEmbed');
const { errorEmbeds } = require('../../../../../Utils/Embed/errorEmbed');

module.exports = {
	contextMenus: 'Unpause Giveaway',
	data: new ContextMenuCommandBuilder()
		.setName('Unpause Giveaway')
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

		if (data.Paused === false) {
			const locales = { pl: 'Ten giveaway nie jest wstrzymany.' };
			const textEmbed = `${locales[interaction.locale] ?? 'This giveaway is already unpaused.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		const button = ActionRowBuilder.from(Message.components[0]).setComponents(ButtonBuilder.from(Message.components[0].components[0]).setDisabled(false));

		const giveawayEmbed = EmbedBuilder.from(Message.embeds[0]).setColor('#2f3136');

		await DB.findOneAndUpdate({
			GuildID: guildId,
			MessageID: id,
		}, { Paused: false });

		await Message.edit({ content: '🎉 **Giveaway Started** 🎉', embeds: [giveawayEmbed], components: [button] });

		const locales = { pl: 'Ten giveaway został wznowiony.' };
		const textEmbed = `${locales[interaction.locale] ?? 'The giveaway has been unpaused.'}`;
		const successEmbed = await successEmbeds(textEmbed);
		await interaction.reply({ embeds: [successEmbed], ephemeral: true });

		if ((data.EndTime * 1000) < Date.now()) endGiveaway(Message);
	},
};