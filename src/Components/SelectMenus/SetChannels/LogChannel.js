const { PermissionFlagsBits } = require('discord.js');
const DB = require('../../../Schemas/LogDB');
const { successEmbeds } = require('../../../Utils/Embed/SuccessEmbed');
const { errorEmbeds } = require('../../../Utils/Embed/ErrorEmbed');

module.exports = {
	id: 'LogChannel',
	async execute(interaction) {
		if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
			const locales = { pl: 'Nie mam do tego uprawnień.' };
			const textEmbed = `${locales[interaction.locale] ?? 'I don\'t have permissions for this.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		DB.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
			if (!data) {
				await DB.create({
					GuildID: interaction.guild.id,
					ChannelID: interaction.values.toString(),
				});
				const locales = { pl: 'Pomyślnie utworzono kanał logowania.' };
				const textEmbed = `${locales[interaction.locale] ?? 'Succesfully created a channel logging.'}`;
				const successEmbed = await successEmbeds(textEmbed);
				return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
			} else if (interaction.values.toString() === 'NoChannel') {
				await DB.deleteOne({
					GuildID: interaction.guild.id,
				});
				const locales = { pl: 'Pomyślnie usunięto kanał logowania.' };
				const textEmbed = `${locales[interaction.locale] ?? 'Succesfully deleted a channel logging.'}`;
				const successEmbed = await successEmbeds(textEmbed);
				return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
			} else {
				await DB.updateOne({
					GuildID: interaction.guild.id,
					ChannelID: interaction.values.toString(),
				});
				const locales = { pl: 'Pomyślnie zaktualizowano kanał logowania.' };
				const textEmbed = `${locales[interaction.locale] ?? 'Succesfully updated a channel logging.'}`;
				const successEmbed = await successEmbeds(textEmbed);
				return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
			}
		});
	},
};