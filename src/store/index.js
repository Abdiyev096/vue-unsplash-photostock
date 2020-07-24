import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import userInfo from './userInfo'
import favorites from './favorites'
import history from './history'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    totalPages: 0
  },

  mutations: {
    setError(state, error) {
      state.error = error
    },

    clearError(state) {
      state.error = null
    },

    setTotalPages(state, pages) {
      state.totalPages = pages
    }
  },

  getters: {
    getError(state) {
      return state.error
    },

    getTotalPages(state) {
      return state.totalPages
    }
  },

  actions: {
    async fetchImages({commit}, keyword) {
      try {
        const url = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=tS_IMd4CJ80CRw6Z5sOsFNk8qTShqLzRLUqqGjaZHX4`;
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${response.status}`)
        }

        const responseBody = await response.json();
        commit('setTotalPages', responseBody.total_pages)
        return responseBody.results.map(el => {
          return {
            id: el.id,
            ...el.urls,
          }
        })

      } catch(e) {
        commit('setError', e)
        throw e
      }
    },

    async fetchMoreImages({commit}, {pageNum, keyword}) {
      try {
        const url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${keyword}&client_id=tS_IMd4CJ80CRw6Z5sOsFNk8qTShqLzRLUqqGjaZHX4`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${response.status}`)
        }

        const responseBody = await response.json();
        return responseBody.results.map(el => {
          return {
            id: el.id,
            ...el.urls,
          }
        })

      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },

  modules: {
    auth,
    userInfo,
    favorites,
    history
  }
})