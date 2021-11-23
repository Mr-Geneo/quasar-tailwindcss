const inquirer = require('inquirer')
const fs = require('fs').promises
const path = require('path')
const tmp = require('tmp')

const { name } = require('../package.json')

module.exports = async function (api) {
  try {
    let answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'delete_files',
        message: 'Do you want to delete the generated file?',
        default: true,
      },
    ])
    if (answers.delete_files) {
      await api.removePath('src/extensions/tailwindcss')
      let dir = path.resolve(tmp.tmpdir, `${name}`)
      let isExists = await fs.stat(path.resolve(dir, `.postcssrc.js`))
      if (isExists) {
        await api.removePath('.postcssrc.js')
        await fs.copyFile(path.resolve(dir, `.postcssrc.js`), api.resolve.app('.postcssrc.js'))
        await fs.rmdir(dir, { recursive: true })
      }
    }
  } catch (error) {
    console.log('error2 :>> ', error)
    api.onExitLog('Error deleting or restoring. You can delete it manually.')
  }
}
