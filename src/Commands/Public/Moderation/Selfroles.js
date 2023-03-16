const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('selfroles')
		.setDescription('selfroles')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const ageEmbed = new EmbedBuilder()
			.setColor('#e586a3')
			.setTitle('Ile masz lat?')
			.setDescription('Aby inni wiedzieli, ile masz lat, możesz wybrać tutaj swój wiek, jeśli chcesz, aby ludzie wiedzieli, ile masz lat.');
		const ageDropdown = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('age')
					.setPlaceholder('Wybierz swój wiek')
					.addOptions([
						{
							label: '13-14',
							value: 'first_option',
						},
						{
							label: '15-16',
							value: 'second_option',
						},
						{
							label: '17-18',
							value: 'third_option',
						},
						{
							label: '18+',
							value: 'fourth_option',
						},
					]),
			);
		const pronounsEmbed = new EmbedBuilder()
			.setColor('#e586a3')
			.setTitle('Wybierz swoją płeć')
			.setDescription('Aby poinformować innych o używaniu poprawnych zaimków podczas komunikowania się z Tobą, możesz dostosować swój profil ról za pomocą naszych ról zaimków.');
		const pronounsDropdown = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('pronouns')
					.setPlaceholder('Wybierz swoją płeć')
					.addOptions([
						{
							label: 'Chłopak',
							value: 'first_option',
						},
						{
							label: 'Dziewczyna',
							value: 'second_option',
						},
						{
							label: 'Nie Binarny',
							value: 'third_option',
						},
					]),
			);
		const notificationEmbed = new EmbedBuilder()
			.setColor('#e586a3')
			.setTitle('Role Powiadomień')
			.setDescription('Wszyscy tutaj interesują się różnymi rzeczami. Aby mieć pewność, że będziesz otrzymywać powiadomienia tylko o tematach, które chcesz poznać, możesz subskrybować różne typy powiadomień. Możesz wybrać wiele powiadomień, aby otrzymywać powiadomienia o określonych tematach na serwerze.');
		const notificationDropdown = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('notification')
					.setPlaceholder('Wybierz, kiedy chcesz otrzymywać powiadomienia')
					.setMinValues(1)
					.addOptions([
						{
							label: 'Stream',
							value: 'first_option',
						},
						{
							label: 'YouTube',
							value: 'second_option',
						},
						{
							label: 'Giveaways',
							value: 'third_option',
						},
						{
							label: 'Wszystkie Powiadomienia',
							value: 'fourth_option',
						},
					]),
			);

		await interaction.channel.send({ embeds: [ageEmbed], components: [ageDropdown], ephemeral: true });
		await interaction.channel.send({ embeds: [pronounsEmbed], components: [pronounsDropdown], ephemeral: true });
		await interaction.channel.send({ embeds: [notificationEmbed], components: [notificationDropdown], ephemeral: true });
		await interaction.reply({ content: 'Utworzyłeś kanał selfrole.', ephemeral: true });
	},
};