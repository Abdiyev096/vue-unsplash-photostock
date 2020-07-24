import firebase from 'firebase/app'

export default {
    state: {
        user: {}
    },

    getters: {
        getUserInfo(state) {
            return state.user
        }
    },

    mutations: {
        setUserInfo(state, user) {
            state.user = user
        },

        clearUserInfo(state) {
            state.user = {}
        }
    },

    actions: {
        async fetchUserInfo({commit, dispatch}) {
            try {
                const uid = await dispatch('getUserID')
                const userInfo = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setUserInfo', userInfo)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}