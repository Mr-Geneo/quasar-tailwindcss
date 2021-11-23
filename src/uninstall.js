const inquirer = require('inquirer')
const fs = require('fs').promises
const path = require('path')

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
      api.removePath('src/extensions/tailwindcss')
      fs.open(path.resolve(__dirname, '../.postcssrc.js'))
        .then(async () => {
          await api.removePath('.postcssrc.js')
          await fs.copyFile(path.resolve(__dirname, '../.postcssrc.js'), api.resolve.app('.postcssrc.js'))
          await fs.unlink(path.resolve(__dirname, '../.postcssrc.js'))
        })
        .catch(() => {
          api.onExitLog('Error deleting or restoring. You can delete it manually.')
        })
    }
  } catch (e) {
    api.onExitLog('Error deleting or restoring. You can delete it manually.')
  }
}
