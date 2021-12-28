const readCommands = require('./utils/inputFile')
const execute = require('./utils/execute')

const main = async () => {  
    const commands = await readCommands('./inputs/case1.txt')               
    execute(commands)    
}

main()
