const fs = require('fs').promises
const path = require('path')

module.exports = async function (api) {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  await new Promise((resolve) => {
    fs.copyFile(api.resolve.app('.postcssrc.js'), path.resolve(__dirname, '../.postcssrc.js')).then(() => {
      fs.unlink(api.resolve.app('.postcssrc.js')).then(() => {
        fs.copyFile(path.resolve(__dirname, '.postcssrc.js'), api.resolve.app('.postcssrc.js')).then(() => {
          resolve()
        })
      })
    })
  })
    .then(() => {
      api.render('./templates', {
        prompts: api.prompts,
      })
      api.onExitLog(
        'Thanks for installing tailwindcss. You can change files in src/extensions/tailwindcss folder according to the official documentation.'
      )
    })
    .catch((err) => {
      api.onExitLog(err.message)
    })
}
