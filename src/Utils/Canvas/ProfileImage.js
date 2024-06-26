const { read, AUTO, MIME_PNG, BLEND_MULTIPLY } = require('jimp');
const { createCanvas, registerFont } = require('canvas');
const moment = require('moment');
const { readdirSync } = require('fs');

registerFont(`${process.cwd()}/src/Utils/Fonts/Helvetica.ttf`, {
	family: 'Helvetica Normal',
});
registerFont(`${process.cwd()}/src/Utils/Fonts/Helvetica-Bold.ttf`, {
	family: 'Helvetica Bold',
});

async function profileImage(userParam) {

	const userTypes = ['User', 'ClientUser', 'GuildMember'];

	let user = userParam;
	let GuildMember;

	if (!user) throw new Error('Discord Arts  | You must add a parameter of type User | GuildMember');
	if (!userTypes.includes((user).constructor.name)) throw new Error('Discord Arts  | The selected parameter is not of type User | GuildMember');
	if (user.constructor.name == 'GuildMember') {
		user = user.user;
		GuildMember = userParam;
	}

	await user.fetch();

	let userName = user.username.replace(/[^\u0020-\u007E\u0410-\u044F\u00A1-\u00FF]+/gm, '');

	if (userName.length >= 11) userName = userName.substring(0, 10) + '..';
	else if (!userName) userName = '?????';

	const canvas = createCanvas(885, 303);
	const ctx = canvas.getContext('2d');

	ctx.font = '80px Helvetica Bold';
	ctx.textAlign = 'left';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(userName, 300, 155);
	const textX = ctx.measureText(userName);

	ctx.font = '60px Helvetica Normal';
	ctx.textAlign = 'left';
	ctx.fillStyle = '#c7c7c7';
	ctx.fillText(`#${user.discriminator}`, 300, 215);

	ctx.font = '23px Helvetica Normal';
	ctx.textAlign = 'center';
	ctx.fillStyle = '#c7c7c7';
	ctx.fillText(`${moment(user.createdAt).format('MMM DD, YYYY')}`, 775, 273);

	let userAvatar = user.defaultAvatarURL;

	if (user.avatarURL() != null) {
		userAvatar = user.avatarURL({ extension: 'png', size: 1024 });
	}

	let background = userAvatar;

	if (user.bannerURL() !== null) {
		background = user.bannerURL({ extension: 'png', forceStatic: true });
	}

	const canvasJimp = await read(canvas.toBuffer());
	const base = await read(`${process.cwd()}/src/Utils/Images/profileImage/UserBase.png`);
	const capa = await read(`${process.cwd()}/src/Utils/Images/profileImage/UserProfile.png`);
	const mask = await read(`${process.cwd()}/src/Utils/Images/profileImage/mask.png`);
	const mark = await read(`${process.cwd()}/src/Utils/Images/profileImage/mark.png`);

	const empty = await read(`${process.cwd()}/src/Utils/Images/profileImage/Status/empty.png`);

	const avatarBackground = await read(
		background,
	);
	const avatarProfile = await read(
		userAvatar,
	);


	const badges = [];

	if (user.displayAvatarURL({ forceStatic: false })?.endsWith('.gif') || user.bannerURL()) {
		const boostBadges = readdirSync(`${process.cwd()}/src/Utils/Images/profileImage/Badges/Boost`).filter((file) => file.endsWith('.png'));
		const boostRandom = boostBadges[Math.floor(Math.random() * boostBadges.length)];
		const nitro = await read(`${process.cwd()}/src/Utils/Images/profileImage/Badges/v14/Nitro.png`);
		const boost = await read(`${process.cwd()}/src/Utils/Images/profileImage/Badges/Boost/${boostRandom}`);
		badges.push(nitro, boost);
	}

	const flags = (user.flags || (await user.fetchFlags())).toArray();


	if (user.bannerURL() !== null) {
		avatarBackground.resize(885, 303);
		avatarBackground.opaque();
		avatarBackground.blur(5);
		base.composite(avatarBackground, 0, 0);
	} else {
		avatarBackground.resize(900, AUTO);
		avatarBackground.opaque();
		avatarBackground.blur(5);
		base.composite(avatarBackground, 0, -345);
	}


	canvasJimp.shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });
	base.composite(capa, 0, 0);
	base.composite(canvasJimp, 0, 0);

	avatarProfile.resize(225, 225);
	avatarProfile.opaque();
	avatarProfile.circle();

	let maskStatus;

	if (userParam.constructor.name == 'GuildMember') {
		const getStatus = (status) => {
			const type = {
				idle: 'idle.png',
				dnd: 'dnd.png',
				online: 'online.png',
				invisible: 'invisible.png',
			};

			return `${process.cwd()}/src/Utils/Images/profileImage/Status/${type[status] || type['invisible']}`;
		};

		const status = await read(getStatus(GuildMember.presence?.status));

		status.shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });
		base.composite(status, 0, 0);
		maskStatus = await read(`${process.cwd()}/src/Utils/Images/profileImage/Status/mask.png`);
	}

	avatarProfile.shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });

	empty.composite(avatarProfile, 47, 39);


	if (userParam.constructor.name == 'GuildMember') {
		empty.mask(maskStatus, 0, 0);
	}

	const bufferAvatar = await empty.getBufferAsync(MIME_PNG);
	const avatarFull = await read(bufferAvatar);

	base.composite(avatarFull, 0, 0);


	mark.opacity(0.5);
	base.composite(mark, 0, 0, { mode: BLEND_MULTIPLY });
	base.mask(mask);

	let botBagde;

	if (!user.bot) {

		for (let i = 0; i < flags.length; i++) {
			const badge = await read(`${process.cwd()}/src/Utils/Images/profileImage/Badges/v14/${flags[i]}.png`);
			badges.push(badge);
		}

		let x = 800;
		for (let i = 0; i < badges.length; i++) {
			badges[i].shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });
			badges[i].opacity(0.9);
			base.composite(badges[i], x, 15);
			x -= 60;
		}

	} else {

		if (flags.includes('VerifiedBot')) {
			botBagde = await read(`${process.cwd()}/src/Utils/Images/profileImage/botVerif.png`);
		} else {
			botBagde = await read(`${process.cwd()}/src/Utils/Images/profileImage/botNoVerif.png`);
		}

		const slashBadge = await read(`${process.cwd()}/src/Utils/Images/profileImage/Badges/v14/SlashBot.png`);
		slashBadge.shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });
		slashBadge.opacity(0.9);
		base.composite(slashBadge, 800, 15);

		base.composite(botBagde, textX.width + 310, 110);

	}

	const buffer = await base.getBufferAsync(MIME_PNG);

	return buffer;
}

module.exports = { profileImage };
