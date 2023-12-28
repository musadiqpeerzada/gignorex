#!/usr/bin/env node

const fs = require('fs');
const Logger = require('./lib/logger');
const { getIgnoreFilePath, commandRequireFilePath, getLinesFromFile } = require('./lib/utils');

const validateInputOrExit = (fileName, command) => {
    if (!commands[command]) {
        Logger.error('Invalid command. Valid commands are add, remove, list');
        process.exit(1);
    }
    if (commandRequireFilePath(command) && !fileName) {
        Logger.error('Please provide a fileToBeIgnored/folder name to ignore.');
        process.exit(1);
    }
};

const commands = {
    add: addToIgnore,
    remove: removeFromIgnore,
    list: listIgnoredFiles,
};

function addToIgnore(ignoreFilePath, fileToBeIgnored) {
    try {
        const lines = getLinesFromFile(ignoreFilePath);
        if (!lines.includes(fileToBeIgnored)) {
            fs.appendFileSync(ignoreFilePath, `${fileToBeIgnored}\n`);
            Logger.success(`Added ${fileToBeIgnored} to ${ignoreFilePath}`);
        } else {
            Logger.success(`${fileToBeIgnored} is already ignored.`);
        }
    } catch (err) {
        Logger.error(`Error: ${err.message}`);
    }
}

function removeFromIgnore(ignoreFilePath, fileToBeIgnored) {
    try {
        const lines = getLinesFromFile(ignoreFilePath);
        const indexToRemove = lines.indexOf(fileToBeIgnored);
        if (indexToRemove !== -1) {
            lines.splice(indexToRemove, 1);
            const updatedContent = lines.join('\n');
            fs.writeFileSync(ignoreFilePath, updatedContent);
            Logger.success(`Removed ${fileToBeIgnored} from ignore list`);
        } else {
            Logger.success(`${fileToBeIgnored} is not ignored.`);
        }
    } catch (err) {
        Logger.error(`Error: ${err.message}`);
    }
}

function listIgnoredFiles(ignoreFilePath) {
    try {
        const lines = getLinesFromFile(ignoreFilePath);
        if (lines.some(line => line.trim() !== '' && !line.trim().startsWith('#'))) {
            Logger.success('Ignored files/folders:');
            lines.forEach(line => {
                if (line.trim() !== '' && !line.trim().startsWith('#')) {
                    Logger.info(line);
                }
            });
        } else {
            Logger.info('No files/folders are currently ignored.');
        }
    } catch (err) {
        Logger.error(`Error: ${err.message}`);
    }
}

const fileName = process.argv[3];
const command = process.argv[2];
validateInputOrExit(fileName, command);

const ignoreFilePath = getIgnoreFilePath();
commands[command](ignoreFilePath, fileName);
