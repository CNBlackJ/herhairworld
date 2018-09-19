import category from '@/apis/category'

export const state = () => ({
  categories: [],
  activateCat: null
})

export const mutations = {
  SET_CATEGORIES (state, categories) {
    state.categories = categories
  },
  SET_ACTIVATE_CAT (state, _id) {
    state.activateCat = _id
  }
}

export const actions = {
  async setCategories ({ commit }) {
    const categories = await category.list({})
    commit('SET_CATEGORIES', categories)
  }
}
