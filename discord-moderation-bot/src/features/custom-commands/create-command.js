const createCommand = (commandName, commandFunction) => {
    return {
        name: commandName,
        execute: commandFunction,
    };
};

module.exports = createCommand;