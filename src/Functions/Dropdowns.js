const { readdirSync } = require('node:fs');

module.exports = (client) => {
	client.handleDropdowns = async (selectFolders, path) => {
		for (const folder of selectFolders) {
			const selectFiles = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
			for (const file of selectFiles) {
				const select = require(__dirname + `/../Dropdowns/${folder}/${file}`);
				client.dropdowns.set(select.id, select);
			}
		}
	};
};