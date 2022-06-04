const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const { user, guild } = member;

		member.roles.add('982393796945903647');

		const Welcomer = new WebhookClient({ url: 'https://discord.com/api/webhooks/982394282453368852/ibXx_6igX6O58bolaOvMYF0KTO_1J1LfADLzjiEB3AC6RyDlH8RywMnzoUhLUM0Ewq-p' });

		const Welcome = new MessageEmbed()
			.setColor('#2f3136')
			.setTitle('WITAMY')
			.setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 512 }))
			.setDescription(`Hej ${member}! Witamy na **${guild.name}**!\nZapoznaj się z <#938069808971399188>.`)
			.setFooter({ text: `ID: ${user.id}` });

		Welcomer.send({ embeds: [Welcome] });
	},
};