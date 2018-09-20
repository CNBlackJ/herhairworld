import _ from 'lodash'

export default class LS {
  static getVal (key) {
    if (process.browser) {
      return window.localStorage[key]
    }
  }

  static setVal (key, val) {
    if (process.browser) {
      window.localStorage[key] = val
    }
  }

  static removeLocalStorage (key) {
    if (process.browser) {
      return window.localStorage.removeItem(key)
    }
  }

  static createFavorite (prodId) {
    if (process.browser) {
      const favorites = window.localStorage.favorites
      let favs = []
      if (!favorites) {
        favs.push(prodId)
      } else {
        favs = JSON.parse(favorites)
        if (favs.indexOf(prodId) > -1) {
          _.remove(favs, ele => ele === prodId)
        } else {
          favs.push(prodId)
        }
      }
      window.localStorage.favorites = JSON.stringify(favs)
    }
  }

  static createCart (cart) {
    if (process.browser) {
      const carts = window.localStorage.carts
      let newCarts = []
      if (!carts) {
        newCarts.push(cart)
      } else {
        newCarts = JSON.parse(carts)
        const { productId } = cart
        if (newCarts.map(e => e.productId).indexOf(productId) > -1) {
          _.remove(newCarts, ele => ele.productId === productId)
        } else {
          newCarts.push(cart)
        }
      }
      window.localStorage.carts = JSON.stringify(newCarts)
    }
  }

  static addCartCount ({ prodId, count }) {
    if (process.browser && window.localStorage.carts) {
      const carts = JSON.parse(window.localStorage.carts)
      carts.map(cart => {
        if (cart.prodId === prodId) cart.count = count
        return cart
      })
      window.localStorage.carts = JSON.stringify(carts)
    }
  }

  static removeFromCart ({ prodId }) {
    if (window.localStorage.carts) {
      const carts = JSON.parse(window.localStorage.carts)
      _.remove(carts, ele => ele.prodId === prodId)
      window.localStorage.carts = JSON.stringify(carts)
    }
  }
}
