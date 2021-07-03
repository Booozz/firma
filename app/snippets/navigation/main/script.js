const Headroom = window.Headroom

class NavigationMain extends window.HTMLDivElement {
  constructor (...args) {
    const self = super(...args)
    self.init()
    return self
  }

  init () {
    this.$ = $(this)
    this.resolveElements()
  }

  resolveElements () {
    this.$html = $('.app')
    this.$menu = $('[aria-labelledby="menu"]', this)
    this.$trigger = $('[aria-controls="menu"]', this)

    this.currentWindow = {
      width: window.innerWidth
    }
  }

  connectedCallback () {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const headroom = new Headroom(this.$.get(0), {
      offset: 100,
      tolerance: 0,
      classes: {
        initial: 'headroom',
        pinned: 'headroom-isPinned',
        unpinned: 'headroom-isUnpinned',
        top: 'headroom-isTop',
        notTop: 'headroom-isNotTop'
      }
    })
    headroom.init()

    $(window).on('resize', this.resizeHandler.bind(this))

    if (isDesktop === false) {
      this.stateHandler('close')
    }

    this.$.on('click', '[aria-controls="menu"]', this.runNavigation.bind(this))
  }

  runNavigation (e) {
    const target = e.currentTarget

    if (target.ariaExpanded === 'true') {
      this.stateHandler('close')
    } else {
      this.stateHandler('open')
    }
  }

  stateHandler (action) {
    if (action === 'open') {
      this.$trigger.attr('aria-expanded', 'true')
      this.$menu.attr('aria-hidden', 'false')
      this.$html.addClass('app_menu')
    }
    if (action === 'close') {
      this.$trigger.attr('aria-expanded', 'false')
      this.$menu.attr('aria-hidden', 'true')
      this.$html.removeClass('app_menu')
    }
  }

  resizeHandler (e) {
    const w = e.target.innerWidth

    if (this.currentWindow.width <= '1024' && w >= '1024') {
      this.stateHandler('open')
    }

    if (this.currentWindow.width >= '1024' && w <= '1024') {
      this.stateHandler('close')
    }

    this.currentWindow.width = w
    return this.currentWindow.width
  }
}

window.customElements.define('navigation-main', NavigationMain, { extends: 'div' })
