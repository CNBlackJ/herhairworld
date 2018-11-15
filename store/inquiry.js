export const state = () => ({
  sendPage: {
    name: '',
    path: '',
    additional: ''
  }
})

export const mutations = {
  SET_SEND_PAGE (state, sendPage) {
    const { name = '', path = '', additional = '' } = sendPage
    state.sendPage = {
      name,
      path,
      additional
    }
  }
}
