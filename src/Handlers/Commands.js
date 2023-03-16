const chalk = require('chalk');
const dayjs = require('dayjs');

async function loadCommands(client) {
	const { loadFiles } = require('../Functions/fileLoader');
	const ascii = require('ascii-table');
	const tableCommand = new ascii().setHeading('Commands', 'Status');
	const tableSubCommand = new ascii().setHeading('Subcommands', 'Status');
	const tableContextMenus = new ascii().setHeading('Context Menus', 'Status');

	await client.commands.clear();
	await client.subCommands.clear();

	const commandsArray = [];

	const Files = await loadFiles('Commands');

	Files.forEach((file) => {
		const command = require(file);

		if (command.subCommand) {
			client.subCommands.set(command.subCommand, command);
			return tableSubCommand.addRow(`/${command.subCommand.replace(/\./g, ' ')}`, '🟩');
		}

		client.commands.set(command.data.name, command);

		commandsArray.push(command.data.toJSON());

		if (command.contextMenus) {
			return tableContextMenus.addRow(command.contextMenus, '🟩');
		}

		tableCommand.addRow(`/${command.data.name}`, '🟩');
	});

	client.application.commands.set(commandsArray);

	console.log(tableCommand.toString(), chalk.green.bold(`\n${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Successfully loaded application commands.`));
	console.log(tableSubCommand.toString(), chalk.green.bold(`\n${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Successfully loaded application subcommands.`));
	console.log(tableContextMenus.toString(), chalk.green.bold(`\n${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Successfully loaded application context menus.`));
}

module.exports = { loadCommands };