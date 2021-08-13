import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cookies: '',
    showModal: false,
    userInfo: {},
    allUserLinks: [],
    isReload: false,
    isNoResultForSearch: false,
    isYoutubeBtn: false,
    ytbMode: false
  },
  mutations: {
    setCookies(state, payload) {
      state.cookies = payload
    },
    addModal(state) {
      state.showModal = !state.showModal
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setAllUserLinks(state, payload) {
      state.allUserLinks = payload
    },
    reloadLinks(state, payload) {
      state.isReload = payload
    },
    searchError(state, payload) {
      state.isNoResultForSearch = payload
    },
    ytbModeChange(state, payload) {
      state.ytbMode = payload
    },
    showYtbBtn(state, payload) {
      state.isYoutubeBtn = payload
    }
  },
  actions: {
    setCookies(context, payload) {
      context.commit('setCookies', payload)
    },
    addModal(context) {
      context.commit('addModal')
    },
    setUserInfo(context, payload) {
      context.commit('setUserInfo', payload)
    },
    setAllUserLinks(context, payload) {
      context.commit('setAllUserLinks', payload)
    },
    reloadLinks(context, payload) {
      context.commit('reloadLinks', payload)
    },
    searchError(context, payload) {
      context.commit('searchError', payload)
    },
    ytbModeChange(context, payload) {
      context.commit('ytbModeChange', payload)
    },
    showYtbBtn(context, payload) {
      context.commit('showYtbBtn', payload)
    }
  },
  getters: {
    getCookies(state) {
      return state.cookies
    },
    getModal(state) {
      return state.showModal
    },
    getUserInfo(state) {
      return state.userInfo
    },
    getAllLinks(state) {
      return state.allUserLinks
    },
    refreshLinks(state) {
      return state.isReload
    },
    getUniqCategory(state) {
      let arr = state.allUserLinks
      let uniq = []
      arr.forEach(el => {
        if(!uniq.includes(el.category)) {
          uniq.push(el.category)
        }
      })
      return uniq.sort()
    },
    getSearchError(state) {
      return state.isNoResultForSearch
    },
    getYoutubeMode(state) {
      return state.ytbMode
    },
    getYoutubeBtn(state) {
      return state.isYoutubeBtn
    }
  }
})