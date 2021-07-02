////////////////////////////////////////////////////////////////////////////////
// GULP
////////////////////////////////////////////////////////////////////////////////

const { task, series, parallel, src, dest, watch } = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const debug = require('gulp-debug')
const gulpif = require('gulp-if')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const imagemin = require('gulp-imagemin')
const favicon = require('favicons').stream
const cache = require('gulp-cache')
const scss = require('gulp-sass')(require('sass'))
const sync = require('browser-sync')
const del = require('del')
const Parcel = require('parcel-bundler')

const config = require('./config')

////////////////////////////////////////////////////////////////////////////////
// INFO
////////////////////////////////////////////////////////////////////////////////

const STATE_PLUGINS = (typeof config.plugins !== 'undefined' && config.plugins.length > 0) ? true : false

////////////////////////////////////////////////////////////////////////////////
// BROWSERSYNC
////////////////////////////////////////////////////////////////////////////////

const browser = sync.create()

function browsersync (done) {
  browser.init({
    host: config.host.local,
    proxy: config.host.local,
    logLevel: process.env.DEBUG === 'True' ? 'debug' : 'info',
    logFileChanges: process.env.DEBUG === 'True' ? true : false,
    logPrefix: process.env.npm_package_name,
    ghostMode: false,
    open: false,
    notify: false,
    ui: false,
    online: false,
    injectChanges: true,
    reloadDelay: 800
  })
  done()
}

function reload (done) {
  browser.reload()
  done()
}

////////////////////////////////////////////////////////////////////////////////
// CONTENT
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__content () { return del(config.path.root_dist + config.path.content) }

// COPY  -------------------------------------------------------------

function copy__content () {
  return src(config.path.db + '**/*')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## CONTENT:' })))
    .pipe(dest(config.path.dist + config.path.content))
}

// WATCH -------------------------------------------------------------

function watch__content () {
  watch(config.path.db + '**/*', series(content, reload))
}

// COMPOSITION -------------------------------------------------------------

const content = series(clean__content, copy__content)

////////////////////////////////////////////////////////////////////////////////
// VENDOR
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__vendor () { return del(config.vendor.dest + 'vendor.js') }

// PROCESS -------------------------------------------------------------

function process__vendor () {
  return src(config.vendor.src)
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## VENDOR:' })))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(!process.env.NODE_ENV === 'development', terser()))
    .pipe(dest(config.vendor.dest))
}

// COMPOSITION -------------------------------------------------------------

const vendor = series(clean__vendor, process__vendor)

////////////////////////////////////////////////////////////////////////////////
// SCRIPT
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__scripts__main () { return del(config.path.dist + config.path.scripts + '{main,main-legacy}.{js,js.map}') }
function clean__scripts__panel () { return del(config.path.dist + config.path.scripts + 'panel.{js,js.map}') }

// PROCESS -------------------------------------------------------------

function process__scripts__main () {
  return src([config.path.src + config.path.resources + 'main.js', config.path.src + config.path.snippets + '**/script.js'], { sourcemaps: true })
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## MAIN:' })))
    .pipe(concat('main.js'))
    .pipe(gulpif(!process.env.NODE_ENV === 'development', terser()))
    .pipe(dest(config.path.dist + config.path.scripts, { sourcemaps: process.env.NODE_ENV === 'development' ? true : '.' }))
}

function process__scripts__panel () {
  return src(config.path.src + config.path.resources + 'panel.js', { sourcemaps: true })
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## MAIN:' })))
    .pipe(concat('panel.js'))
    .pipe(gulpif(!process.env.NODE_ENV === 'development', terser()))
    .pipe(dest(config.path.dist + config.path.scripts, { sourcemaps: process.env.NODE_ENV === 'development' ? true : '.' }))
}

// WATCH -------------------------------------------------------------

function watch__scripts () {
  watch([config.path.src + config.path.resources + 'main.js', config.path.src + config.path.snippets + '**/script.js'], series(scripts__main, reload))
  watch(config.path.src + config.path.resources + 'panel.js', series(scripts__panel, reload))
}

// COMPOSITION -------------------------------------------------------------

const scripts__main = series(clean__scripts__main, process__scripts__main)
const scripts__panel = series(clean__scripts__panel, process__scripts__panel)

////////////////////////////////////////////////////////////////////////////////
// STYLE
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__styles () { return del(config.path.dist + config.path.styles + '*.{css,css.map}') }

// PROCESS -------------------------------------------------------------

function process__styles () {
  return src(config.path.src + config.path.resources + '{main,panel}.scss', { sourcemaps: true })
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## STYLE:' })))
    .pipe(scss({ outputStyle: !process.env.NODE_ENV === 'development' ? 'compressed' : 'expanded' }).on('error', scss.logError))
    .pipe(dest(config.path.dist + config.path.styles, { sourcemaps: process.env.NODE_ENV === 'development' ? true : '.' }))
}

// WATCH -------------------------------------------------------------

function watch__styles () {
  watch(config.path.src + config.path.snippets + '**/*.scss', series(styles, reload))
  watch(config.path.src + config.path.resources + '**/*.scss', series(styles, reload))
}

// COMPOSITION -------------------------------------------------------------

const styles = series(clean__styles, process__styles)

////////////////////////////////////////////////////////////////////////////////
// SEO
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__robots () { return del(config.path.dist + config.path.public + 'robots.txt') }

// COPY -------------------------------------------------------------

function copy__robots () {
  return src(config.path.src + config.path.configs + `robots.${process.env.NODE_ENV}`)
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## ROBOTS:' })))
    .pipe(rename('robots.txt'))
    .pipe(dest(config.path.dist + config.path.public))
}

// COMPOSITION -------------------------------------------------------------

const robots = series(clean__robots, copy__robots)

////////////////////////////////////////////////////////////////////////////////
// LOGIC
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__dotenv () { return del(config.path.dist + '.env') }
function clean__application () { return del(config.path.dist + config.path.env + 'application.php') }
function clean__enviroments () { return del(config.path.dist + config.path.env + config.path.enviroments) }
function clean__license () { return del(config.path.dist + config.path.site + config.path.configs + '.license') }
function clean__config () { return del(config.path.dist + config.path.site + config.path.configs + 'config.php') }
function clean__languages () { return del(config.path.dist + config.path.site + config.path.languages) }
function clean__blueprints () { return del(config.path.dist + config.path.site + config.path.blueprints) }
function clean__collections () { return del(config.path.dist + config.path.site + config.path.collections) }
function clean__controllers () { return del(config.path.dist + config.path.site + config.path.controllers) }
function clean__snippets () { return del(config.path.dist + config.path.site + config.path.snippets) }
function clean__templates () { return del(config.path.dist + config.path.site + config.path.templates) }
function clean__htaccess () { return del(config.path.dist + config.path.public + '.htaccess') }
function clean__index () { return del(config.path.dist + config.path.public + 'index.php') }

// COPY -------------------------------------------------------------

function copy__dotenv () {
  return src(config.path.root + '.env')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## DOTENV:' })))
    .pipe(dest(config.path.dist))
}

function copy__license () {
  return src(config.path.secure + config.path.license + `.license.${process.env.NODE_ENV}`)
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## LICENSE:' })))
    .pipe(rename('.license'))
    .pipe(dest(config.path.dist + config.path.site + config.path.configs))
}

function copy__enviroments () {
  return src(config.path.root + config.path.env + config.path.enviroments + `${process.env.NODE_ENV}.php`)
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## ENVIROMENTS:' })))
    .pipe(dest(config.path.dist + config.path.env + config.path.enviroments))
}

function copy__application () {
  return src(config.path.root + config.path.env + 'application.php')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## APPLICATION:' })))
    .pipe(dest(config.path.dist + config.path.env))
}

function copy__config () {
  return src(config.path.src + config.path.configs + 'config.php')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## CONFIG:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.configs))
}

function copy__languages () {
  return src(config.path.src + config.path.languages + '**/*.php')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## LANGUAGES:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.languages))
}

function copy__blueprints () {
  return src(config.path.src + config.path.blueprints + '**/*.yml')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## BLUEPRINTS:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.blueprints))
}

function copy__collections () {
  return src(config.path.src + config.path.collections + '**/*')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## COLLECTIONS:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.collections))
}

function copy__controllers () {
  return src(config.path.src + config.path.controllers + '**/*')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## CONTROLLERS:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.controllers))
}

function copy__snippets () {
  return src(config.path.src + config.path.snippets + '**/*.php')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## SNIPPETS:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.snippets))
}

function copy__templates () {
  return src(config.path.src + config.path.templates + '**/*.php')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## TEMPLATES:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.templates))
}

function copy__htaccess () {
  return src(config.path.src + '.htaccess')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## HTACCESS:' })))
    .pipe(dest(config.path.dist + config.path.public))
}

function copy__index () {
  return src(config.path.src + 'index.php')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## INDEX:' })))
    .pipe(dest(config.path.dist + config.path.public))
}

// WATCH -------------------------------------------------------------

function watch__logic () {
  watch(config.path.root + '.env', series(dotenv, reload))
  watch(config.path.root + config.path.env + 'application.php', series(application, reload))
  watch(config.path.root + config.path.env + config.path.enviroments + '*.php', series(enviroments, reload))
  watch(config.path.src + config.path.configs + '.license.development', series(license, reload))
  watch(config.path.src + config.path.configs + 'config.php', series(configs, reload))
  watch(config.path.src + config.path.languages + '**/*.php', series(languages, reload))
  watch(config.path.src + config.path.blueprints + '**/*.yml', series(blueprints, reload))
  watch(config.path.src + config.path.collections + '**/*.php', series(collections, reload))
  watch(config.path.src + config.path.controllers + '**/*.php', series(controllers, reload))
  watch(config.path.src + config.path.snippets + '**/*.php', series(snippets, reload))
  watch(config.path.src + config.path.templates + '**/*.php', series(templates, reload))
  watch(config.path.src + '.htaccess', series(htaccess, reload))
  watch(config.path.src + 'index.php', series(index, reload))
}

// COMPOSITION -------------------------------------------------------------

const dotenv = series(clean__dotenv, copy__dotenv)
const license = series(clean__license, copy__license)
const application = series(clean__application, copy__application)
const enviroments = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') ? series(clean__enviroments, copy__enviroments) : series(clean__enviroments)
const configs = series(clean__config, copy__config)
const languages = series(clean__languages, copy__languages)
const blueprints = series(clean__blueprints, copy__blueprints)
const collections = series(clean__collections, copy__collections)
const controllers = series(clean__controllers, copy__controllers)
const snippets = series(clean__snippets, copy__snippets)
const templates = series(clean__templates, copy__templates)
const htaccess = series(clean__htaccess, copy__htaccess)
const index = series(clean__index, copy__index)

////////////////////////////////////////////////////////////////////////////////
// ASSETS
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__images () { return del(config.path.dist + config.path.public + config.path.assets + config.path.images) }
function clean__icons () { return del(config.path.dist + config.path.public + config.path.assets + config.path.icons) }
function clean__favicons () { return del(config.path.dist + config.path.public + config.path.assets + config.path.favicons) }
function clean__fonts () { return del(config.path.dist + config.path.public + config.path.assets + config.path.fonts) }

// PROCESS -------------------------------------------------------------

function process__images () {
  return src(config.path.src + config.path.resources + config.path.assets + config.path.images + '**/*.{png,jpg,jpeg,gif}')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## IMAGES:' })))
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 7 })
    ])))
    .pipe(dest(config.path.dist + config.path.public + config.path.assets + config.path.images))
}

function process__icons () {
  return src(config.path.src + config.path.resources + config.path.assets + config.path.icons + '**/*.svg')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## ICONS:' })))
    .pipe(cache(imagemin([
      imagemin.svgo({
        plugins: [
          { removeTitle: true },
          { removeViewBox: false },
          { cleanupIDs: true },
          { removeXMLNS: false }
        ],
        verbose: process.env.DEBUG === 'True' ? true : false
      })
    ])))
    .pipe(dest(config.path.dist + config.path.public + config.path.assets + config.path.icons))
}

function process__favicons () {
  return src(config.path.src + config.path.resources + config.path.assets + config.path.favicons + 'favicon_src.png')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## FAVICON:' })))
    .pipe(favicon({
      path: '/' + config.path.assets + config.path.favicons,
      appName: 'Glas & Gebäudereinigung - Uwe Schramm',
      appShortName: 'Schramm Reinigung',
      appDescription: 'Company Website',
      url: config.host.live,
      version: process.env.npm_package_version,
      developerName: 'Uwe Schramm',
      developerURL: config.host.live,
      lang: 'de-DE',
      display: 'browser',
      orientation: 'any',
      appleStatusBarStyle: 'black-translucent',
      background: 'rgba(0,0,0,0)',
      theme_color: 'rgba(0,0,0,0)',
      pixel_art: false,
      scope: '/',
      html: 'all.html',
      start_url: '/index.php',
      logging: true,
      pipeHTML: true,
      replace: true,
      icons: {
        android: process.env.NODE_ENV === 'development' ? true : true,
        appleIcon: process.env.NODE_ENV === 'development' ? false : true,
        appleStartup: process.env.NODE_ENV === 'development' ? false : true,
        coast: process.env.NODE_ENV === 'development' ? false : true,
        favicons: true,
        firefox: process.env.NODE_ENV === 'development' ? false : true,
        windows: process.env.NODE_ENV === 'development' ? false : true,
        yandex: process.env.NODE_ENV === 'development' ? false : true
      }
    }))
    .pipe(dest(config.path.dist + config.path.public + config.path.assets + config.path.favicons))
}

function copy__fonts () {
  return src(config.path.src + config.path.resources + config.path.assets + config.path.fonts + '**/*.{woff,woff2}')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## FONTS:' })))
    .pipe(dest(config.path.dist + config.path.public + config.path.assets + config.path.fonts))
}

// WATCH -------------------------------------------------------------

function watch__assets () {
  watch(config.path.src + config.path.resources + config.path.assets + config.path.fonts + '**/*.{woff,woff2}', series(fonts, reload))
  watch(config.path.src + config.path.resources + config.path.assets + config.path.images + '**/*.{png,jpg,jpeg,gif}', series(images, reload))
  watch(config.path.src + config.path.resources + config.path.assets + config.path.icons + '**/*.svg', series(icons, reload))
  watch(config.path.src + config.path.resources + config.path.assets + config.path.favicons + 'favicon_src.png', series(favicons, reload))
}

// COMPOSITION -------------------------------------------------------------

const fonts = series(clean__fonts, copy__fonts)
const images = series(clean__images, process__images)
const icons = series(clean__icons, process__icons)
const favicons = series(clean__favicons, process__favicons)

////////////////////////////////////////////////////////////////////////////////
// PLUGINS
////////////////////////////////////////////////////////////////////////////////

// CLEAN -------------------------------------------------------------

function clean__plugins (done) {
  const tasks = config.plugins.map((plugin) => {
    function clean__plugin () {
      return del(config.path.dist + config.path.site + config.path.plugins + plugin)
    }
    clean__plugin.displayName = `clean__${plugin}`
    return clean__plugin
  })
  return series(...tasks, function clean__series (seriesDone) {
    seriesDone()
    done()
  })()
}

// PROCESS - PHP -------------------------------------------------------------

function process__plugins_php () {
  return src(config.path.src + config.path.plugins + '**/*.php')
    .pipe(gulpif(process.env.DEBUG === 'True', debug({ title: '## PLUGIN PHP:' })))
    .pipe(dest(config.path.dist + config.path.site + config.path.plugins))
}

// PROCESS - VUE -------------------------------------------------------------

function process__plugins_vue (done) {
  const tasks = config.plugins.map((plugin) => {
    function process__plugin_vue () {
      const entry = config.path.src + config.path.plugins + `${plugin}/src/index.js`
      const options = {
        outDir: config.path.dist + config.path.site + config.path.plugins + plugin,
        outFile: 'index.js',
        watch: false,
        minify: !process.env.NODE_ENV === 'development' ? true : false,
        sourceMaps: process.env.NODE_ENV === 'development' ? true : false,
        cache: false,
        contentHash: false,
        autoInstall: false,
        scopeHoist: true,
        logLevel: process.env.DEBUG === 'True' ? 3 : 0,
        target: 'node'
      }
      const bundler = new Parcel(entry, options)
      return bundler.bundle()
    }
    process__plugin_vue.displayName = `process__${plugin}`
    return process__plugin_vue
  })
  return series(...tasks, function process__series (seriesDone) {
    seriesDone()
    done()
  })()
}

// WATCH -------------------------------------------------------------

function watch__plugins () {
  watch(config.path.src + config.path.plugins + '**/*.*', series(plugins, reload))
}

// COMPOSITION -------------------------------------------------------------

const plugins = series(clean__plugins, process__plugins_php, process__plugins_vue)

////////////////////////////////////////////////////////////////////////////////
// COMPOSITION
////////////////////////////////////////////////////////////////////////////////

const DATA = series(content)
const LOGIC = parallel(dotenv, application, enviroments, htaccess, configs, languages, blueprints, collections, controllers, snippets, templates, license, index, vendor)
const STYLE = parallel(styles, scripts__main, scripts__panel)
const ASSET = series(fonts, images, icons, favicons)
const PLUGIN = series(plugins)
const SEO = series(robots)
const RUN = STATE_PLUGINS ? series(browsersync, parallel(watch__logic, watch__assets, watch__styles, watch__scripts, watch__plugins, watch__content)) : series(browsersync, parallel(watch__logic, watch__assets, watch__styles, watch__scripts, watch__content))

// MAIN -------------------------------------------------------------

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  exports.default = STATE_PLUGINS ? series(DATA, LOGIC, STYLE, ASSET, SEO, PLUGIN) : series(DATA, LOGIC, STYLE, ASSET, SEO)
} else {
  exports.default = STATE_PLUGINS ? series(DATA, LOGIC, STYLE, ASSET, PLUGIN, RUN) : series(DATA, LOGIC, STYLE, ASSET, RUN)
}

////////////////////////////////////////////////////////////////////////////////
// HELPER
////////////////////////////////////////////////////////////////////////////////

task('clear', () => cache.clearAll())
