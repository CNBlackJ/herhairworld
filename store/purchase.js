export const state = () => ({
  paypalConfig: {
    sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
    production: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
  },
  products: []
})

export const mutations = {
  SET_PRODUCTS (state, products) {
    state.products = products
  }
}

export const actions = {
  getPurchaseProducts ({ state, commit, rootState }) {
    const checkedProducts = rootState.cart.checkedProducts
    const buyNowProduct = rootState.details.buyNowProduct
    const carts = rootState.cart.carts
    let purchaseProducts = []
    if (buyNowProduct) {
      purchaseProducts = [buyNowProduct]
    } else {
      purchaseProducts = carts.filter(ele => checkedProducts.indexOf(ele.productId) > -1)
    }
    commit('SET_PRODUCTS', purchaseProducts)
  }
}

export const getters = {
  items (state) {
    const purchaseProducts = state.products
    return purchaseProducts.map(ele => {
      return {
        name: ele.productId,
        sku: ele.productId,
        price: ele.price,
        currency: 'USD',
        quantity: String(ele.count)
      }
    })
  },
  amount (state) {
    const purchaseProducts = state.products
    if (purchaseProducts.length) {
      return purchaseProducts.reduce((n, c) => (n.count * n.price) + (c.count * c.price))
    } else {
      return 0
    }
  }
}
