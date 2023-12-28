const path = require('path');
const fs = require('fs');

const commandsRequiringFilePath = ['add', 'remove'];

const getLinesFromFile = (file) => {
    const content = fs.readFileSync(file, 'utf8');
    return content.split('\n');
}
const getIgnoreFilePath = () => path.join('.git', 'info', 'exclude');

const commandRequireFilePath = command => commandsRequiringFilePath.includes(command);

module.exports = {
    getIgnoreFilePath,
    commandRequireFilePath,
    getLinesFromFile
};
