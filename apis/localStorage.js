export default class LS {
  static createFavorite (favoriteId) {
    const favorites = window.localStorage.favorites
    if (!favorites) {
      window.localStorage.favorites = favoriteId
    } else {
      window.localStorage.favorites = `${favorites},${favoriteId}`
    }
  }

  static createCart ({ prod, count }) {
    console.log(prod)
  }
}
