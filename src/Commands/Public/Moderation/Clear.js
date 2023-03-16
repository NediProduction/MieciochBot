const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { errorEmbeds } = require('../../../Utils/Embed/ErrorEmbed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Usuń określoną ilość wiadomości z kanału.')
		.addNumberOption(option => option.setName('ilość').setDescription('Wybierz ilość wiadomości do usunięcia. (MAX: 100)').setRequired(true))
		.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika którego wiadomości mają zostać usunięte.')),
	async execute(interaction) {
		const Amount = interaction.options.getNumber('ilość');
		const User = interaction.options.getUser('użytkownik');
		const Channel = interaction.channel;
		const Messages = await Channel.messages.fetch();
		const EmbedClear = new EmbedBuilder()
			.setColor('#2f3136');

		const locales = { pl: 'Wartość liczbowa powinna być mniejsza lub równa 100!' };
		const textEmbed = `${locales[interaction.locale] ?? 'The numerical value should be less than or equal to 100!'}`;
		const errorEmbed = await errorEmbeds(textEmbed);

		if (User) {
			let i = 0;
			const filtered = [];
			(await Messages).filter((m) => {
				if (m.author.id === User.id && Amount > i) {
					filtered.push(m);
					i++;
				}
			});

			if (filtered > 100) {
				return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
			}
			await Channel.bulkDelete(filtered, true).then(messages => {
				EmbedClear.setDescription(`🧹 **Usunięto ${messages.size} wiadomości wysłanych przez ${User}.**`);
				interaction.reply({ embeds: [EmbedClear], ephemeral: true });
			});
		} else {
			if (Amount > 100) {
				return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
			}
			await Channel.bulkDelete(Amount, true).then(messages => {
				EmbedClear.setDescription(`🧹 **Usunięto ${messages.size} wiadomości wysłanych na kanale ${Channel}.**`);
				interaction.reply({ embeds: [EmbedClear], ephemeral: true });
			});
		}
	},
};