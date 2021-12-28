let robotLocation = [0, 0]
let direction = 'NORTH'

const execute = (commands) => {  
  console.log("\x1b[44m", "\x1b[37m", 'Commands execution log ', "\x1b[0m", "\n\n")
  commands.forEach((command, index) => {    
      executeFunction(index, command)             
  });
  console.log("\x1b[0m", "Done.")  
}

const executeFunction = (index, command) => {
  switch (command.type) {
    case 'PLACE':
      console.log("\x1b[0m", `${index+1}.`, command.type, command.args, '✓')
      place(command)
      break;
    case 'MOVE':
      console.log("\x1b[0m", `${index+1}.`, command.type, '✓')
      move(command)
      break;
    case 'LEFT':
      console.log("\x1b[0m", `${index+1}.`, command.type, '✓')
      left(command)
      break
    case 'RIGHT':
      console.log("\x1b[0m", `${index+1}.`, command.type, '✓')
      right(command)
      break
    case 'REPORT':
      console.log("\x1b[0m", `${index+1}.`, command.type, '✓')
      report(command)
      break
    default:
      console.log("\x1b[0m", `${index+1}.`, command.type, '✘', "\x1b[31m", "(Unknown comand)") 
      console.log("\x1b[0m", "Done.")
      process.exit(0)
  }
}

const place = (command) => {    
    robotLocation = [Number(command.args[0]), Number(command.args[1])]
    direction = command.args[2]    
}


const move = (command) => {
  let finalLocation = robotLocation  
  switch (direction) {
    case 'NORTH':
      finalLocation = [robotLocation[0], robotLocation[1]+1]
      break;
    case 'WEST':
      finalLocation = [robotLocation[0]-1, robotLocation[1]]
      break;
    case 'SOUTH':
      finalLocation = [robotLocation[0], robotLocation[1]-1]
      break;
    case 'EAST':
      finalLocation = [robotLocation[0]+1, robotLocation[1]]
      break;
    default:
      console.log('unknown direction:', direction)
      console.log("\x1b[0m", "Done.")
      process.exit(0)      
  }

  if (finalLocation[0] < 5 && finalLocation[0] > -1 && finalLocation[1] < 5 && finalLocation[0] > -1) {
    robotLocation = finalLocation
  }
}


const left = () => {
  switch (direction) {
    case 'NORTH':
      direction = 'WEST'
      break;
    case 'WEST':
      direction = 'SOUTH'
      break;
    case 'SOUTH':
      direction = 'EAST'
      break;
    case 'EAST':
      direction = 'NORTH'
      break;
    default:
      console.log('unknown direction:', direction)
      console.log("\x1b[0m", "Done.")
      process.exit(0)      
  }
}


const right = () => {
  switch (direction) {
    case 'NORTH':
      direction = 'EAST'
      break;
    case 'WEST':
      direction = 'NORTH'
      break;
    case 'SOUTH':
      direction = 'WEST'
      break;
    case 'EAST':
      direction = 'SOUTH'
      break;
    default:
      console.log('unknown direction:', direction)
      console.log("\x1b[0m", "Done.")
      process.exit(0)      
  }
}


const report = () => {  
  const i = robotLocation[0]
  const j = robotLocation[1]
  
  console.log("\x1b[36m", `   
      -----------
  4   [${(i === 0 && j === 4) ? 'X' : ' '}|${(i === 1 && j === 4) ? 'X' : ' '}|${(i === 2 && j === 4) ? 'X' : ' '}|${(i === 3 && j === 4) ? 'X' : ' '}|${(i === 4 && j === 4) ? 'X' : ' '}]
  3   [${(i === 0 && j === 3) ? 'X' : ' '}|${(i === 1 && j === 3) ? 'X' : ' '}|${(i === 2 && j === 3) ? 'X' : ' '}|${(i === 3 && j === 3) ? 'X' : ' '}|${(i === 4 && j === 3) ? 'X' : ' '}]
  2   [${(i === 0 && j === 2) ? 'X' : ' '}|${(i === 1 && j === 2) ? 'X' : ' '}|${(i === 2 && j === 2) ? 'X' : ' '}|${(i === 3 && j === 2) ? 'X' : ' '}|${(i === 4 && j === 2) ? 'X' : ' '}]
  1   [${(i === 0 && j === 1) ? 'X' : ' '}|${(i === 1 && j === 1) ? 'X' : ' '}|${(i === 2 && j === 1) ? 'X' : ' '}|${(i === 3 && j === 1) ? 'X' : ' '}|${(i === 4 && j === 1) ? 'X' : ' '}]
  0   [${(i === 0 && j === 0) ? 'X' : ' '}|${(i === 1 && j === 0) ? 'X' : ' '}|${(i === 2 && j === 0) ? 'X' : ' '}|${(i === 3 && j === 0) ? 'X' : ' '}|${(i === 4 && j === 0) ? 'X' : ' '}]     
      -----------
       0 1 2 3 4

  x=${robotLocation[0]}, y=${robotLocation[1]}, f=${direction}
  `)  
}

module.exports = execute
