import category from '@/apis/category'
import pageConfig from '@/apis/pageConfig'

export const state = () => ({
  categories: [],
  activateCat: null,
  pageConfig: {
    index: {
      banner: [],
      services: [],
      categories: []
    }
  }
})

export const mutations = {
  SET_CATEGORIES (state, categories) {
    state.categories = categories
  },
  SET_ACTIVATE_CAT (state, _id) {
    state.activateCat = _id
  },
  SET_PAGE_CONFIG (state, pageConfig) {
    state.pageConfig = pageConfig
  }
}

export const actions = {
  async setCategories ({ commit }) {
    const categories = await category.list({ sort: 'index' })
    commit('SET_CATEGORIES', categories)
  },
  async setPageConfig ({ commit }) {
    const pages = await pageConfig.list({ sort: '-createdAt' })
    commit('SET_PAGE_CONFIG', pages[0])
  }
}

export const getters = {
  serviceTitles (state) {
    const titles = []
    state.pageConfig.index.services.forEach(ele => {
      titles[ele.index - 1] = ele.title
    })
    return titles
  },
  serviceBtns (state) {
    const btns = []
    state.pageConfig.index.services.forEach(ele => {
      btns[ele.index - 1] = ele.btn
    })
    return btns
  },
  serviceDescriptions (state) {
    const descs = []
    state.pageConfig.index.services.forEach(ele => {
      descs[ele.index - 1] = ele.description
    })
    return descs
  },
  serviceImgs (state) {
    const imgs = []
    state.pageConfig.index.services.forEach(ele => {
      imgs[ele.index - 1] = ele.img
    })
    return imgs
  },
  activateCatId (state) {
    if (!state.activateCat) return 0
    const id = state.categories.indexOf(state.categories.find(ele => ele._id === state.activateCat))
    return id
  },
  isShowCategories (state) {
    return state.categories.filter(ele => ele.isShow)
  }
}
