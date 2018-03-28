// Usage: new Browser(navigator.userAgent)

import $ from 'domtastic'

export default class Browser {
  constructor (ua) {
    this.supports = {}

    this.iPhone = (/iPhone|iPod/i.test(ua))

    this.iPhoneX = (this.iPhone && screen.availHeight === 812 && screen.availWidth === 375)
    this.iNotchX = false

    this.init()
  }

  addBrowserClass () {
    $(html).toggleClass('iphone-x--notched', this.iNotchX)
  }

  // iPhone X notch
  isNotchediPhoneX () {
    let safeNotchedAreaSize = 0

    // env() is W3 CSS4 spec, constant() is iOS 11.0 implementation
    if (CSS.supports('left: env(safe-area-inset-left)')) {
      let div = document.createElement('div')
      div.style.left = 'env(safe-area-inset-right)'
      document.body.appendChild(div)
      safeNotchedAreaSize = parseInt(window.getComputedStyle(div).left)
      document.body.removeChild(div)
    } else {
      if (CSS.supports('left: constant(safe-area-inset-left)')) {
        let div = document.createElement('div')
        div.style.left = 'constant(safe-area-inset-right)'
        document.body.appendChild(div)
        safeNotchedAreaSize = parseInt(window.getComputedStyle(div).left)
        document.body.removeChild(div)
      }
    }

    return (safeNotchedAreaSize > 0)
  }

  resize () {
    this.iNotchX = (this.iPhoneX && this.isNotchediPhoneX())
    this.addBrowserClass()
  }

  init () {
    this.resize()
  }
}