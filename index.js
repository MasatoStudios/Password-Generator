#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const clip = require("clipboardy");
const log = console.log;
const createPass = require("./utils/createPass");
const savePass = require("./utils/savePass");

program
  .version("1.0.0")
  .description(
    "Welcome to my simple password generator, check the readme for a detailed description on how to use this software effectively"
  );

program
  .option("--l, --length <number>", "specify a custom password length", "10")
  .option("--s, --save", "save password to passwords.txt")
  .option("--nn, --no-numbers", "remove numbers from generated password")
  .option("--ns, --no-symbols", "removes symbols from generated password")
  .parse();

const { length, save, numbers, symbols } = program.opts();

// get generated password
const genPass = createPass(length, numbers, symbols);

// save to file
if (save) {
  savePass(genPass);
}

// Copy to clipboard
clip.writeSync(genPass);

// Output generated password
log(chalk.blue("Generated Password: ") + chalk.bold(genPass));
log(chalk.yellow("Password copied to clipboard"));
