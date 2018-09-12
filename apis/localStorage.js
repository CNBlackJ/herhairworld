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

  static createCart (prodId) {
    const carts = window.localStorage.carts
    let newCarts = []
    if (!carts) {
      newCarts.push(prodId)
    } else {
      newCarts = JSON.parse(carts)
      if (newCarts.indexOf(prodId) > -1) {
        _.remove(newCarts, ele => ele === prodId)
      } else {
        newCarts.push(prodId)
      }
    }
    window.localStorage.carts = JSON.stringify(newCarts)
  }

  static saveAuthToken (authToken) {
    window.localStorage['auth_token'] = authToken
  }
}
