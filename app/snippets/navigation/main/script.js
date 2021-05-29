const { disableBodyScroll, enableBodyScroll } = window.bodyScrollLock
const Headroom = window.Headroom

class NavigationMain extends window.HTMLElement {
  constructor (...args) {
    const self = super(...args)
    self.init()
    return self
  }

  init () {
    this.$ = $(this)
    this.bindFunctions()
    this.bindEvents()
    this.resolveElements()
  }

  bindFunctions () {
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  bindEvents () {
    this.$.on('click', '.toggle', this.toggleMenu)
  }

  resolveElements () {
    this.$menu = $('.menu', this)
  }

  connectedCallback () {
    // console.log('### NAVIGATION-MAIN - SCRIPT.JS ###')

    const headroom = new Headroom(this.$.get(0), {
      offset: 100,
      tolerance: 0, // or { down: 0, up: 0 }
      classes: {
        initial: 'headroom',
        pinned: 'headroom-isPinned',
        unpinned: 'headroom-isUnpinned',
        top: 'headroom-isTop',
        notTop: 'headroom-isNotTop'
      }
    })
    headroom.init()
  }

  toggleMenu (e) {
    this.$.toggleClass('snippet-isOpen')
    if (this.$.hasClass('snippet-isOpen')) {
      disableBodyScroll(this.$menu.get(0))
    } else {
      enableBodyScroll(this.$menu.get(0))
    }
  }
}

window.customElements.define('navigation-main', NavigationMain)
