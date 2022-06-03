const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Wyświetl profil użytkownika serwera.')
		.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika, którego chcesz wyświetlić profil serwera.')),
	async execute(interaction) {
		const user = interaction.options.getUser('użytkownik');
		if (user) {
			const canvas = Canvas.createCanvas(700, 250);
			const ctx = canvas.getContext('2d');

			ctx.fillStyle = '#212121';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = '35px Arial';
			ctx.fillStyle = '#fff';
			ctx.fillText(user.tag, 150, 70);

			ctx.fillStyle = '#e37fa1';
			ctx.fillRect(150, 80, 200, 3);

			ctx.beginPath();
			ctx.arc(75, 75, 60, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();

			const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));

			ctx.drawImage(avatar, 15, 15, 120, 120);

			const attachment = new MessageAttachment(canvas.toBuffer(), 'profile.jpg');

			await interaction.reply({ files: [attachment], ephemeral: true });
		} else {
			const canvas = Canvas.createCanvas(700, 250);
			const ctx = canvas.getContext('2d');

			ctx.fillStyle = '#212121';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = '35px Arial';
			ctx.fillStyle = '#fff';
			ctx.fillText(interaction.user.tag, 150, 70);

			ctx.fillStyle = '#e37fa1';
			ctx.fillRect(150, 80, 200, 3);

			ctx.beginPath();
			ctx.arc(75, 75, 60, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();

			const avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ format: 'jpg' }));

			ctx.drawImage(avatar, 15, 15, 120, 120);

			const attachment = new MessageAttachment(canvas.toBuffer(), 'profile.jpg');

			await interaction.reply({ files: [attachment], ephemeral: true });
		}
	},
};
