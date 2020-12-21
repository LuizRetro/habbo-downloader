#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const { initConfig, checkUpdate } = require('./utils')

async function init () {
  console.log(` _____     _   _`)
  console.log(`|  |  |___| |_| |_ ___`)
  console.log(`|     | .'| . | . | . |`)
  console.log(`|__|__|__,|___|___|___|          _            ___   ___`)
  console.log(`|    \\ ___ _ _ _ ___| |___ ___ _| |___ ___   |_  | |   |`)
  console.log(`|  |  | . | | | |   | | . | .'| . | -_|  _|  |  _|_| | |`)
  console.log(`|____/|___|_____|_|_|_|___|__,|___|___|_|    |___|_|___|\n`)

  console.log('> Enter "help" for a list of commands\n')

  console.log('initializing...\n')

  await checkUpdate()
  await initConfig(argv)
}

async function main () {
  try {
    await init()
    await require(`./command/${argv.c || argv.command}`)()
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log('command not found')
    } else {
      console.log(err.message)
    }
  }
}

main()
