import _ from 'lodash'

export default class LS {
  static getLocalStorage (key) {
    return window.localStorage[key]
  }

  static createFavorite (prodId) {
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

  static createCart ({ prodId, count }) {
    const carts = window.localStorage.carts
    let newCarts = []
    if (!carts) {
      newCarts.push({ prodId, count })
    } else {
      newCarts = JSON.parse(carts)
      if (newCarts.map(e => e.prodId).indexOf(prodId) > -1) {
        _.remove(newCarts, ele => ele.prodId === prodId)
      } else {
        newCarts.push({ prodId, count })
      }
    }
    window.localStorage.carts = JSON.stringify(newCarts)
  }

  static addCartCount ({ prodId, count }) {
    if (window.localStorage.carts) {
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

  static saveAuthToken (authToken) {
    window.localStorage['auth_token'] = authToken
  }
}
