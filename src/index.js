function extendConf(conf) {
  conf.css.push('../extensions/tailwindcss/tailwind.scss')
}

module.exports = function (api) {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')
  api.extendQuasarConf(extendConf)
}
