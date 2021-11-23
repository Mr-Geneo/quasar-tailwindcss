const fs = require('fs').promises
const path = require('path')
const tmp = require('tmp')

const { name } = require('../package.json')

module.exports = async function (api) {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  try {
    let dir = path.resolve(tmp.tmpdir, name)
    let isExists = await new Promise((resolve) => {
      fs.stat(dir)
        .then((state) => {
          resolve(state)
        })
        .catch(() => {
          resolve(false)
        })
    })
    if (!isExists) {
      await fs.mkdir(dir)
    }
    await fs.copyFile(api.resolve.app('.postcssrc.js'), path.resolve(dir, `.postcssrc.js`))
    await fs.unlink(api.resolve.app('.postcssrc.js'))
    await fs.copyFile(path.resolve(__dirname, '.postcssrc.js'), api.resolve.app('.postcssrc.js'))

    api.render('./templates', {
      prompts: api.prompts,
    })
    api.onExitLog(
      'Thanks for installing tailwindcss. You can change files in src/extensions/tailwindcss folder according to the official documentation.'
    )
  } catch (error) {
    api.onExitLog(error.message)
  }
}
