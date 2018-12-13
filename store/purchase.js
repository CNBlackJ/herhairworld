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
  getPurchaseProducts ({ state, commit, rootState }, { isBuyNow }) {
    if (isBuyNow) {
      const purchaseProducts = rootState.details.buyNowProduct ? [rootState.details.buyNowProduct] : []
      commit('SET_PRODUCTS', purchaseProducts)
    } else {
      const purchaseProducts = rootState.cart.cartList.filter(item => item.isChecked)
      commit('SET_PRODUCTS', purchaseProducts)
    }
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
  }
}
