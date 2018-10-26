export const state = () => ({
  paypalConfig: {
    sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
    production: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
  },
  products: [],
  shipping: 20
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
    const shipping = state.shipping
    const payItems = purchaseProducts.map(ele => {
      return {
        name: ele.productId,
        sku: ele.productId,
        price: ele.price,
        currency: 'USD',
        quantity: String(ele.count)
      }
    })
    const shippingItem = {
      name: 'shipping',
      sku: 'shippingsku',
      price: shipping,
      currency: 'USD',
      quantity: '1'
    }
    payItems.push(shippingItem)
    return payItems
  },
  amount (state) {
    const purchaseProducts = state.products
    const shipping = state.shipping
    if (purchaseProducts.length) {
      let allPrice = 0 + shipping
      purchaseProducts.forEach(ele => {
        allPrice += (ele.count * Number(ele.price))
      })
      return allPrice
    } else {
      return 0
    }
  },
  summary (state) {
    const products = state.products
    const shipping = state.shipping
    const summary = {
      total: 0,
      price: '0.00',
      shipping: '20.00'
    }
    if (products.length) {
      const counts = products.map(ele => ele.count)
      const prices = products.map(ele => ele.count * ele.price)
      summary.total = counts ? counts.reduce((c, n) => c + n) : 0
      summary.price = (prices ? prices.reduce((c, n) => c + n) : 0).toFixed(2)
      summary.shipping = shipping.toFixed(2)
    }
    return summary
  }
}
