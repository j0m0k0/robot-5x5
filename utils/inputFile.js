const fs = require('fs');
// reads input file and returns an array including commands 
const readInputFile = async (path, encoding='utf8') => {
  const fileData = await fs.readFileSync(path, encoding)
  const commandsSplitted = fileData.split('\n')
  const commandsCleaned = commandsSplitted.slice(0, commandsSplitted.length - 1).filter((command) => command.length > 0)
  return commandsCleaned
}

// creates a more-readable array of commands
const createCommandList = async (path) => {
  const commandsArray = await readInputFile(path)
  const commandList = []
  commandsArray.forEach(command => {
    const commandSplitted = command.split(' ')   
    if (commandSplitted.length > 2)  {      
      console.log('Wrong input file syntax, check:', path)
      console.log('Done.')
      process.exit(0)
    }
    if (commandSplitted.length === 2 && commandSplitted[1].split(',').length > 3) {
      console.log(`Wrong arguments at ${command} \n check:`, path)
      console.log('Done.')
      process.exit(0)
    }

    commandList.push({
      type: commandSplitted[0],
      ...(commandSplitted.length === 2 && {args: commandSplitted[1].split(',')})
    })
  });

  return commandList
}

module.exports = createCommandList

