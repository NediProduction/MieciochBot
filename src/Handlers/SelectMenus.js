const chalk = require('chalk');
const dayjs = require('dayjs');

async function loadSelectMenus(client) {
	const { loadFiles } = require('../Functions/fileLoader');
	const ascii = require('ascii-table');
	const table = new ascii().setHeading('Select Menus', 'Status');

	await client.selectMenus.clear();

	const Files = await loadFiles('Components/SelectMenus');

	Files.forEach((file) => {
		const selectMenu = require(file);

		if (!selectMenu.id) return;

		client.selectMenus.set(selectMenu.id, selectMenu);

		table.addRow(selectMenu.id, '🟩');
	});

	return console.log(table.toString(), chalk.green.bold(`\n${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Successfully loaded application select menus.`));
}

module.exports = { loadSelectMenus };