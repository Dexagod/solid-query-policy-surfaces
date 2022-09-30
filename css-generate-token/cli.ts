import { program } from 'commander';
import { generateTokenWithIDP, generateTokenWithWebID, ITokenOptionsWebID, ITokenOptionsOIDC } from '.';
import { writeFileSync, existsSync } from 'fs';
const inquirer = require("inquirer")

program
  .option('-e, --email <string>')
  .option('-p, --password <string>')
  .option('-w, --webid <string>')
  .option('-i, --idp <string>')
  .option('-o, --out <string>')
program.parse();
let options = program.opts();
async function handleAction() { 

  let webidLogin = true;

  if (!options.webid && !options.idp) {
    console.log(`Do you want to authenticate with WebID (Y) or with Identity Provider (n)? [Y/n] `);
    webidLogin = await new Promise((resolve, reject) => {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on('data', (chk) => {
        if (chk.toString('utf8') === "n") {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  let questions = []

  if (webidLogin && !options.webid) questions.push({ type: 'input', name: 'webid',  message: 'User WebID'})
  if (!webidLogin && !options.idp) questions.push({ type: 'input', name: 'idp',  message: 'User Identity Provider'})
  if (!options.email) questions.push({ type: 'input', name: 'email',  message: 'User email'})
  if (!options.password) questions.push({ type: 'password', name: 'password',  message: 'User password'})
  if (!options.out) questions.push({ type: 'input', name: 'out',  message: 'Auth token output location'})
    
  if (questions.length) {
    let answers = await inquirer.prompt(questions)
    options = { ...options, ...answers }
  }

  options.webId = options.webid

  try {
    let overwriteFile = true;

    if (existsSync(options.out)) { 
      console.log(`Do you want to overwrite existing file at: ${options.out}? [Y/n] `);
      overwriteFile = await new Promise((resolve, reject) => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', (chk) => {
          if (chk.toString('utf8') === "n") {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }
    if (!overwriteFile) throw new Error('Please provide a valid output location.')

    if (!options.email) throw new Error('No valid email given.')
    if (!options.password) throw new Error('No valid password given.')
    if (!options.out) throw new Error('No valid output file location given.')

    let token;
    if (options.webid) token = await generateTokenWithWebID(options as ITokenOptionsWebID)
    else if (options.idp) token = await generateTokenWithIDP(options as ITokenOptionsOIDC)
    else throw new Error('No valid IDP or WebID values given.')
    if (!token) throw new Error('')

    writeFileSync(options.out, JSON.stringify(token, null, 2))
    console.log(`Generated token was written to: ${options.out}`)
  } catch (e) { 
    console.error(`Cannot create token: ${e.message}`)
    process.exit(1)
  } 
  process.exit(0)
}

handleAction();
