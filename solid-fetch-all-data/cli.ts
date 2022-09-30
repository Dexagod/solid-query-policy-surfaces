import { program } from 'commander';
const inquirer = require("inquirer")
import { downloadSolidRDFResources } from '.';


program
  .option('-r, --root <string>', 'Pod root')
  .option('-t, --token <string>', 'Token file')
  .option('-o, --out <string>', 'Storage location for retrieved documents')
  .option('-m, --meta', 'Include metadata resources')
program.parse();
let options = program.opts();
async function handleAction() { 

  let questions = []
  if (!options.root) questions.push({ type: 'input', name: 'root',  message: 'Pod root to retrieve data from'})
  if (!options.token) questions.push({ type: 'input', name: 'token',  message: 'Token file location'})
  if (!options.out) questions.push({ type: 'input', name: 'out',  message: 'Directory to write data to'})
  if (!options.meta) questions.push({ type: 'confirm', name: 'meta',  message: 'Include metadata resources'})
    
  if (questions.length) {
    let answers = await inquirer.prompt(questions)
    options = { ...options, ...answers }
  }

  try {
    await downloadSolidRDFResources(options.root, options.token, options.out, options.meta || false)
  } catch (e) { 
    console.error(`Cannot retrieve documents from pod: ${e.message}`)
    process.exit(1)
  } 
  process.exit(0)
}

handleAction();
