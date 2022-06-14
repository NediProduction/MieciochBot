const { readdirSync } = require('node:fs');

module.exports = (client) => {
	client.handleButtons = async (buttonFolders, path) => {
		for (const folder of buttonFolders) {
			const buttonFiles = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
			for (const file of buttonFiles) {
				const button = require(__dirname + `/../Buttons/${folder}/${file}`);
				client.buttons.set(button.id, button);
			}
		}
	};
};