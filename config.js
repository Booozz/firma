module.exports = {
  host: {
    local: 'http://firma.local.run:8080',
    live: 'https://www.schramm-reinigung.de'
  },
  path: {
    root: './',
    src: 'app/',
    dist: 'dist/',
    public: 'public/',
    secure: 'T:/__configs/M-1/sites/firma/',
    env: 'config/',
    license: 'license/',
    enviroments: 'enviroments/',
    configs: 'config/',
    index: 'index/',
    site: 'site/',
    assets: 'assets/',
    plugins: 'plugins/',
    resources: 'resources/',
    blueprints: 'blueprints/',
    fonts: 'fonts/',
    icons: 'icons/',
    images: 'images/',
    favicons: 'favicons/',
    languages: 'languages/',
    controllers: 'controllers/',
    collections: 'collections/',
    templates: 'templates/',
    snippets: 'snippets/',
    scripts: 'public/',
    styles: 'public/',
    content: 'content/',
    db: 'db/'
  },
  vendor: {
    dest: 'dist/public',
    src: [
      'node_modules/headroom.js/dist/headroom.js',
      'node_modules/jquery/dist/jquery.js'
    ]
  },
  plugins: []
}
