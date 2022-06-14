const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Usuń określoną ilość wiadomości z kanału.')
		.addNumberOption(option => option.setName('ilość').setDescription('Wybierz ilość wiadomości do usunięcia.').setRequired(true))
		.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika którego wiadomości mają zostać usunięte.')),
	async execute(interaction) {
		const Amount = interaction.options.getNumber('ilość');
		const User = interaction.options.getUser('użytkownik');
		const Channel = interaction.channel;
		const Messages = await Channel.messages.fetch();
		const Embed = new MessageEmbed()
			.setColor('#2f3136');
		if (User) {
			let i = 0;
			const filtered = [];
			(await Messages).filter((m) => {
				if (m.author.id === User.id && Amount > i) {
					filtered.push(m);
					i++;
				}
			});

			await Channel.bulkDelete(filtered, true).then(messages => {
				Embed.setDescription(`🧹 **Usunięto ${messages.size} wiadomości wysłanych przez ${User}.**`);
				interaction.reply({ embeds: [Embed], ephemeral: true });
			});
		} else {
			await Channel.bulkDelete(Amount, true).then(messages => {
				Embed.setDescription(`🧹 **Usunięto ${messages.size} wiadomości wysłanych na kanale ${Channel}.**`);
				interaction.reply({ embeds: [Embed], ephemeral: true });
			});
		}
	},
};