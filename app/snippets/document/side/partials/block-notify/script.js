// var $ = window.jQuery

class BlockNotify extends window.HTMLElement {
  constructor (...args) {
    const self = super(...args)
    self.init()
    return self
  }

  init () {
    this.$ = $(this)
    this.config()
    this.bind()
    this.resolveElements()
  }

  config () {
    this.cookieName = 'cookieNoticeSeen'
  }

  bind () {
    // FUNCTIONS
    this.runMenu = this.runMenu.bind(this)

    // EVENTS
    this.$.on('click', '[data-close]', this.runMenu)
  }

  resolveElements () {
  }

  connectedCallback () {
    console.log('### NOTIFY - SCRIPT.JS ###')
  }

  runMenu (e) {
    this.$.toggleClass('snippet-isOpen')
  }
}

window.customElements.define('block-notify', BlockNotify)
