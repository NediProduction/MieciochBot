const chalk = require('chalk');
const dayjs = require('dayjs');

async function loadButtons(client) {
	const { loadFiles } = require('../Functions/fileLoader');
	const ascii = require('ascii-table');
	const table = new ascii().setHeading('Buttons', 'Status');

	await client.buttons.clear();

	const Files = await loadFiles('Components/Buttons');

	Files.forEach((file) => {
		const button = require(file);

		if (!button.id) return;

		client.buttons.set(button.id, button);

		table.addRow(button.id, '🟩');
	});

	return console.log(table.toString(), chalk.green.bold(`\n${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Successfully loaded application buttons.`));
}

module.exports = { loadButtons };