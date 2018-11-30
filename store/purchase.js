import payment from '@/apis/payment'

export const state = () => ({
  paypalConfig: {
    sandbox: '',
    production: ''
  },
  products: [],
  shipping: 20
})

export const mutations = {
  SET_PRODUCTS (state, products) {
    state.products = products
  },
  STE_PAYPAL_CONFIG (state, paypalConfig) {
    state.paypalConfig = paypalConfig
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
  },
  async setPaypalConfig ({ state, commit }) {
    const isUsingPaymentInfo = await payment.getIsUsingPayment()
    const paypalConfig = {
      sandbox: isUsingPaymentInfo.sandboxToken,
      production: isUsingPaymentInfo.productionToken
    }
    commit('STE_PAYPAL_CONFIG', paypalConfig)
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
      shipping: '00.00'
    }
    if (products.length) {
      const counts = products.map(ele => ele.count)
      const prices = products.map(ele => ele.count * ele.price)
      summary.total = counts ? counts.reduce((c, n) => c + n) : 0
      summary.price = (prices.length ? prices.reduce((c, n) => c + n) : 0).toFixed(2)
      summary.shipping = shipping.toFixed(2)
      const allWeight = products.map(ele => ele.count * ele.maxWeight).reduce((c, n) => c + n)
      if (allWeight === 0) {
        summary.shipping = 0
      } else {
        const outWeight = allWeight - 500
        if (outWeight > 0) {
          // 超重: 每加0.5kg，多6美金
          const count = Math.ceil(outWeight / 500)
          summary.shipping = (19.99 + count * 6).toFixed(2)
        } else {
          summary.shipping = 19.99
        }
      }
    }
    return summary
  }
}
