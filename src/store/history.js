import firebase from 'firebase/app'

export default {
    state: {
        history: []
    },

    getters: {
        getHistory: (state) => state.history
    },

    mutations: {
        addToHistory: (state, el) => state.history.push(el),
        setHistory: (state, arr) => state.history = [...arr]
    },

    actions: {
        async fetchHistory({commit, dispatch}) {
            try {
                const uid = await dispatch('getUserID')
                const history = (await firebase.database().ref(`/users/${uid}/history`).once('value')).val() || {}
                const arr = Object.keys(history).map(el => history[el])
                commit('setHistory', arr)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async addToHistory({commit, dispatch, getters}, str) {
            try {
                const uid = await dispatch('getUserID')
                commit('addToHistory', str)
                const obj = {...getters.getHistory}
                await firebase.database().ref(`users/${uid}/history`).update(obj)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
